import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePostsDependencies } from '@presentation/features/posts/hooks';
import { useToastWithOptimistic } from '@presentation/shared/hooks';
import type { ICreatePostProps } from '@domain/post';
import type { IPostVM } from '@presentation/features/posts/models/post';

export const useCreatePost = () => {
  const { posts, validators } = usePostsDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.posts.all(),
    mutationFn: async (input: ICreatePostProps) => {
      const dto = validators.create.validate(input);
      return posts.create(dto);
    },
    optimisticUpdate: (old: IPostVM[] = [], input: ICreatePostProps) => [
      ...old,
      { id: -Date.now(), ...input, __optimistic: true },
    ],
    messages: {
      success: 'Post created successfully!',
      fallbackError: 'Error creating post',
    },
  });
};
