import { PhotoInvalidDataError, UpdatePhotoDto } from '@domain/photo';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { updatePhotoSchema } from './photo-schemas';

@injectable()
export class ZodUpdatePhotoValidator implements IValidatorEntity<UpdatePhotoDto> {
  validate(input: unknown): UpdatePhotoDto {
    try {
      const result = updatePhotoSchema.parse(input);
      return UpdatePhotoDto.create(result);
    } catch (error) {
      return handleValidationError(error, PhotoInvalidDataError);
    }
  }
}
