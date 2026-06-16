import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'styleguide/sonner';

import { formatError } from '@presentation/utils';
import { PostMapper, type IPostUpdateVM, type IPostVM } from '../models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useDependencies } from '@presentation/context';
import { useMutationBase } from '@presentation/shared/hooks';

export const useUpdatePost = (id: number) => {
  const { updatePostUseCase } = useDependencies();
  const queryClient = useQueryClient();

  const { cancelAndSnapshot, rollback, invalidate } = useMutationBase<IPostVM[]>(
    QUERY_KEYS.user.posts(),
  );

  return useMutation({
    onMutate: async (input: IPostUpdateVM) => {
      const previousPosts = await cancelAndSnapshot();

      const oldPost = previousPosts?.find((p) => p.id === id);
      if (!oldPost) return { previousPosts };

      const optimisticPost: IPostVM = {
        ...oldPost,
        ...PostMapper.toUpdatePostDomain(input),
        id,
        __optimistic: true,
      };

      if (previousPosts) {
        queryClient.setQueryData<IPostVM[]>(QUERY_KEYS.user.posts(), (old = []) =>
          old.map((p) => (p.id === optimisticPost.id ? optimisticPost : p)),
        );
      }

      return { previousPosts };
    },

    mutationFn: (input: IPostUpdateVM) =>
      updatePostUseCase.execute(input.id, PostMapper.toUpdatePostDomain(input)),

    onSuccess: () => {
      toast.success('Post updated successfully!');
    },

    onError: (err, _input, context) => {
      rollback(context?.previousPosts);
      toast.error(formatError(err, 'Error updating post').errorMessage);
    },

    onSettled: () => {
      invalidate();
    },
  });
};
