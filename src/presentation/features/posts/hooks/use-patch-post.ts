import { PatchPostDto } from '@domain/post';
import { PostMapper, type IPatchPostInputVM, type IPostVM } from '../models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePostsDependencies } from './use-posts-dependencies';
import { useToastWithOptimistic } from '@presentation/shared/hooks';

export const usePatchPost = (id: number) => {
  const { posts, validators } = usePostsDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.user.posts(),
    mutationFn: async (input: IPatchPostInputVM) => {
      const rawInput = PostMapper.toPatchPostInputDomain(input);
      const dto = PatchPostDto.create(rawInput, validators.patch);
      return posts.patch(input.id, dto);
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
