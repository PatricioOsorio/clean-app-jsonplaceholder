import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../libs/tanstack';
import { useDependencies } from '../../context/dependencies.context';
import { PostMapper } from '../../models/post/';

export const usePosts = () => {
  const { getPostsUseCase } = useDependencies();

  const postsQuery = useQuery({
    queryKey: QUERY_KEYS.user.posts(),
    queryFn: () => getPostsUseCase.execute(),
    select: (postsDomain) => PostMapper.toVMs(postsDomain),
  });

  return postsQuery;
};
