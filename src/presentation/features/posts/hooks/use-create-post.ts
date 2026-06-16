import { PostMapper, type IPostCreateVM, type IPostVM } from '../models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useDependencies } from '@presentation/context';
import { useToastWithOptimistic } from '@presentation/shared/hooks';

export const useCreatePost = () => {
  const { createPostUseCase } = useDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.user.posts(),
    mutationFn: async (input: IPostCreateVM) => {
      return createPostUseCase.execute(PostMapper.toCreatePostInputDomain(input));
    },
    optimisticUpdate: (old: IPostVM[] = [], input: IPostCreateVM) => [
      ...old,
      {
        id: -Date.now(),
        ...PostMapper.toCreatePostInputDomain(input),
        __optimistic: true,
      },
    ],
    messages: {
      success: 'Post created successfully!',
      fallbackError: 'Error creating post',
    },
  });
};
