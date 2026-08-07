import { TodoInvalidDataError, UpdateTodoDto } from '@domain/todo';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { updateTodoSchema } from './todo-schemas';

@injectable()
export class ZodUpdateTodoValidator implements IValidatorEntity<UpdateTodoDto> {
  validate(input: unknown): UpdateTodoDto {
    try {
      const result = updateTodoSchema.parse(input);
      return UpdateTodoDto.create(result);
    } catch (error) {
      return handleValidationError(error, TodoInvalidDataError);
    }
  }
}
