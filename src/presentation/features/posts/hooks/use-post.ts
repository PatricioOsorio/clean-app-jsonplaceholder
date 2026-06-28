import { useQuery } from '@tanstack/react-query';

import { PostMapper } from '@presentation/features/posts/models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePostsDependencies } from '@presentation/features/posts/hooks/use-posts-dependencies';

export const usePost = (id?: number) => {
  const { posts } = usePostsDependencies();

  const postQuery = useQuery({
    queryKey: QUERY_KEYS.user.post(id),
    queryFn: async () => PostMapper.toVM(await posts.getById(id!)),
    enabled: !!id,
  });

  return postQuery;
};
