import { container, type ClassProvider } from 'tsyringe';

import { AuthRepository, AuthEntity, LoginDto } from '@domain/auth';
import {
  AuthRepositoryApi,
  AuthRepositoryLocal,
  AuthRepositoryMock,
  ZodLoginValidator,
  ZodAuthEntityValidator,
} from '@infrastructure/auth';
import { ENV } from '@infrastructure/utils';

const DATA_SOURCE = ENV.VITE_DATA_SOURCE;

type IAuthRepositoryCtor = ClassProvider<AuthRepository>['useClass'];

const AUTH_REPOSITORIES: Record<typeof DATA_SOURCE, IAuthRepositoryCtor> = {
  api: AuthRepositoryApi,
  mock: AuthRepositoryMock,
  localstorage: AuthRepositoryLocal,
};

const VALIDATORS_REPOSITORIES = {
  zod: {
    login: ZodLoginValidator,
    entity: ZodAuthEntityValidator,
  },
};

container.register(AuthRepository.TOKEN, { useClass: AUTH_REPOSITORIES[DATA_SOURCE] });

container.register(LoginDto.VALIDATOR_TOKEN, { useClass: VALIDATORS_REPOSITORIES.zod.login });

container.register(AuthEntity.VALIDATOR_TOKEN, { useClass: VALIDATORS_REPOSITORIES.zod.entity });

export { container };
