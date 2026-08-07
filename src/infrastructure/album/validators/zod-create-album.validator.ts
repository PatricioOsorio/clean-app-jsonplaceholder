import { AlbumInvalidDataError, CreateAlbumDto } from '@domain/album';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { createAlbumSchema } from './album-schemas';

@injectable()
export class ZodCreateAlbumValidator implements IValidatorEntity<CreateAlbumDto> {
  validate(input: unknown): CreateAlbumDto {
    try {
      const result = createAlbumSchema.parse(input);
      return CreateAlbumDto.create(result);
    } catch (error) {
      return handleValidationError(error, AlbumInvalidDataError);
    }
  }
}
