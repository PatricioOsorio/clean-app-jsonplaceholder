import { z } from 'zod';

export const postEntitySchema = z.object({
  id: z.number().positive(),
  idUser: z.number().positive(),
  title: z.string().min(1, 'Title cannot be empty'),
  content: z.string().min(1, 'Content cannot be empty'),
});

export const createPostSchema = z.object({
  idUser: z.number().positive('User ID is required'),
  title: z.string().min(1, 'Title cannot be empty'),
  content: z.string().min(1, 'Content cannot be empty'),
});

export const updatePostSchema = createPostSchema;

export const patchPostSchema = z
  .object({
    idUser: z.number().positive().optional(),
    title: z.string().min(1, 'Title cannot be empty').optional(),
    content: z.string().min(1, 'Content cannot be empty').optional(),
  })
  .refine((data) => Object.values(data).some((v) => v !== undefined), {
    message: 'At least one field is required',
  });
