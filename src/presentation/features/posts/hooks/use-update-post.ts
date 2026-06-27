import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePostsDependencies } from './use-posts-dependencies';
import { useToastWithOptimistic } from './use-toast-with-optimistic';
import type { IPostVM } from '../models/post';
import type { IUpdatePostProps } from '@domain/post';

export const useUpdatePost = (id: number) => {
  const { posts, validators } = usePostsDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.user.posts(),
    mutationFn: async (input: IUpdatePostProps) => {
      const dto = validators.update.validate(input);
      return posts.update(id, dto);
    },

    optimisticUpdate: (old: IPostVM[] = [], input: IUpdatePostProps) =>
      old.map((post): IPostVM => {
        if (post.id !== id) return post;
        return { ...post, ...input, id, __optimistic: true };
      }),

    messages: {
      success: 'Post updated successfully!',
      fallbackError: 'Error updating post',
    },
  });
};
