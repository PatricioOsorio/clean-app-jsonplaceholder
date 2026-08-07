import { CreateTodoDto, TodoInvalidDataError } from '@domain/todo';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { createTodoSchema } from './todo-schemas';

@injectable()
export class ZodCreateTodoValidator implements IValidatorEntity<CreateTodoDto> {
  validate(input: unknown): CreateTodoDto {
    try {
      const result = createTodoSchema.parse(input);
      return CreateTodoDto.create(result);
    } catch (error) {
      return handleValidationError(error, TodoInvalidDataError);
    }
  }
}
