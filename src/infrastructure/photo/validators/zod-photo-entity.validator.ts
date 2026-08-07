import { PhotoEntity, PhotoInvalidDataError } from '@domain/photo';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { photoEntitySchema } from './photo-schemas';

@injectable()
export class ZodPhotoEntityValidator implements IValidatorEntity<PhotoEntity> {
  validate(input: unknown): PhotoEntity {
    try {
      const result = photoEntitySchema.parse(input);
      return new PhotoEntity({
        id: result.id,
        idAlbum: result.idAlbum,
        title: result.title,
        url: result.url,
        thumbnailUrl: result.thumbnailUrl,
      });
    } catch (error) {
      return handleValidationError(error, PhotoInvalidDataError);
    }
  }
}
