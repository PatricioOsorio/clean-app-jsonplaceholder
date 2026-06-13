import { useQuery } from '@tanstack/react-query';

import { PostMapper } from '@presentation/features/posts/models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useDependencies } from '@presentation/context';

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
