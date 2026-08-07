import { injectable, inject } from 'tsyringe';

import {
  AuthEntity,
  AuthInvalidDataError,
  AuthNotFoundError,
  AuthRepository,
  ForgotPasswordDto,
  RegisterDto,
  type LoginDto,
} from '@domain/auth';
import { createApiErrorHandler } from '@infrastructure/http';
import { DomainError } from '@domain/errors';
import { UserRepository } from '@domain/user';
import { LOCAL_STORAGE_KEYS, StorageClient } from '@infrastructure/storage';
import type { IValidatorEntity } from '@domain/shared/validator.entity';
import { SEED_USERS_ROLES_PERMISSIONS, simulateFaultAuth } from './auth.dev';
import { withDelay } from '@infrastructure/utils';

const authErrorHandler = createApiErrorHandler((error, email) => {
  if (error.gatewayCode !== 'NOT_FOUND') {
    return;
  }

  if (email !== undefined) {
    return new AuthNotFoundError(String(email));
  }

  return new DomainError('Load Failed', 'Could not load auth from server.', 'NOT_FOUND');
});

@injectable()
export class AuthRepositoryApi implements AuthRepository {
  constructor(
    @inject(UserRepository.TOKEN) private readonly userRepository: UserRepository,
    @inject(StorageClient.TOKEN) private readonly storageClient: StorageClient,
    @inject(AuthEntity.TOKEN) private readonly validator: IValidatorEntity<AuthEntity>,
  ) {}

  private handleError(error: unknown, authId?: number): never {
    return authErrorHandler(error, authId);
  }

  async login(loginDto: LoginDto): Promise<AuthEntity> {
    try {
      const userFromApi = await this.userRepository.getByEmail(loginDto.email);
      if (!userFromApi) throw new AuthNotFoundError(loginDto.email);

      // search from local simulation
      const userMock = SEED_USERS_ROLES_PERMISSIONS.find((user) => user.email === loginDto.email);
      if (!userMock) throw new AuthNotFoundError(loginDto.email);

      // validate mock password
      const isPasswordValid = userMock.password === loginDto.password;
      if (!isPasswordValid) throw new AuthInvalidDataError('Invalid credentials');

      // create passport
      const authEntityRaw = new AuthEntity({
        id: userFromApi.id,
        email: userFromApi.email,
        userName: userFromApi.userName,
        roles: userMock.roles,
        permissions: userMock.permissions,
        createdAt: new Date(),
      });

      const authEntity = this.validator.validate(authEntityRaw);

      // store auth session in local storage
      this.storageClient.set(LOCAL_STORAGE_KEYS.authSession, authEntity);

      return authEntity;
    } catch (error) {
      this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    this.storageClient.remove(LOCAL_STORAGE_KEYS.authSession);
  }

  async getCurrentUser(): Promise<AuthEntity | null> {
    const session = this.storageClient.get<AuthEntity>(LOCAL_STORAGE_KEYS.authSession);
    if (!session) return null;

    return this.validator.validate(session);
  }

  async register(registerDto: RegisterDto): Promise<AuthEntity> {
    try {
      await simulateFaultAuth('register', registerDto.email);

      const authEntityRaw = new AuthEntity({
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

      const authEntity = this.validator.validate(authEntityRaw);
      this.storageClient.set(LOCAL_STORAGE_KEYS.authSession, authEntity);

      return authEntity;
    } catch (error) {
      this.handleError(error);
    }
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    try {
      await simulateFaultAuth('forgotPassword', dto.email);
      return withDelay(undefined);
    } catch (error) {
      this.handleError(error);
    }
  }
}
