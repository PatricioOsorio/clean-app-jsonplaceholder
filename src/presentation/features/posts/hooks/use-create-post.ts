import { PostMapper, type IPostCreateVM, type IPostVM } from '../models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useDependencies } from '@presentation/context';
import { useToastWithOptimistic } from '@presentation/shared/hooks';

export const useCreatePost = () => {
  const { createPostUseCase } = useDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.user.posts(),
    mutationFn: async (input: IPostCreateVM) => {
      return createPostUseCase.execute(PostMapper.toCreatePostDomain(input));
    },
    optimisticUpdate: (old: IPostVM[] = [], input: IPostCreateVM) => [
      ...old,
      {
        id: -Date.now(),
        ...PostMapper.toCreatePostDomain(input),
        __optimistic: true,
      },
    ],
    messages: {
      success: 'Post created successfully!',
      fallbackError: 'Error creating post',
    },
  });
};

// ? Documentation purposes
// const { createPostUseCase } = useDependencies();
// const queryClient = useQueryClient();

// const { cancelAndSnapshot, rollback, invalidate } = useMutationBase<IPostVM[]>(
//   QUERY_KEYS.user.posts(),
// );

// return useMutation({
//   onMutate: async (input: IPostCreateVM) => {
//     const previousPosts = await cancelAndSnapshot();

//     const optimisticPost: IPostVM = {
//       id: -Date.now(),
//       ...PostMapper.toCreatePostDomain(input),
//       __optimistic: true,
//     };

//     if (previousPosts) {
//       queryClient.setQueryData<IPostVM[]>(QUERY_KEYS.user.posts(), (old = []) => [
//         ...old,
//         optimisticPost,
//       ]);
//     }

//     return { previousPosts };
//   },

//   mutationFn: (input: IPostCreateVM) =>
//     createPostUseCase.execute(PostMapper.toCreatePostDomain(input)),

//   onSuccess: () => {
//     toast.success('Post created successfully!');
//   },

//   onError: (err, _input, context) => {
//     rollback(context?.previousPosts);
//     toast.error(formatError(err, 'Error creating post').errorMessage);
//   },

//   onSettled: () => {
//     invalidate();
//   },
// });
