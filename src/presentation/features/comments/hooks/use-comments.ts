import { useQuery } from '@tanstack/react-query';

import { useCommentsDependencies } from '@presentation/features/comments/hooks';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { CommentMapper, type ICommentVM } from '@presentation/features/comments/models';

export const useComments = (id?: number) => {
  const { comments } = useCommentsDependencies();

  const commentQuery = useQuery({
    queryKey: QUERY_KEYS.comments.byPost(id),
    queryFn: async () => {
      if (!id) return [] as unknown as ICommentVM[];

      return CommentMapper.toVMs(await comments.getByPostId(id));
    },
    enabled: !!id,
  });

  return commentQuery;
};
