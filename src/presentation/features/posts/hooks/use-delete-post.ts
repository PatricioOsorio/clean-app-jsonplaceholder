import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePostsDependencies } from '@presentation/features/posts/hooks';
import { useToastWithOptimistic } from '@presentation/shared/hooks';
import type { IPostVM } from '@presentation/features/posts/models/post';

export const useDeletePost = () => {
  const { posts } = usePostsDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.user.posts(),
    mutationFn: async (id: number) => {
      return posts.delete(id);
    },
    optimisticUpdate: (old: IPostVM[] = [], id: number) => old.filter((post) => post.id !== id),
    messages: {
      success: 'Post deleted successfully!',
      fallbackError: 'Error deleting post',
    },
  });
};
