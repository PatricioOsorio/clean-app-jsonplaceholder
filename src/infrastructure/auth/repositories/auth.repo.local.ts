import { inject, injectable } from 'tsyringe';

import {
  AuthEntity,
  AuthInvalidDataError,
  AuthNotFoundError,
  AuthRepository,
  type LoginDto,
} from '@domain/auth';
import type { IValidatorEntity } from '@domain/shared/validator.entity';
import { LOCAL_STORAGE_KEYS, StorageClient } from '@infrastructure/storage';
import { withDelay } from '@infrastructure/utils';
import { SEED_USERS_ROLES_PERMISSIONS, simulateFaultAuth } from './auth.dev';

@injectable()
export class AuthRepositoryLocal implements AuthRepository {
  constructor(
    @inject(StorageClient.TOKEN) private readonly storageClient: StorageClient,
    @inject(AuthEntity.TOKEN) private readonly validator: IValidatorEntity<AuthEntity>,
  ) {}

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

    this.storageClient.set(LOCAL_STORAGE_KEYS.authSession, authEntity);

    return withDelay(authEntity);
  }

  async logout(): Promise<void> {
    this.storageClient.remove(LOCAL_STORAGE_KEYS.authSession);
  }

  async getCurrentUser(): Promise<AuthEntity | null> {
    const session = this.storageClient.get<AuthEntity>(LOCAL_STORAGE_KEYS.authSession);
    if (!session) return null;

    return this.validator.validate(session);
  }
}
