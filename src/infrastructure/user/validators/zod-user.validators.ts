import type { IValidatorEntity } from '@domain/shared';
import { UserInvalidDataError, CreateUserDto, UpdateUserDto, PatchUserDto } from '@domain/user';
import { handleValidationError } from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import z from 'zod';

const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
});

const contactSchema = z.object({
  phone: z.string().optional(),
  website: z.string().optional(),
});

const companySchema = z.object({
  name: z.string().optional(),
  slogan: z.string().optional(),
});

@injectable()
export class ZodCreateUserValidator implements IValidatorEntity<CreateUserDto> {
  private schema: z.ZodType<CreateUserDto> = z.object({
    email: z.email('Invalid email address'),
    name: z.string().min(1, 'Name is required'),
    userName: z.string().min(1, 'Username is required'),
    address: z.object(addressSchema.shape).optional(),
    contact: z.object(contactSchema.shape).optional(),
    company: z.object(companySchema.shape).optional(),
  });

  validate(input: unknown): CreateUserDto {
    try {
      const result = this.schema.parse(input);
      return CreateUserDto.create(result);
    } catch (error) {
      return handleValidationError(error, UserInvalidDataError);
    }
  }
}

@injectable()
export class ZodUpdateUserValidator implements IValidatorEntity<UpdateUserDto> {
  private schema: z.ZodType<UpdateUserDto> = z.object({
    email: z.email('Invalid email address'),
    name: z.string().min(1, 'Name cannot be empty'),
    userName: z.string().min(1, 'Username cannot be empty'),
    address: z.object(addressSchema.shape).optional(),
    contact: z.object(contactSchema.shape).optional(),
    company: z.object(companySchema.shape).optional(),
  });

  validate(input: unknown): UpdateUserDto {
    try {
      const result = this.schema.parse(input);
      return UpdateUserDto.create(result);
    } catch (error) {
      return handleValidationError(error, UserInvalidDataError);
    }
  }
}

@injectable()
export class ZodPatchUserValidator implements IValidatorEntity<PatchUserDto> {
  private schema: z.ZodType<PatchUserDto> = z
    .object({
      email: z.email('Invalid email address').optional(),
      name: z.string().min(1, 'Name cannot be empty').optional(),
      userName: z.string().min(1, 'Username cannot be empty').optional(),
      address: z.object(addressSchema.shape).optional(),
      contact: z.object(contactSchema.shape).optional(),
      company: z.object(companySchema.shape).optional(),
    })
    .refine((data) => Object.values(data).some((v) => v !== undefined), {
      message: 'At least one field is required',
    });

  validate(input: unknown): PatchUserDto {
    try {
      const result = this.schema.parse(input);
      return PatchUserDto.create(result);
    } catch (error) {
      return handleValidationError(error, UserInvalidDataError);
    }
  }
}
