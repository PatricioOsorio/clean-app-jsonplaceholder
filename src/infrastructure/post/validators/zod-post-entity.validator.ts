import { PostEntity, PostInvalidDataError } from '@domain/post';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { postEntitySchema } from './post-schemas';

@injectable()
export class ZodPostEntityValidator implements IValidatorEntity<PostEntity> {
  validate(input: unknown): PostEntity {
    try {
      const result = postEntitySchema.parse(input);
      return new PostEntity({
        id: result.id,
        idUser: result.idUser,
        title: result.title,
        content: result.content,
      });
    } catch (error) {
      return handleValidationError(error, PostInvalidDataError);
    }
  }
}
