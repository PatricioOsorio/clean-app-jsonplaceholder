import { useQuery } from '@tanstack/react-query';

import { PostMapper, type IPostCacheEntry } from '@presentation/features/posts/models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useDependencies } from '@presentation/context';

export const usePosts = () => {
  const { getPostsUseCase } = useDependencies();

  const postsQuery = useQuery({
    queryKey: QUERY_KEYS.user.posts(),
    queryFn: () => getPostsUseCase.execute(),
    select: (domain) => PostMapper.toVMs(domain as IPostCacheEntry[]),
  });

  return postsQuery;
};
