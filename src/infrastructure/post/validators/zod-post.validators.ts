import { injectable } from 'tsyringe';
import { z, ZodError } from 'zod';

import { PostInvalidDataError } from '@domain/post/errors';
import type { IValidatorEntity, IValidationIssue } from '@domain/shared/validator.entity';
import { CreatePostDto, UpdatePostDto, PatchPostDto } from '@domain/post';

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
export class ZodCreatePostValidator implements IValidatorEntity<CreatePostDto> {
  private schema = z.object({
    idUser: z.number(),
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
  });

  validate(input: unknown): CreatePostDto {
    try {
      const result = this.schema.parse(input);
      return CreatePostDto.create(result);
    } catch (error) {
      toPostError(error);
    }
  }
}

@injectable()
export class ZodUpdatePostValidator implements IValidatorEntity<UpdatePostDto> {
  private schema = z.object({
    id: z.number(),
    idUser: z.number(),
    title: z.string().min(1, 'Title cannot be empty'),
    content: z.string().min(1, 'Content cannot be empty'),
  });

  validate(input: unknown): UpdatePostDto {
    try {
      const result = this.schema.parse(input);
      return UpdatePostDto.create(result);
    } catch (error) {
      toPostError(error);
    }
  }
}

@injectable()
export class ZodPatchPostValidator implements IValidatorEntity<PatchPostDto> {
  private schema = z
    .object({
      idUser: z.number().optional(),
      title: z.string().min(1, 'Title cannot be empty').optional(),
      content: z.string().min(1, 'Content cannot be empty').optional(),
    })
    .refine((data) => Object.values(data).some((v) => v !== undefined), {
      message: 'At least one field is required',
    });

  validate(input: unknown): PatchPostDto {
    try {
      const result = this.schema.parse(input);
      return PatchPostDto.create(result);
    } catch (error) {
      toPostError(error);
    }
  }
}
