import { CreatePostDto } from '@domain/post';
import { PostMapper, type IPostCreateInputVM, type IPostVM } from '../models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePostsDependencies } from './use-posts-dependencies';
import { useToastWithOptimistic } from '@presentation/shared/hooks';

export const useCreatePost = () => {
  const { posts, validators } = usePostsDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.user.posts(),
    mutationFn: async (input: IPostCreateInputVM) => {
      const rawInput = PostMapper.toCreatePostInputDomain(input);
      const dto = CreatePostDto.create(rawInput, validators.create);
      return posts.create(dto);
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
