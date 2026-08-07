import { inject, injectable } from 'tsyringe';

import {
  AuthEntity,
  AuthInvalidDataError,
  AuthNotFoundError,
  AuthRepository,
  ForgotPasswordDto,
  RegisterDto,
  type LoginDto,
} from '@domain/auth';
import type { IValidatorEntity } from '@domain/shared/validator.entity';
import { LOCAL_STORAGE_KEYS, StorageClient } from '@infrastructure/storage';
import { LocalDb, withDelay } from '@infrastructure/utils';
import {
  SEED_USERS_ROLES_PERMISSIONS,
  simulateFaultAuth,
  type IUserRolesPermissions,
} from './auth.dev';

@injectable()
export class AuthRepositoryLocal implements AuthRepository {
  private readonly usersDb: LocalDb<IUserRolesPermissions>;

  constructor(
    @inject(StorageClient.TOKEN) private readonly storageClient: StorageClient,
    @inject(AuthEntity.TOKEN) private readonly validator: IValidatorEntity<AuthEntity>,
  ) {
    this.usersDb = new LocalDb<IUserRolesPermissions>(
      this.storageClient,
      LOCAL_STORAGE_KEYS.authCredentials,
      SEED_USERS_ROLES_PERMISSIONS,
    );
  }

  async login(loginDto: LoginDto): Promise<AuthEntity> {
    await simulateFaultAuth('login', loginDto.email);

    const [rawUser] = this.usersDb.getBy((u) => u.email === loginDto.email);
    if (!rawUser) {
      throw new AuthNotFoundError(loginDto.email);
    }

    if (rawUser.password !== loginDto.password) {
      throw new AuthInvalidDataError('Invalid credentials');
    }

    const authEntityRaw = new AuthEntity({
      id: rawUser.id,
      email: rawUser.email,
      roles: rawUser.roles,
      permissions: rawUser.permissions,
      createdAt: new Date(),
      userName: rawUser.email,
    });

    const authEntity = this.validator.validate(authEntityRaw);

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

  async register(registerDto: RegisterDto): Promise<AuthEntity> {
    await simulateFaultAuth('register', registerDto.email);

    const [existingUser] = this.usersDb.getBy((u) => u.email === registerDto.email);
    if (existingUser) {
      throw new AuthInvalidDataError('Email already exists');
    }

    const createdUser = this.usersDb.create({
      email: registerDto.email,
      password: registerDto.password,
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
    });

    const authEntityRaw = new AuthEntity({
      id: createdUser.id,
      email: createdUser.email,
      roles: createdUser.roles,
      permissions: createdUser.permissions,
      createdAt: new Date(),
      userName: registerDto.userName,
    });

    const authEntity = this.validator.validate(authEntityRaw);

    this.storageClient.set(LOCAL_STORAGE_KEYS.authSession, authEntity);

    return withDelay(authEntity);
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    await simulateFaultAuth('forgotPassword', dto.email);

    const [user] = this.usersDb.getBy((u) => u.email === dto.email);
    if (!user) {
      throw new AuthNotFoundError(`User with email ${dto.email} not found`);
    }

    // Simulate sending a password reset email
    console.log(`Password reset email sent to ${dto.email}`);

    return withDelay(undefined);
  }
}
