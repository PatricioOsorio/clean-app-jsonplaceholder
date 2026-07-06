import { injectable } from 'tsyringe';
import { z } from 'zod';

import type { IValidatorEntity } from '@domain/shared/validator.entity';
import { CreatePostDto, UpdatePostDto, PatchPostDto, PostInvalidDataError } from '@domain/post';
import { handleValidationError } from '@infrastructure/utils';

@injectable()
export class ZodCreatePostValidator implements IValidatorEntity<CreatePostDto> {
  private schema: z.ZodType<CreatePostDto> = z.object({
    idUser: z.number(),
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
  });

  validate(input: unknown): CreatePostDto {
    try {
      const result = this.schema.parse(input);
      return CreatePostDto.create(result);
    } catch (error) {
      return handleValidationError(error, PostInvalidDataError);
    }
  }
}

@injectable()
export class ZodUpdatePostValidator implements IValidatorEntity<UpdatePostDto> {
  private schema: z.ZodType<UpdatePostDto> = z.object({
    idUser: z.number(),
    title: z.string().min(1, 'Title cannot be empty'),
    content: z.string().min(1, 'Content cannot be empty'),
  });

  validate(input: unknown): UpdatePostDto {
    try {
      const result = this.schema.parse(input);
      return UpdatePostDto.create(result);
    } catch (error) {
      return handleValidationError(error, PostInvalidDataError);
    }
  }
}

@injectable()
export class ZodPatchPostValidator implements IValidatorEntity<PatchPostDto> {
  private schema: z.ZodType<PatchPostDto> = z
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
      return handleValidationError(error, PostInvalidDataError);
    }
  }
}
