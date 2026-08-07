import { AuthInvalidDataError, AuthNotFoundError, type AuthEntity } from '@domain/auth';
import { createFaultSimulator } from '@infrastructure/utils';

export interface IUserRolesPermissions {
  id: number;
  email: string;
  password: string;
  roles: AuthEntity['roles'];
  permissions: AuthEntity['permissions'];
}

export const SEED_USERS_ROLES_PERMISSIONS: IUserRolesPermissions[] = [
  {
    id: 1,
    email: 'Sincere@april.biz',
    password: 'pass',
    roles: ['admin'],
    permissions: ['posts:read'],
  },
  {
    id: 2,
    email: 'Shanna@melissa.tv',
    password: 'pass',
    roles: ['user'],
    permissions: ['posts:read', 'posts:create'],
  },
  {
    id: 3,
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
