import z from 'zod';
import { injectable } from 'tsyringe';

import { AuthInvalidDataError, LoginDto } from '@domain/auth';
import { handleValidationError } from '@infrastructure/utils';
import type { IValidatorEntity } from '@domain/shared';

@injectable()
export class ZodLoginValidator implements IValidatorEntity<LoginDto> {
  private schema: z.ZodType<LoginDto> = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  });

  validate(input: unknown): LoginDto {
    try {
      const result = this.schema.parse(input);
      return LoginDto.create(result);
    } catch (error) {
      return handleValidationError(error, AuthInvalidDataError);
    }
  }
}
