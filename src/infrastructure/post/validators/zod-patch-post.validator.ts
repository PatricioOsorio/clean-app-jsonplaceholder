import { PatchPostDto, PostInvalidDataError } from '@domain/post';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { patchPostSchema } from './post-schemas';

@injectable()
export class ZodPatchPostValidator implements IValidatorEntity<PatchPostDto> {
  validate(input: unknown): PatchPostDto {
    try {
      const result = patchPostSchema.parse(input);
      return PatchPostDto.create(result);
    } catch (error) {
      return handleValidationError(error, PostInvalidDataError);
    }
  }
}
