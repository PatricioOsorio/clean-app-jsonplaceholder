import { z } from 'zod';

export const commentEntitySchema = z.object({
  id: z.number().positive(),
  idPost: z.number().positive(),
  name: z.string().min(1, 'Name cannot be empty'),
  email: z.string().email(),
  content: z.string().min(1, 'Content cannot be empty'),
});

export const createCommentSchema = z.object({
  idPost: z.number().positive('Post ID is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email(),
  content: z.string().min(1, 'Content is required'),
});

export const updateCommentSchema = createCommentSchema;

export const patchCommentSchema = z
  .object({
    idPost: z.number().positive().optional(),
    name: z.string().min(1, 'Name cannot be empty').optional(),
    email: z.string().email().optional(),
    content: z.string().min(1, 'Content cannot be empty').optional(),
  })
  .refine((data) => Object.values(data).some((v) => v !== undefined), {
    message: 'At least one field is required',
  });
