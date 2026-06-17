import { UpdatePostDto } from '@domain/post';
import { PostMapper, type IPostUpdateInputVM, type IPostVM } from '../models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePostsDependencies } from './use-posts-dependencies';
import { useToastWithOptimistic } from '@presentation/shared/hooks';

export const useUpdatePost = (id: number) => {
  const { posts, validators } = usePostsDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.user.posts(),
    mutationFn: async (input: IPostUpdateInputVM) => {
      const rawInput = PostMapper.toUpdatePostInputDomain(input);
      const dto = UpdatePostDto.create(rawInput, validators.update);
      return posts.update(input.id, dto);
    },

    optimisticUpdate: (old: IPostVM[] = [], input: IPostUpdateInputVM) => {
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
