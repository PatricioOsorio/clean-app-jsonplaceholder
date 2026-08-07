import { TodoEntity, TodoInvalidDataError } from '@domain/todo';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { todoEntitySchema } from './todo-schemas';

@injectable()
export class ZodTodoEntityValidator implements IValidatorEntity<TodoEntity> {
  validate(data: unknown): TodoEntity {
    try {
      const result = todoEntitySchema.parse(data);
      return new TodoEntity({
        id: result.id,
        idUser: result.idUser,
        title: result.title,
        completed: result.completed,
      });
    } catch (error) {
      return handleValidationError(error, TodoInvalidDataError);
    }
  }
}
