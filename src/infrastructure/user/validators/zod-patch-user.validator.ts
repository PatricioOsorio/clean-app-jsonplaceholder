import { PatchUserDto, UserInvalidDataError } from '@domain/user';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { patchUserSchema } from './user-schemas';

@injectable()
export class ZodPatchUserValidator implements IValidatorEntity<PatchUserDto> {
  validate(input: unknown): PatchUserDto {
    try {
      const result = patchUserSchema.parse(input);
      return PatchUserDto.create(result);
    } catch (error) {
      return handleValidationError(error, UserInvalidDataError);
    }
  }
}
