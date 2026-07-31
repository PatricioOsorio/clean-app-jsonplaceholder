import { injectable } from 'tsyringe';

import {
  AuthEntity,
  AuthInvalidDataError,
  AuthNotFoundError,
  AuthRepository,
  type LoginDto,
} from '@domain/auth';
import { withDelay } from '@infrastructure/utils';
import { SEED_USERS_ROLES_PERMISSIONS, simulateFaultAuth } from './auth.dev';

@injectable()
export class AuthRepositoryMock implements AuthRepository {
  private currentUser: AuthEntity | null = null;

  /**
   * Helper method for unit/integration tests to manipulate auth state directly.
   */
  setMockUser(user: AuthEntity | null): void {
    this.currentUser = user;
  }

  async login(loginDto: LoginDto): Promise<AuthEntity> {
    await simulateFaultAuth('login', loginDto.email);

    const user = SEED_USERS_ROLES_PERMISSIONS.find((u) => u.email === loginDto.email);
    if (!user) {
      throw new AuthNotFoundError(loginDto.email);
    }

    if (user.password !== loginDto.password) {
      throw new AuthInvalidDataError('Invalid credentials');
    }

    const authEntity = new AuthEntity(
      user.userId,
      user.email,
      user.email,
      user.roles,
      user.permissions,
      new Date(),
    );

    this.currentUser = authEntity;

    return withDelay(authEntity);
  }

  async logout(): Promise<void> {
    this.currentUser = null;
  }

  async getCurrentUser(): Promise<AuthEntity | null> {
    return withDelay(this.currentUser);
  }
}
