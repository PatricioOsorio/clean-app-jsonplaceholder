import { PostMapper, type IPostUpdateVM, type IPostVM } from '../models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useDependencies } from '@presentation/context';
import { useToastWithOptimistic } from '@presentation/shared/hooks';

export const useUpdatePost = (id: number) => {
  const { updatePostUseCase } = useDependencies();

  return useToastWithOptimistic({
    queryKey: QUERY_KEYS.user.posts(),
    mutationFn: async (input: IPostUpdateVM) => {
      return updatePostUseCase.execute(input.id, PostMapper.toUpdatePostDomain(input));
    },
    optimisticUpdate: (old: IPostVM[] = [], input: IPostUpdateVM) => {
      const updatedFields = PostMapper.toUpdatePostDomain(input);

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

// ? Documentation purposes
// const { updatePostUseCase } = useDependencies();
// const queryClient = useQueryClient();

// const { cancelAndSnapshot, rollback, invalidate } = useMutationBase<IPostVM[]>(
//   QUERY_KEYS.user.posts(),
// );

// return useMutation({
//   onMutate: async (input: IPostUpdateVM) => {
//     const previousPosts = await cancelAndSnapshot();

//     const oldPost = previousPosts?.find((p) => p.id === id);
//     if (!oldPost) return { previousPosts };

//     const optimisticPost: IPostVM = {
//       ...oldPost,
//       ...PostMapper.toUpdatePostDomain(input),
//       id,
//       __optimistic: true,
//     };

//     if (previousPosts) {
//       queryClient.setQueryData<IPostVM[]>(QUERY_KEYS.user.posts(), (old = []) =>
//         old.map((p) => (p.id === optimisticPost.id ? optimisticPost : p)),
//       );
//     }

//     return { previousPosts };
//   },

//   mutationFn: (input: IPostUpdateVM) =>
//     updatePostUseCase.execute(input.id, PostMapper.toUpdatePostDomain(input)),

//   onSuccess: () => {
//     toast.success('Post updated successfully!');
//   },

//   onError: (err, _input, context) => {
//     rollback(context?.previousPosts);
//     toast.error(formatError(err, 'Error updating post').errorMessage);
//   },

//   onSettled: () => {
//     invalidate();
//   },
// });
