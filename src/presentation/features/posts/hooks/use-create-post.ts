import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'styleguide/sonner';

import { formatError } from '@presentation/utils';
import { PostMapper, type IPostCreateVM, type IPostVM } from '../models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useDependencies } from '@presentation/context';

export const useCreatePost = () => {
  const { createPostUseCase } = useDependencies();
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationKey: ['post-create'],

    onMutate: async (input: IPostCreateVM) => {
      const key = QUERY_KEYS.user.posts();
      // abort current refetch
      await queryClient.cancelQueries({ queryKey: key });

      // snapshot (to rollback)
      const previousPosts = queryClient.getQueryData<IPostVM[]>(key);

      // optimistically domain update
      const optimisticPost: IPostVM = {
        id: -Date.now(),
        ...PostMapper.toCreatePostDomain(input),
        __optimistic: true,
      };

      // write to cache
      // don not apply optimistic if we have no data
      if (previousPosts) {
        queryClient.setQueryData<IPostVM[]>(key, (old = []) => [...old, optimisticPost]);
      }

      // pass snapshot to onError/onSettled
      return { previousPosts };
    },

    mutationFn: (input: IPostCreateVM) =>
      createPostUseCase.execute(PostMapper.toCreatePostDomain(input)),

    onSuccess: () => {
      toast.success('Post created successfully!');
    },

    onError: (err, _input, context) => {
      // rollback
      queryClient.setQueryData(QUERY_KEYS.user.posts(), context?.previousPosts);

      const errorMessage = formatError(err, 'Error creating post').errorMessage;
      toast.error(errorMessage);
    },

    onSettled: () => {
      // sync with server
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.posts() });
    },
  });

  return createPostMutation;
};
