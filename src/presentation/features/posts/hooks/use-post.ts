import { useQuery } from '@tanstack/react-query';

import { PostMapper } from '@presentation/features/posts/models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useDependencies } from '@presentation/context';

export const usePost = (id?: number) => {
  const { posts } = useDependencies();

  const postQuery = useQuery({
    queryKey: QUERY_KEYS.user.post(id),
    queryFn: async () => PostMapper.toVM(await posts.getOne.execute(id!)),
    enabled: !!id,
  });

  return postQuery;
};
