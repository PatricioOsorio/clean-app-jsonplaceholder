import z from 'zod';
import { injectable } from 'tsyringe';

import { AuthInvalidDataError, LoginDto } from '@domain/auth';
import { handleValidationError } from '@infrastructure/utils';
import type { IValidatorEntity } from '@domain/shared';

@injectable()
export class ZodLoginValidator implements IValidatorEntity<LoginDto> {
  private schema: z.ZodType<LoginDto> = z.object({
    mail: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
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
