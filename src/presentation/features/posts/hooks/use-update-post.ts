import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePostsDependencies } from '@presentation/features/posts/hooks';
import { useToastWithOptimistic } from '@presentation/shared/hooks';
import type { IPostVM } from '@presentation/features/posts/models/post';
import type { IUpdatePostProps } from '@domain/post';

export const useUpdatePost = () => {
  const { posts, validators } = usePostsDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.user.posts(),
    mutationFn: async ({ id, input }: { id: number; input: IUpdatePostProps }) => {
      const dto = validators.update.validate(input);
      return posts.update(id, dto);
    },

    optimisticUpdate: (
      old: IPostVM[] = [],
      { id, input }: { id: number; input: IUpdatePostProps },
    ) =>
      old.map((post): IPostVM => {
        if (post.id !== id) return post;
        return { ...post, ...input, __optimistic: true };
      }),

    messages: {
      success: 'Post updated successfully!',
      fallbackError: 'Error updating post',
    },
  });
};
