import { useQuery } from '@tanstack/react-query';

import { PostMapper } from '@presentation/features/posts/models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useDependencies } from '@presentation/context';

export const usePosts = () => {
  const { posts } = useDependencies();

  const postsQuery = useQuery({
    queryKey: QUERY_KEYS.user.posts(),
    queryFn: async () => PostMapper.toVMs(await posts.getAll.execute()),
  });

  return postsQuery;
};
