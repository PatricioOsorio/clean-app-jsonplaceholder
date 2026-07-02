import { PostNotFoundError, PostInvalidDataError } from '@domain/post';
import { createFaultSimulator } from '@infrastructure/utils';

export const simulateFaultPost = createFaultSimulator((fault, id) => {
  if (fault === 'not-found') return new PostNotFoundError(id ?? 0);
  if (fault === 'invalid') return new PostInvalidDataError('Simulated invalid data');
});
