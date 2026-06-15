import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'styleguide/sonner';

import { formatError } from '@presentation/utils';
import { PostMapper, type IPostUpdateVM, type IPostCacheEntry } from '../models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useDependencies } from '@presentation/context';

export const useUpdatePost = (id: number) => {
  const { updatePostUseCase } = useDependencies();
  const queryClient = useQueryClient();

  const updatePostMutation = useMutation({
    mutationKey: ['post-update', id],

    // optimistic update
    onMutate: async (input: IPostUpdateVM) => {
      const key = QUERY_KEYS.user.posts();

      // abort current refetch
      await queryClient.cancelQueries({ queryKey: key });

      // snapshot (to rollback)
      const previousPosts = queryClient.getQueryData<IPostCacheEntry[]>(key);

      const oldPost = previousPosts?.find((p) => p.id === id);
      if (!oldPost) return { previousPosts };

      // optimistically domain update
      const optimisticPost: IPostCacheEntry = {
        ...oldPost,
        ...PostMapper.toUpdatePostDomain(input),
        id: id,
        __optimistic: true,
      };

      // write to cache
      // don not apply optimistic if we have no data
      if (previousPosts) {
        queryClient.setQueryData<IPostCacheEntry[]>(key, (old = []) =>
          old.map((p) => (p.id === optimisticPost.id ? optimisticPost : p)),
        );
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
