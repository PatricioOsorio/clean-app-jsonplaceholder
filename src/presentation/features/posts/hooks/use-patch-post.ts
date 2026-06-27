import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePostsDependencies } from './use-posts-dependencies';
import { useToastWithOptimistic } from '@presentation/shared/hooks';
import type { IPatchPostProps } from '@domain/post';
import type { IPostVM } from '../models/post';

export const usePatchPost = (id: number) => {
  const { posts, validators } = usePostsDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.user.posts(),
    mutationFn: async (input: IPatchPostProps) => {
      const dto = validators.patch.validate(input);
      return posts.patch(id, dto);
    },

    optimisticUpdate: (old: IPostVM[] = [], input: IPatchPostProps) => {
      const defined = Object.fromEntries(Object.entries(input).filter(([, v]) => v !== undefined));
      return old.map((post): IPostVM => {
        if (post.id !== id) return post;
        return { ...post, ...defined, id, __optimistic: true };
      });
    },

    messages: {
      success: 'Post patched successfully!',
      fallbackError: 'Error updating post',
    },
  });
};
