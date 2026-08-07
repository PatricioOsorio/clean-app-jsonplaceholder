import { CreateUserDto, UserInvalidDataError } from '@domain/user';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { createUserSchema } from './user-schemas';

@injectable()
export class ZodCreateUserValidator implements IValidatorEntity<CreateUserDto> {
  validate(input: unknown): CreateUserDto {
    try {
      const result = createUserSchema.parse(input);
      return CreateUserDto.create(result);
    } catch (error) {
      return handleValidationError(error, UserInvalidDataError);
    }
  }
}
