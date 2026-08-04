import {
  CreatePhotoDto,
  PatchPhotoDto,
  PhotoEntity,
  PhotoInvalidDataError,
  UpdatePhotoDto,
} from '@domain/photo';
import type { IValidator, IValidatorEntity } from '@domain/shared';
import { injectable } from 'tsyringe';
import { z } from 'zod';

const photoEntitySchema = z.object({
  id: z.number().positive(),
  idAlbum: z.number().positive(),
  title: z.string().min(1),
  url: z.string().url(),
  thumbnailUrl: z.string().url(),
});

const createPhotoSchema = z.object({
  idAlbum: z.number().positive('Album ID is required and must be positive'),
  title: z.string().min(1, 'Title cannot be empty'),
  url: z.string().url('URL must be valid'),
  thumbnailUrl: z.string().url('Thumbnail URL must be valid'),
});

const updatePhotoSchema = createPhotoSchema;

const patchPhotoSchema = createPhotoSchema.partial();

@injectable()
export class ZodPhotoEntityValidator implements IValidatorEntity<PhotoEntity> {
  validate(data: unknown): PhotoEntity {
    const result = photoEntitySchema.safeParse(data);
    if (!result.success) {
      throw new PhotoInvalidDataError('Invalid Photo entity structure', result.error.format());
    }
    return result.data;
  }
}

@injectable()
export class ZodCreatePhotoValidator implements IValidator<CreatePhotoDto> {
  validate(input: unknown): CreatePhotoDto {
    const result = createPhotoSchema.safeParse(input);
    if (!result.success) {
      throw new PhotoInvalidDataError('Invalid create photo data', result.error.format());
    }
    return CreatePhotoDto.create(result.data);
  }
}

@injectable()
export class ZodUpdatePhotoValidator implements IValidator<UpdatePhotoDto> {
  validate(input: unknown): UpdatePhotoDto {
    const result = updatePhotoSchema.safeParse(input);
    if (!result.success) {
      throw new PhotoInvalidDataError('Invalid update photo data', result.error.format());
    }
    return UpdatePhotoDto.create(result.data);
  }
}

@injectable()
export class ZodPatchPhotoValidator implements IValidator<PatchPhotoDto> {
  validate(input: unknown): PatchPhotoDto {
    const result = patchPhotoSchema.safeParse(input);
    if (!result.success) {
      throw new PhotoInvalidDataError('Invalid patch photo data', result.error.format());
    }
    return PatchPhotoDto.create(result.data);
  }
}
