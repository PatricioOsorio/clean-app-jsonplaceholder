import { z } from 'zod';

export const photoEntitySchema = z.object({
  id: z.number().positive(),
  idAlbum: z.number().positive(),
  title: z.string().min(1),
  url: z.string().url(),
  thumbnailUrl: z.string().url(),
});

export const createPhotoSchema = z.object({
  idAlbum: z.number().positive('Album ID is required and must be positive'),
  title: z.string().min(1, 'Title cannot be empty'),
  url: z.string().url('URL must be valid'),
  thumbnailUrl: z.string().url('Thumbnail URL must be valid'),
});

export const updatePhotoSchema = createPhotoSchema;

export const patchPhotoSchema = createPhotoSchema.partial();
