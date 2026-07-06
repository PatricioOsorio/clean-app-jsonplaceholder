import { injectable } from 'tsyringe';
import z from 'zod';

import {
  CommentInvalidDataError,
  CreateCommentDto,
  PatchCommentDto,
  UpdateCommentDto,
} from '@domain/comment';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';

@injectable()
export class ZodCreateCommentValidator implements IValidatorEntity<CreateCommentDto> {
  private schema: z.ZodType<CreateCommentDto> = z.object({
    idPost: z.number(),
    name: z.string().min(1, 'Name is required'),
    email: z.email(),
    content: z.string().min(1, 'Content is required'),
  });

  validate(input: unknown): CreateCommentDto {
    try {
      const result = this.schema.parse(input);
      return CreateCommentDto.create(result);
    } catch (error) {
      return handleValidationError(error, CommentInvalidDataError);
    }
  }
}

@injectable()
export class ZodUpdateCommentValidator implements IValidatorEntity<UpdateCommentDto> {
  private schema: z.ZodType<UpdateCommentDto> = z.object({
    idPost: z.number(),
    name: z.string().min(1, 'Name cannot be empty'),
    email: z.email(),
    content: z.string().min(1, 'Content cannot be empty'),
  });

  validate(input: unknown): UpdateCommentDto {
    try {
      const result = this.schema.parse(input);
      return UpdateCommentDto.create(result);
    } catch (error) {
      return handleValidationError(error, CommentInvalidDataError);
    }
  }
}

@injectable()
export class ZodPatchCommentValidator implements IValidatorEntity<PatchCommentDto> {
  private schema: z.ZodType<PatchCommentDto> = z
    .object({
      idPost: z.number().optional(),
      name: z.string().min(1, 'Name cannot be empty').optional(),
      email: z.email().optional(),
      content: z.string().min(1, 'Content cannot be empty').optional(),
    })
    .refine((data) => Object.values(data).some((v) => v !== undefined), {
      message: 'At least one field is required',
    });

  validate(input: unknown): PatchCommentDto {
    try {
      const result = this.schema.parse(input);
      return PatchCommentDto.create(result);
    } catch (error) {
      return handleValidationError(error, CommentInvalidDataError);
    }
  }
}
