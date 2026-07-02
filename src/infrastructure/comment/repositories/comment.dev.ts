import { CommentInvalidDataError, CommentNotFoundError } from '@domain/comment';
import { createFaultSimulator } from '@infrastructure/utils';

export const simulateFaultComment = createFaultSimulator((fault, id) => {
  if (fault === 'not-found') return new CommentNotFoundError(id ?? 0);
  if (fault === 'invalid') return new CommentInvalidDataError('Simulated invalid data');
});
