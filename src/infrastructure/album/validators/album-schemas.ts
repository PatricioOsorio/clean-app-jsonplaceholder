import { z } from 'zod';

export const albumEntitySchema = z.object({
  id: z.number().positive(),
  idUser: z.number().positive('User ID is required'),
  title: z.string().min(1, 'Title cannot be empty'),
});

export const createAlbumSchema = z
  .object({
    idUser: z.number().positive('User ID is required'),
    title: z.string().min(1, 'Title cannot be empty'),
  })
  .refine((data) => Object.values(data).some((v) => v !== undefined), {
    message: 'At least one field is required',
  });

export const updateAlbumSchema = createAlbumSchema;

export const patchAlbumSchema = z
  .object({
    idUser: z.number().positive().optional(),
    title: z.string().min(1, 'Title cannot be empty').optional(),
  })
  .refine((data) => Object.values(data).some((v) => v !== undefined), {
    message: 'At least one field is required',
  });
