import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePostsDependencies } from '@presentation/features/posts/hooks';
import { useToastWithOptimistic } from '@presentation/shared/hooks';
import type { IPostsListCache } from '@presentation/features/posts/hooks';

export const useDeletePost = () => {
  const { posts } = usePostsDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.posts.list(),
    mutationFn: async (id: number) => {
      return posts.delete(id);
    },
    optimisticUpdate: (old: IPostsListCache = { data: [], total: 0 }, id: number) => ({
      ...old,
      data: old.data.filter((post) => post.id !== id),
    }),
    messages: {
      success: 'Post deleted successfully!',
      fallbackError: 'Error deleting post',
    },
  });
};
