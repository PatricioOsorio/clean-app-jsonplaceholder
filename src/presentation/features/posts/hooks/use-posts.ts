import { useQuery } from '@tanstack/react-query';

import { PostMapper } from '@presentation/features/posts/models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePostsDependencies } from '@presentation/features/posts/hooks';

export const usePosts = () => {
  const { posts } = usePostsDependencies();

  const postsQuery = useQuery({
    queryKey: QUERY_KEYS.user.posts(),
    queryFn: async () => PostMapper.toVMs(await posts.getAll()),
  });

  return postsQuery;
};
