import { UpdateUserDto, UserInvalidDataError } from '@domain/user';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { updateUserSchema } from './user-schemas';

@injectable()
export class ZodUpdateUserValidator implements IValidatorEntity<UpdateUserDto> {
  validate(input: unknown): UpdateUserDto {
    try {
      const result = updateUserSchema.parse(input);
      return UpdateUserDto.create(result);
    } catch (error) {
      return handleValidationError(error, UserInvalidDataError);
    }
  }
}
