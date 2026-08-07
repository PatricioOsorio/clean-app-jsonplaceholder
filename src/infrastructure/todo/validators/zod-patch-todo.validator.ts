import { PatchTodoDto, TodoInvalidDataError } from '@domain/todo';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { patchTodoSchema } from './todo-schemas';

@injectable()
export class ZodPatchTodoValidator implements IValidatorEntity<PatchTodoDto> {
  validate(input: unknown): PatchTodoDto {
    try {
      const result = patchTodoSchema.parse(input);
      return PatchTodoDto.create(result);
    } catch (error) {
      return handleValidationError(error, TodoInvalidDataError);
    }
  }
}
