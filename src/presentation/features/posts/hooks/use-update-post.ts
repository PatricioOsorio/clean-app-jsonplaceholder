import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'styleguide/sonner';

import { formatError } from '@presentation/utils';
import { PostMapper, type IPostUpdateVM } from '../models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useDependencies } from '@presentation/context';
import type { IPost } from '@domain/post';

export const useUpdatePost = (id?: number) => {
  const { updatePostUseCase } = useDependencies();
  const queryClient = useQueryClient();

  const updatePostMutation = useMutation({
    // optimistic update
    onMutate: async (input: IPostUpdateVM) => {
      const key = QUERY_KEYS.user.posts();

      // abort current refetch
      await queryClient.cancelQueries({ queryKey: key });

      // snapshot (to rollback)
      const previousPosts = queryClient.getQueryData<IPost[]>(key);

      // optimistically domain update
      const optimisticPost: IPost = {
        ...PostMapper.toUpdatePostDomain(input),
        id: id ?? input.id!,
      };

      // write to cache
      // don not apply optimistic if we have no data
      if (previousPosts) {
        queryClient.setQueryData<IPost[]>(key, (old = []) => [...old, optimisticPost]);
      }

      // pass snapshot to onError/onSettled
      return { previousPosts };
    },

    mutationFn: (input: IPostUpdateVM) =>
      updatePostUseCase.execute(input.id, PostMapper.toUpdatePostDomain(input)),

    onSuccess: () => {
      toast.success('Post updated successfully!');
    },

    onError: (err, _input, context) => {
      // rollback
      queryClient.setQueryData(QUERY_KEYS.user.posts(), context?.previousPosts);

      const errorMessage = formatError(err, 'Error updating post').errorMessage;

      toast.error(errorMessage);
    },

    onSettled: () => {
      // sync with server
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.posts() });
    },
  });

  return updatePostMutation;
};
