import { CreatePostDto, PostInvalidDataError } from '@domain/post';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { createPostSchema } from './post-schemas';

@injectable()
export class ZodCreatePostValidator implements IValidatorEntity<CreatePostDto> {
  validate(input: unknown): CreatePostDto {
    try {
      const result = createPostSchema.parse(input);
      return CreatePostDto.create(result);
    } catch (error) {
      return handleValidationError(error, PostInvalidDataError);
    }
  }
}
