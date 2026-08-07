import { z } from 'zod';

export const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
});

export const contactSchema = z.object({
  phone: z.string().optional(),
  website: z.string().optional(),
});

export const companySchema = z.object({
  name: z.string().optional(),
  slogan: z.string().optional(),
});

export const userEntitySchema = z.object({
  id: z.number().positive(),
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name cannot be empty'),
  userName: z.string().min(1, 'Username cannot be empty'),
  address: addressSchema.optional(),
  contact: contactSchema.optional(),
  company: companySchema.optional(),
});

export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required'),
  userName: z.string().min(1, 'Username is required'),
  address: addressSchema.optional(),
  contact: contactSchema.optional(),
  company: companySchema.optional(),
});

export const updateUserSchema = createUserSchema;

export const patchUserSchema = z
  .object({
    email: z.string().email('Invalid email address').optional(),
    name: z.string().min(1, 'Name cannot be empty').optional(),
    userName: z.string().min(1, 'Username cannot be empty').optional(),
    address: addressSchema.optional(),
    contact: contactSchema.optional(),
    company: companySchema.optional(),
  })
  .refine((data) => Object.values(data).some((v) => v !== undefined), {
    message: 'At least one field is required',
  });
