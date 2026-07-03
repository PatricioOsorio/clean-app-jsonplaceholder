import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePostsDependencies } from '@presentation/features/posts/hooks';
import { useToastWithOptimistic } from '@presentation/shared/hooks';
import type { IPostVM } from '@presentation/features/posts/models/post';
import type { IPostsListCache } from '@presentation/features/posts/hooks';
import type { IUpdatePostProps } from '@domain/post';

export const useUpdatePost = () => {
  const { posts, validators } = usePostsDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.posts.list(),
    mutationFn: async ({ id, input }: { id: number; input: IUpdatePostProps }) => {
      const dto = validators.update.validate(input);
      return posts.update(id, dto);
    },

    optimisticUpdate: (
      old: IPostsListCache = { data: [], total: 0 },
      { id, input }: { id: number; input: IUpdatePostProps },
    ) => ({
      ...old,
      data: old.data.map((post): IPostVM => {
        if (post.id !== id) return post;
        return { ...post, ...input, __optimistic: true };
      }),
    }),

    messages: {
      success: 'Post updated successfully!',
      fallbackError: 'Error updating post',
    },
  });
};
