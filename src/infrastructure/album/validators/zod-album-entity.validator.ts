import { AlbumEntity, AlbumInvalidDataError } from '@domain/album';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { albumEntitySchema } from './album-schemas';

@injectable()
export class ZodAlbumEntityValidator implements IValidatorEntity<AlbumEntity> {
  validate(input: unknown): AlbumEntity {
    try {
      const result = albumEntitySchema.parse(input);
      return new AlbumEntity({
        id: result.id,
        idUser: result.idUser,
        title: result.title,
      });
    } catch (error) {
      return handleValidationError(error, AlbumInvalidDataError);
    }
  }
}

export { ZodAlbumEntityValidator as ZodEntityAlbumValidator };
