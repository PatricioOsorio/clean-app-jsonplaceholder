import {
  CreateTodoDto,
  PatchTodoDto,
  TodoEntity,
  TodoInvalidDataError,
  UpdateTodoDto,
} from '@domain/todo';
import type { IValidator, IValidatorEntity } from '@domain/shared';
import { injectable } from 'tsyringe';
import { z } from 'zod';

const todoEntitySchema = z.object({
  id: z.number().positive(),
  idUser: z.number().positive(),
  title: z.string().min(1),
  completed: z.boolean(),
});

const createTodoSchema = z.object({
  idUser: z.number().positive('User ID is required and must be positive'),
  title: z.string().min(1, 'Title cannot be empty'),
  completed: z.boolean().default(false),
});

const updateTodoSchema = createTodoSchema;

const patchTodoSchema = createTodoSchema.partial();

@injectable()
export class ZodTodoEntityValidator implements IValidatorEntity<TodoEntity> {
  validate(data: unknown): TodoEntity {
    const result = todoEntitySchema.safeParse(data);
    if (!result.success) {
      throw new TodoInvalidDataError('Invalid Todo entity structure', result.error.format());
    }
    return result.data;
  }
}

@injectable()
export class ZodCreateTodoValidator implements IValidator<CreateTodoDto> {
  validate(input: unknown): CreateTodoDto {
    const result = createTodoSchema.safeParse(input);
    if (!result.success) {
      throw new TodoInvalidDataError('Invalid create todo data', result.error.format());
    }
    return CreateTodoDto.create(result.data);
  }
}

@injectable()
export class ZodUpdateTodoValidator implements IValidator<UpdateTodoDto> {
  validate(input: unknown): UpdateTodoDto {
    const result = updateTodoSchema.safeParse(input);
    if (!result.success) {
      throw new TodoInvalidDataError('Invalid update todo data', result.error.format());
    }
    return UpdateTodoDto.create(result.data);
  }
}

@injectable()
export class ZodPatchTodoValidator implements IValidator<PatchTodoDto> {
  validate(input: unknown): PatchTodoDto {
    const result = patchTodoSchema.safeParse(input);
    if (!result.success) {
      throw new TodoInvalidDataError('Invalid patch todo data', result.error.format());
    }
    return PatchTodoDto.create(result.data);
  }
}
