import { AlbumInvalidDataError, UpdateAlbumDto } from '@domain/album';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { updateAlbumSchema } from './album-schemas';

@injectable()
export class ZodUpdateAlbumValidator implements IValidatorEntity<UpdateAlbumDto> {
  validate(input: unknown): UpdateAlbumDto {
    try {
      const result = updateAlbumSchema.parse(input);
      return UpdateAlbumDto.create(result);
    } catch (error) {
      return handleValidationError(error, AlbumInvalidDataError);
    }
  }
}
