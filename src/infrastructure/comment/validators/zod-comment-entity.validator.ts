import { CommentEntity, CommentInvalidDataError } from '@domain/comment';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { commentEntitySchema } from './comment-schemas';

@injectable()
export class ZodCommentEntityValidator implements IValidatorEntity<CommentEntity> {
  validate(input: unknown): CommentEntity {
    try {
      const result = commentEntitySchema.parse(input);
      return new CommentEntity({
        id: result.id,
        idPost: result.idPost,
        name: result.name,
        email: result.email,
        content: result.content,
      });
    } catch (error) {
      return handleValidationError(error, CommentInvalidDataError);
    }
  }
}
