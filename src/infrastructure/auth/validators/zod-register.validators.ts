import z from 'zod';
import { injectable } from 'tsyringe';

import { AuthInvalidDataError, RegisterDto } from '@domain/auth';
import { handleValidationError } from '@infrastructure/utils';
import type { IValidatorEntity } from '@domain/shared';

@injectable()
export class ZodRegisterValidator implements IValidatorEntity<RegisterDto> {
  private schema: z.ZodType<RegisterDto> = z.object({
    userName: z.string().min(1, 'Username is required'),
    email: z.email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  });

  validate(input: unknown): RegisterDto {
    try {
      const result = this.schema.parse(input);
      return RegisterDto.create(result);
    } catch (error) {
      return handleValidationError(error, AuthInvalidDataError);
    }
  }
}
