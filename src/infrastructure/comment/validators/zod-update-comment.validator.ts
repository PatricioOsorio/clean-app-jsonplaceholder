import { CommentInvalidDataError, UpdateCommentDto } from '@domain/comment';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { updateCommentSchema } from './comment-schemas';

@injectable()
export class ZodUpdateCommentValidator implements IValidatorEntity<UpdateCommentDto> {
  validate(input: unknown): UpdateCommentDto {
    try {
      const result = updateCommentSchema.parse(input);
      return UpdateCommentDto.create(result);
    } catch (error) {
      return handleValidationError(error, CommentInvalidDataError);
    }
  }
}
