import { injectable, inject } from 'tsyringe';

import {
  AuthEntity,
  AuthInvalidDataError,
  AuthNotFoundError,
  AuthRepository,
  LoginDto,
} from '@domain/auth';
import { createApiErrorHandler } from '@infrastructure/http';
import { DomainError } from '@domain/errors';
import { UserRepository } from '@domain/user';
import { LOCAL_STORAGE_KEYS, StorageClient } from '@infrastructure/storage';

interface IUserWithRolesAndPermissions {
  userId: number;
  email: string;
  password: string;
  roles: AuthEntity['roles'];
  permissions: AuthEntity['permissions'];
}

const USERS_WITH_ROLES_AND_PERMISSIONS: IUserWithRolesAndPermissions[] = [
  {
    userId: 1,
    email: 'Sincere@april.biz',
    password: 'pass',
    roles: ['admin', 'user'],
    permissions: ['read', 'write', 'delete'],
  },
  {
    userId: 2,
    email: 'Shanna@melissa.tv',
    password: 'pass',
    roles: ['user'],
    permissions: ['read', 'write'],
  },
  {
    userId: 3,
    email: 'Nathan@yesenia.net',
    password: 'pass',
    roles: ['guest'],
    permissions: ['read'],
  },
];

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
  ) {}

  private handleError(error: unknown, authId?: number): never {
    return authErrorHandler(error, authId);
  }

  async login(loginDto: LoginDto): Promise<AuthEntity> {
    try {
      const userFromApi = await this.userRepository.getByEmail(loginDto.email);
      if (!userFromApi) throw new AuthNotFoundError(loginDto.email);

      // search from local simulation
      const userMock = USERS_WITH_ROLES_AND_PERMISSIONS.find(
        (user) => user.email === loginDto.email,
      );
      if (!userMock) throw new AuthNotFoundError(loginDto.email);

      // validate mock password
      const isPasswordValid = userMock.password === loginDto.password;
      if (!isPasswordValid) throw new AuthInvalidDataError('Invalid credentials');

      // create passport
      const authEntity = new AuthEntity(
        userMock.userId,
        userFromApi.userName,
        userMock.email,
        userMock.roles,
        userMock.permissions,
        new Date(),
      );

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
    return this.storageClient.get(LOCAL_STORAGE_KEYS.authSession);
  }
}
