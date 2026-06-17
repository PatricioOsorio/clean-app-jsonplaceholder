import { PostMapper, type IPostUpdateInputVM, type IPostVM } from '../models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePostsDependencies } from './use-posts-dependencies';
import { useToastWithOptimistic } from '@presentation/shared/hooks';

export const useUpdatePost = (id: number) => {
  const { posts, validators } = usePostsDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.user.posts(),
    mutationFn: async (input: IPostUpdateInputVM) => {
      const dto = validators.update.validate(PostMapper.toUpdatePostInputDomain(input));
      return posts.update(id, dto);
    },

    optimisticUpdate: (old: IPostVM[] = [], input: IPostUpdateInputVM) => {
      const updatedFields = PostMapper.toUpdatePostInputDomain(input);

      return old.map((post): IPostVM => {
        if (post.id !== id) return post;
        return { ...post, ...updatedFields, id, __optimistic: true };
      });
    },

    messages: {
      success: 'Post updated successfully!',
      fallbackError: 'Error updating post',
    },
  });
};
