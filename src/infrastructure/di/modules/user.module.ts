import { container, type ClassProvider } from 'tsyringe';

import {
  CreateUserDto,
  PatchUserDto,
  UpdateUserDto,
  UserRepository,
  UserEntity,
} from '@domain/user';
import { ENV } from '@infrastructure/utils';
import {
  UserRepositoryApi,
  ZodCreateUserValidator,
  ZodPatchUserValidator,
  ZodUpdateUserValidator,
  ZodUserEntityValidator,
} from '@infrastructure/user';

const DATA_SOURCE = ENV.VITE_DATA_SOURCE;

type IUserRepositoryCtor = ClassProvider<UserRepository>['useClass'];

const USER_REPOSITORIES: Record<typeof DATA_SOURCE, IUserRepositoryCtor> = {
  api: UserRepositoryApi,
  mock: UserRepositoryApi,
  localstorage: UserRepositoryApi,
};

const VALIDATORS_REPOSITORIES = {
  zod: {
    create: ZodCreateUserValidator,
    update: ZodUpdateUserValidator,
    patch: ZodPatchUserValidator,
    entity: ZodUserEntityValidator,
  },
};

container.register(UserRepository.TOKEN, { useClass: USER_REPOSITORIES[DATA_SOURCE] });

container.register(CreateUserDto.VALIDATOR_TOKEN, {
  useClass: VALIDATORS_REPOSITORIES.zod.create,
});

container.register(UpdateUserDto.VALIDATOR_TOKEN, {
  useClass: VALIDATORS_REPOSITORIES.zod.update,
});

container.register(PatchUserDto.VALIDATOR_TOKEN, {
  useClass: VALIDATORS_REPOSITORIES.zod.patch,
});

container.register(UserEntity.VALIDATOR_TOKEN, {
  useClass: VALIDATORS_REPOSITORIES.zod.entity,
});

export { container };
