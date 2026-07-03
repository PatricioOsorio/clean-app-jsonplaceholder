import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePostsDependencies } from '@presentation/features/posts/hooks';
import { useToastWithOptimistic } from '@presentation/shared/hooks';
import type { ICreatePostProps } from '@domain/post';
import type { IPostsListCache } from '@presentation/features/posts/hooks';

export const useCreatePost = () => {
  const { posts, validators } = usePostsDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.posts.list(),
    mutationFn: async (input: ICreatePostProps) => {
      const dto = validators.create.validate(input);
      return posts.create(dto);
    },
    optimisticUpdate: (old: IPostsListCache = { data: [], total: 0 }, input: ICreatePostProps) => ({
      ...old,
      data: [...old.data, { id: -Date.now(), ...input, __optimistic: true }],
      total: old.total + 1,
    }),
    messages: {
      success: 'Post created successfully!',
      fallbackError: 'Error creating post',
    },
  });
};
