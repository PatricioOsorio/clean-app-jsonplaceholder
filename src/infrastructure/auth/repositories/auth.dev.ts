import { AuthInvalidDataError, AuthNotFoundError, type AuthEntity } from '@domain/auth';
import { createFaultSimulator } from '@infrastructure/utils';

export interface IUserRolesPermissions {
  userId: number;
  email: string;
  password: string;
  roles: AuthEntity['roles'];
  permissions: AuthEntity['permissions'];
}

export const SEED_USERS_ROLES_PERMISSIONS: IUserRolesPermissions[] = [
  {
    userId: 1,
    email: 'Sincere@april.biz',
    password: 'pass',
    roles: ['admin'],
    permissions: ['posts:read'],
  },
  {
    userId: 2,
    email: 'Shanna@melissa.tv',
    password: 'pass',
    roles: ['user'],
    permissions: ['posts:read', 'posts:create'],
  },
  {
    userId: 3,
    email: 'Nathan@yesenia.net',
    password: 'pass',
    roles: ['guest'],
    permissions: ['posts:read'],
  },
];

export const simulateFaultAuth = createFaultSimulator<string>((fault, email = 'unknown') => {
  if (fault === 'not-found') return new AuthNotFoundError(email);
  if (fault === 'invalid') return new AuthInvalidDataError('Simulated invalid data');
});
