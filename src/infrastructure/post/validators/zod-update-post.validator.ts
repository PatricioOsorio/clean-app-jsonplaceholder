import { PostInvalidDataError, UpdatePostDto } from '@domain/post';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { updatePostSchema } from './post-schemas';

@injectable()
export class ZodUpdatePostValidator implements IValidatorEntity<UpdatePostDto> {
  validate(input: unknown): UpdatePostDto {
    try {
      const result = updatePostSchema.parse(input);
      return UpdatePostDto.create(result);
    } catch (error) {
      return handleValidationError(error, PostInvalidDataError);
    }
  }
}
