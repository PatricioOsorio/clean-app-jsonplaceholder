import type { IValidatorEntity } from '@domain/shared';
import { useMemo } from 'react';
import { container } from 'tsyringe';

import { CreateTodoDto, PatchTodoDto, TodoRepository, UpdateTodoDto } from '@domain/todo';

export const useTodosDependencies = () => {
  return useMemo(
    () => ({
      todos: container.resolve<TodoRepository>(TodoRepository.TOKEN),
      validators: {
        create: container.resolve<IValidatorEntity<CreateTodoDto>>(CreateTodoDto.TOKEN),
        update: container.resolve<IValidatorEntity<UpdateTodoDto>>(UpdateTodoDto.TOKEN),
        patch: container.resolve<IValidatorEntity<PatchTodoDto>>(PatchTodoDto.TOKEN),
      },
    }),
    [],
  );
};
