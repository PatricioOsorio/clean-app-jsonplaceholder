import type { IGetCommentsParams } from '@domain/comment';
import { useCommentsDependencies } from '@presentation/features/comments/hooks';
import { CommentMapper } from '@presentation/features/comments/models';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useQuery } from '@tanstack/react-query';

export const useComments = (params?: IGetCommentsParams) => {
  const { comments } = useCommentsDependencies();

  const commentsQuery = useQuery({
    queryKey: QUERY_KEYS.comments.all(params),
    queryFn: async () => {
      const result = await comments.getAll(params);
      return {
        data: CommentMapper.toVMs(result.data),
        total: result.total,
      };
    },
  });

  return commentsQuery;
};
