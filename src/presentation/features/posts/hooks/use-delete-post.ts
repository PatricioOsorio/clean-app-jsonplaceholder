import { type IPostVM } from '../models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePostsDependencies } from './use-posts-dependencies';
import { useToastWithOptimistic } from '@presentation/shared/hooks';

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
