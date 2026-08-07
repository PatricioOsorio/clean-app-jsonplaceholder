import { z } from 'zod';

export const todoEntitySchema = z.object({
  id: z.number().positive(),
  idUser: z.number().positive(),
  title: z.string().min(1),
  completed: z.boolean(),
});

export const createTodoSchema = z.object({
  idUser: z.number().positive('User ID is required and must be positive'),
  title: z.string().min(1, 'Title cannot be empty'),
  completed: z.boolean().default(false),
});

export const updateTodoSchema = createTodoSchema;

export const patchTodoSchema = createTodoSchema.partial();
