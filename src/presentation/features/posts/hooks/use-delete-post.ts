import { type IPostVM } from '../models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useDependencies } from '@presentation/context';
import { useToastWithOptimistic } from '@presentation/shared/hooks';

export const useDeletePost = () => {
  const { deletePostUseCase } = useDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.user.posts(),
    mutationFn: async (id: number) => {
      return deletePostUseCase.execute(id);
    },
    optimisticUpdate: (old: IPostVM[] = [], id: number) => old.filter((post) => post.id !== id),
    messages: {
      success: 'Post deleted successfully!',
      fallbackError: 'Error deleting post',
    },
  });
};
