import { UserNotFoundError, UserInvalidDataError } from '@domain/user';
import { createFaultSimulator } from '@infrastructure/utils';

export const simulateFaultUser = createFaultSimulator((fault, id) => {
  if (fault === 'not-found') return new UserNotFoundError(id ?? 0);
  if (fault === 'invalid') return new UserInvalidDataError('Simulated invalid data');
});
