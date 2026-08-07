import z from 'zod';
import { injectable } from 'tsyringe';

import { AuthInvalidDataError, AuthEntity, LoginDto } from '@domain/auth';
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

@injectable()
export class ZodAuthEntityValidator implements IValidatorEntity<AuthEntity> {
  private schema = z.object({
    id: z.number(),
    userName: z.string().min(1, 'Username cannot be empty'),
    email: z.email('Invalid email address'),
    roles: z.array(z.enum(['admin', 'user', 'guest'])),
    permissions: z.array(
      z.enum([
        'posts:read',
        'posts:create',
        'posts:update',
        'posts:delete',
        'comments:read',
        'comments:create',
        'comments:update',
        'comments:delete',
        'users:manage',
      ]),
    ),
    createdAt: z.coerce.date(),
  });

  validate(input: unknown): AuthEntity {
    try {
      const result = this.schema.parse(input);
      return new AuthEntity({
        id: result.id,
        userName: result.userName,
        email: result.email,
        roles: result.roles,
        permissions: result.permissions,
        createdAt: result.createdAt,
      });
    } catch (error) {
      return handleValidationError(error, AuthInvalidDataError);
    }
  }
}
