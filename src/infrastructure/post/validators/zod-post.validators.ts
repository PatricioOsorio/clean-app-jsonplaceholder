import { injectable } from 'tsyringe';
import { z, ZodError } from 'zod';

import { PostInvalidDataError } from '@domain/post/errors';
import type { IValidatorEntity, IValidationIssue } from '@domain/shared/validator.entity';
import type { ICreatePostInput, IPatchPostInput, IUpdatePostInput } from '@domain/post';

function toPostError(error: unknown): never {
  if (error instanceof ZodError) {
    const issues: IValidationIssue[] = error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    const message = issues.map((i) => `${i.field}: ${i.message}`).join(', ');
    throw new PostInvalidDataError(message || 'Validation error', issues);
  }
  throw error;
}

@injectable()
export class ZodCreatePostValidator implements IValidatorEntity<ICreatePostInput> {
  private schema = z.object({
    idUser: z.number(),
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
  });

  validate(input: unknown): ICreatePostInput {
    try {
      return this.schema.parse(input);
    } catch (error) {
      toPostError(error);
    }
  }
}

@injectable()
export class ZodUpdatePostValidator implements IValidatorEntity<IUpdatePostInput> {
  private schema = z.object({
    idUser: z.number(),
    title: z.string().min(1, 'Title cannot be empty'),
    content: z.string().min(1, 'Content cannot be empty'),
  });

  validate(input: unknown): IUpdatePostInput {
    try {
      return this.schema.parse(input);
    } catch (error) {
      toPostError(error);
    }
  }
}

@injectable()
export class ZodPatchPostValidator implements IValidatorEntity<IPatchPostInput> {
  private schema = z
    .object({
      idUser: z.number().optional(),
      title: z.string().min(1, 'Title cannot be empty').optional(),
      content: z.string().min(1, 'Content cannot be empty').optional(),
    })
    .refine((data) => Object.values(data).some((v) => v !== undefined), {
      message: 'At least one field is required',
    });

  validate(input: unknown): IPatchPostInput {
    try {
      return this.schema.parse(input);
    } catch (error) {
      toPostError(error);
    }
  }
}
