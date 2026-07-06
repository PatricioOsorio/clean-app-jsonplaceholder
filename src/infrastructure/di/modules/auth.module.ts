import { container, type ClassProvider } from 'tsyringe';

import { AuthRepository, LoginDto } from '@domain/auth';
import { AuthRepositoryApi, ZodLoginValidator } from '@infrastructure/auth';
import { ENV } from '@infrastructure/utils';

const DATA_SOURCE = ENV.VITE_DATA_SOURCE;

type IAuthRepositoryCtor = ClassProvider<AuthRepository>['useClass'];

const AUTH_REPOSITORIES: Record<typeof DATA_SOURCE, IAuthRepositoryCtor> = {
  api: AuthRepositoryApi,
  mock: AuthRepositoryApi,
  localstorage: AuthRepositoryApi,
};

const VALIDATORS_REPOSITORIES = {
  zod: {
    login: ZodLoginValidator,
  },
};

container.register(AuthRepository.TOKEN, { useClass: AUTH_REPOSITORIES[DATA_SOURCE] });

container.register(LoginDto.VALIDATOR_TOKEN, { useClass: VALIDATORS_REPOSITORIES.zod.login });

export { container };
