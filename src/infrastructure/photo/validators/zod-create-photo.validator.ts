import { CreatePhotoDto, PhotoInvalidDataError } from '@domain/photo';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { createPhotoSchema } from './photo-schemas';

@injectable()
export class ZodCreatePhotoValidator implements IValidatorEntity<CreatePhotoDto> {
  validate(input: unknown): CreatePhotoDto {
    try {
      const result = createPhotoSchema.parse(input);
      return CreatePhotoDto.create(result);
    } catch (error) {
      return handleValidationError(error, PhotoInvalidDataError);
    }
  }
}
