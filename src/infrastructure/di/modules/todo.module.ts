import { container, type ClassProvider } from 'tsyringe';

import {
  CreateTodoDto,
  PatchTodoDto,
  TodoEntity,
  TodoRepository,
  UpdateTodoDto,
} from '@domain/todo';
import { ENV } from '@infrastructure/utils';
import {
  TodoRepositoryApi,
  TodoRepositoryLocal,
  TodoRepositoryMock,
  ZodCreateTodoValidator,
  ZodPatchTodoValidator,
  ZodTodoEntityValidator,
  ZodUpdateTodoValidator,
} from '@infrastructure/todo';

const VALIDATOR_PROVIDER = 'zod';
const DATA_SOURCE = ENV.VITE_DATA_SOURCE;

type ITodoRepositoryCtor = ClassProvider<TodoRepository>['useClass'];

const TODO_REPOSITORIES: Record<typeof DATA_SOURCE, ITodoRepositoryCtor> = {
  api: TodoRepositoryApi,
  mock: TodoRepositoryMock,
  localstorage: TodoRepositoryLocal,
};

const VALIDATORS_REPOSITORIES = {
  zod: {
    create: ZodCreateTodoValidator,
    update: ZodUpdateTodoValidator,
    patch: ZodPatchTodoValidator,
    entity: ZodTodoEntityValidator,
  },
};

container.register(TodoRepository.TOKEN, { useClass: TODO_REPOSITORIES[DATA_SOURCE] });

container.register(CreateTodoDto.TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].create,
});

container.register(UpdateTodoDto.TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].update,
});

container.register(PatchTodoDto.TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].patch,
});

container.register(TodoEntity.TOKEN, {
  useClass: VALIDATORS_REPOSITORIES[VALIDATOR_PROVIDER].entity,
});

export { container };
