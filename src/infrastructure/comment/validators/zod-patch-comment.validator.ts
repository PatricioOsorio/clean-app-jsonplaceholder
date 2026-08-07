import { CommentInvalidDataError, PatchCommentDto } from '@domain/comment';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { patchCommentSchema } from './comment-schemas';

@injectable()
export class ZodPatchCommentValidator implements IValidatorEntity<PatchCommentDto> {
  validate(input: unknown): PatchCommentDto {
    try {
      const result = patchCommentSchema.parse(input);
      return PatchCommentDto.create(result);
    } catch (error) {
      return handleValidationError(error, CommentInvalidDataError);
    }
  }
}
