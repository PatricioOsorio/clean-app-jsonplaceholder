import { PostMapper, type IPatchPostInputVM, type IPostVM } from '../models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePostsDependencies } from './use-posts-dependencies';
import { useToastWithOptimistic } from '@presentation/shared/hooks';

export const usePatchPost = (id: number) => {
  const { posts, validators } = usePostsDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.user.posts(),
    mutationFn: async (input: IPatchPostInputVM) => {
      const dto = validators.patch.validate(PostMapper.toPatchPostInputDomain(input));
      return posts.patch(id, dto);
    },

    optimisticUpdate: (old: IPostVM[] = [], input: IPatchPostInputVM) => {
      const updatedFields = PostMapper.toPatchPostInputDomain(input);

      return old.map((post): IPostVM => {
        if (post.id !== id) return post;
        return { ...post, ...updatedFields, id, __optimistic: true };
      });
    },

    messages: {
      success: 'Post patched successfully!',
      fallbackError: 'Error updating post',
    },
  });
};
