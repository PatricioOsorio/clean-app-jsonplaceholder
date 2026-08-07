import { PatchPhotoDto, PhotoInvalidDataError } from '@domain/photo';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { patchPhotoSchema } from './photo-schemas';

@injectable()
export class ZodPatchPhotoValidator implements IValidatorEntity<PatchPhotoDto> {
  validate(input: unknown): PatchPhotoDto {
    try {
      const result = patchPhotoSchema.parse(input);
      return PatchPhotoDto.create(result);
    } catch (error) {
      return handleValidationError(error, PhotoInvalidDataError);
    }
  }
}
