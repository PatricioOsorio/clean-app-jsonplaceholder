import { AlbumInvalidDataError, PatchAlbumDto } from '@domain/album';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { patchAlbumSchema } from './album-schemas';

@injectable()
export class ZodPatchAlbumValidator implements IValidatorEntity<PatchAlbumDto> {
  validate(input: unknown): PatchAlbumDto {
    try {
      const result = patchAlbumSchema.parse(input);
      return PatchAlbumDto.create(result);
    } catch (error) {
      return handleValidationError(error, AlbumInvalidDataError);
    }
  }
}
