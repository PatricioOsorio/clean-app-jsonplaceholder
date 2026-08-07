import { CommentInvalidDataError, CreateCommentDto } from '@domain/comment';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { createCommentSchema } from './comment-schemas';

@injectable()
export class ZodCreateCommentValidator implements IValidatorEntity<CreateCommentDto> {
  validate(input: unknown): CreateCommentDto {
    try {
      const result = createCommentSchema.parse(input);
      return CreateCommentDto.create(result);
    } catch (error) {
      return handleValidationError(error, CommentInvalidDataError);
    }
  }
}
