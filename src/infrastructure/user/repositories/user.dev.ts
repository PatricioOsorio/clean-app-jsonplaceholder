import { UserNotFoundError, UserInvalidDataError, UserEntity } from '@domain/user';
import { createFaultSimulator } from '@infrastructure/utils';

export const simulateFaultUser = createFaultSimulator((fault, id) => {
  if (fault === 'not-found') return new UserNotFoundError(Number(id ?? 0));
  if (fault === 'invalid') return new UserInvalidDataError('Simulated invalid data');
});

export const SEED_USER: UserEntity[] = [
  { id: 1, email: 'john.doe@example.com', name: 'John Doe', userName: 'johndoe' },
  { id: 2, email: 'jane.smith@example.com', name: 'Jane Smith', userName: 'janesmith' },
  { id: 3, email: 'bob.johnson@example.com', name: 'Bob Johnson', userName: 'bobjohnson' },
  { id: 4, email: 'alice.brown@example.com', name: 'Alice Brown', userName: 'alicebrown' },
  { id: 5, email: 'charlie.davis@example.com', name: 'Charlie Davis', userName: 'charliedavis' },
];
