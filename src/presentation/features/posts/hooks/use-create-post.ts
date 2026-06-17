import { PostMapper, type IPostCreateInputVM, type IPostVM } from '../models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useDependencies } from '@presentation/context';
import { useToastWithOptimistic } from '@presentation/shared/hooks';

export const useCreatePost = () => {
  const { posts } = useDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.user.posts(),
    mutationFn: async (input: IPostCreateInputVM) => {
      return posts.create.execute(PostMapper.toCreatePostInputDomain(input));
    },
    optimisticUpdate: (old: IPostVM[] = [], input: IPostCreateInputVM) => [
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
