import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../libs/tanstack/';
import { useDependencies } from '../../context/dependencies.context';
import { PostMapper } from '../../models/post';

export const usePost = (id?: number) => {
  const { getPostUseCase } = useDependencies();

  const postQuery = useQuery({
    queryKey: QUERY_KEYS.user.post(id),
    queryFn: () => {
      if (!id) throw new Error('Post ID is required');
      return getPostUseCase.execute(id);
    },
    select: (postDomain) => PostMapper.toVM(postDomain),
    enabled: !!id,
  });

  return postQuery;
};
