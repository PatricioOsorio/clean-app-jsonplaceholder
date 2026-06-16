import { PostMapper, type IPostUpdateVM, type IPostVM } from '../models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useDependencies } from '@presentation/context';
import { useToastWithOptimistic } from '@presentation/shared/hooks';

export const useUpdatePost = (id: number) => {
  const { updatePostUseCase } = useDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.user.posts(),
    mutationFn: async (input: IPostUpdateVM) => {
      return updatePostUseCase.execute(input.id, PostMapper.toUpdatePostInputDomain(input));
    },
    optimisticUpdate: (old: IPostVM[] = [], input: IPostUpdateVM) => {
      const updatedFields = PostMapper.toUpdatePostInputDomain(input);

      const applyUpdate = (post: IPostVM): IPostVM => {
        if (post.id !== id) {
          return post;
        }

        return {
          ...post,
          ...updatedFields,
          id,
          __optimistic: true,
        };
      };

      return old.map(applyUpdate);
    },

    messages: {
      success: 'Post updated successfully!',
      fallbackError: 'Error updating post',
    },
  });
};
