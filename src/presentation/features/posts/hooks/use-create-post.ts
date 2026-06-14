import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'styleguide/sonner';

import { useDependencies } from '@presentation/context';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { PostMapper, type IPostCreateVM } from '../models/post';
import type { IPost } from '@domain/post';
import { formatError } from '@presentation/utils';

export const useCreatePost = () => {
  const { createPostUseCase } = useDependencies();
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    // optimistic update
    onMutate: async (input: IPostCreateVM) => {
      const key = QUERY_KEYS.user.posts();

      // abort current refetch
      await queryClient.cancelQueries({ queryKey: key });

      // snapshot (to rollback)
      const previousPosts = queryClient.getQueryData<IPost[]>(key);

      // optimistically domain update
      const optimisticPost: IPost = {
        id: Date.now(), // temporary id — toVM derives __optimistic from it
        ...PostMapper.toCreatePostDomain(input),
      };

      // write to cache
      // don not apply optimistic if we have no data
      if (previousPosts) {
        queryClient.setQueryData<IPost[]>(key, (old = []) => [...old, optimisticPost]);
      }

      // pass snapshot to onError/onSettled
      return { previousPosts };
    },

    mutationFn: (input: IPostCreateVM) =>
      createPostUseCase.execute(PostMapper.toCreatePostDomain(input)),

    onSuccess: () => {
      toast.success('Post created successfully!');
    },

    onError: (_err, _input, context) => {
      // rollback
      queryClient.setQueryData(QUERY_KEYS.user.posts(), context?.previousPosts);

      const errorMessage = formatError(_err, 'Error creating post').errorMessage;

      toast.error(errorMessage);
    },

    onSettled: () => {
      // sync with server
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.posts() });
    },
  });

  return createPostMutation;
};
