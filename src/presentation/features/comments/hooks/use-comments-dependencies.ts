import { useMemo } from 'react';
import { container } from 'tsyringe';

import { CommentRepository } from '@domain/comment';

export const useCommentsDependencies = () => {
  return useMemo(
    () => ({
      comments: container.resolve<CommentRepository>(CommentRepository.TOKEN),
    }),
    [],
  );
};
