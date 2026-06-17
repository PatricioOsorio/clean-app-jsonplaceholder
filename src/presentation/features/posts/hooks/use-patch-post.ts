import { PostMapper, type IPatchPostInputVM, type IPostVM } from '../models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useDependencies } from '@presentation/context';
import { useToastWithOptimistic } from '@presentation/shared/hooks';

export const usePatchPost = (id: number) => {
  const { posts } = useDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.user.posts(),
    mutationFn: async (input: IPatchPostInputVM) => {
      return posts.patch.execute(input.id, PostMapper.toPatchPostInputDomain(input));
    },
    optimisticUpdate: (old: IPostVM[] = [], input: IPatchPostInputVM) => {
      const updatedFields = PostMapper.toPatchPostInputDomain(input);

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
      success: 'Post patched successfully!',
      fallbackError: 'Error updating post',
    },
  });
};
