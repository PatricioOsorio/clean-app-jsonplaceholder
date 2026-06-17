import { injectable } from 'tsyringe';
import { z, ZodError } from 'zod';

import { PostInvalidDataError } from '@domain/post/errors';
import type { ValidatorEntity } from '@domain/shared';
import type { ICreatePostInput, IPatchPostInput, IUpdatePostInput } from '@domain/post';

function toPostError(error: unknown): never {
  if (error instanceof ZodError) {
    throw new PostInvalidDataError(error.issues[0]?.message ?? 'Validation error');
  }
  throw error;
}

@injectable()
export class ZodCreatePostValidator implements ValidatorEntity<ICreatePostInput> {
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
export class ZodUpdatePostValidator implements ValidatorEntity<IUpdatePostInput> {
  private schema = z.object({
    idUser: z.number().optional(),
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
export class ZodPatchPostValidator implements ValidatorEntity<IPatchPostInput> {
  private schema = z
    .object({
      idUser: z.number().optional(),
      title: z.string().min(1, 'Title cannot be empty').optional(),
      content: z.string().min(1, 'Content cannot be empty').optional(),
    })
    .refine((data) => Object.keys(data).length > 0, { message: 'At least one field is required' });

  validate(input: unknown): IPatchPostInput {
    try {
      return this.schema.parse(input);
    } catch (error) {
      toPostError(error);
    }
  }
}
