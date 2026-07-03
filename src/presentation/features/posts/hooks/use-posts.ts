import { useQuery } from '@tanstack/react-query';

import { PostMapper } from '@presentation/features/posts/models/post';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { usePostsDependencies } from '@presentation/features/posts/hooks';
import type { IGetPostsParams } from '@domain/post';

export const usePosts = (params?: IGetPostsParams) => {
  const { posts } = usePostsDependencies();

  const postsQuery = useQuery({
    queryKey: QUERY_KEYS.posts.all(params),
    queryFn: async () => {
      const result = await posts.getAll(params);
      return {
        data: PostMapper.toVMs(result.data),
        total: result.total,
      };
    },
  });

  return postsQuery;
};
