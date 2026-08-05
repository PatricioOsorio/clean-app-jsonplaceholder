import type { IValidatorEntity } from '@domain/shared';
import { useMemo } from 'react';
import { container } from 'tsyringe';

import { CreateTodoDto, PatchTodoDto, TodoRepository, UpdateTodoDto } from '@domain/todo';

export const useTodosDependencies = () => {
  return useMemo(
    () => ({
      todos: container.resolve<TodoRepository>(TodoRepository.TOKEN),
      validators: {
        create: container.resolve<IValidatorEntity<CreateTodoDto>>(CreateTodoDto.VALIDATOR_TOKEN),
        update: container.resolve<IValidatorEntity<UpdateTodoDto>>(UpdateTodoDto.VALIDATOR_TOKEN),
        patch: container.resolve<IValidatorEntity<PatchTodoDto>>(PatchTodoDto.VALIDATOR_TOKEN),
      },
    }),
    [],
  );
};
