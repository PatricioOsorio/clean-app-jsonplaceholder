import { injectable } from 'tsyringe';

import {
  AuthEntity,
  AuthInvalidDataError,
  AuthNotFoundError,
  AuthRepository,
  ForgotPasswordDto,
  RegisterDto,
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

    const authEntity = new AuthEntity({
      id: user.id,
      email: user.email,
      userName: user.email,
      roles: user.roles,
      permissions: user.permissions,
      createdAt: new Date(),
    });

    this.currentUser = authEntity;

    return withDelay(authEntity);
  }

  async logout(): Promise<void> {
    this.currentUser = null;
  }

  async getCurrentUser(): Promise<AuthEntity | null> {
    return withDelay(this.currentUser);
  }

  async register(registerDto: RegisterDto): Promise<AuthEntity> {
    await simulateFaultAuth('register', registerDto.email);

    const authEntity = new AuthEntity({
      id: Date.now(),
      email: registerDto.email,
      userName: registerDto.userName,
      roles: ['user'],
      permissions: [
        'comments:create',
        'comments:delete',
        'comments:read',
        'comments:update',
        'posts:create',
        'posts:delete',
        'posts:read',
        'posts:update',
      ],
      createdAt: new Date(),
    });

    this.currentUser = authEntity;

    return withDelay(authEntity);
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    await simulateFaultAuth('forgotPassword', dto.email);
    return withDelay(undefined);
  }
}
