import { UserEntity, UserInvalidDataError } from '@domain/user';
import type { IValidatorEntity } from '@domain/shared';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import { userEntitySchema } from './user-schemas';

@injectable()
export class ZodUserEntityValidator implements IValidatorEntity<UserEntity> {
  validate(input: unknown): UserEntity {
    try {
      const result = userEntitySchema.parse(input);
      return new UserEntity({
        id: result.id,
        email: result.email,
        name: result.name,
        userName: result.userName,
        address: result.address,
        contact: result.contact,
        company: result.company,
      });
    } catch (error) {
      return handleValidationError(error, UserInvalidDataError);
    }
  }
}
