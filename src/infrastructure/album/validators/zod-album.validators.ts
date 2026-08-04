import { injectable } from 'tsyringe';
import z from 'zod';

import { AlbumInvalidDataError } from '@domain/album/errors/album-invalid-data.error';
import { CreateAlbumDto, PatchAlbumDto, UpdateAlbumDto } from '@domain/album/dtos';
import { handleValidationError } from '@infrastructure/utils/validation-error';
import type { IValidatorEntity } from '@domain/shared';

@injectable()
export class ZodCreateAlbumValidator implements IValidatorEntity<CreateAlbumDto> {
  private schema: z.ZodType<CreateAlbumDto> = z
    .object({
      idUser: z.number(),
      title: z.string().min(1, 'Title cannot be empty'),
    })
    .refine((data) => Object.values(data).some((v) => v !== undefined), {
      message: 'At least one field is required',
    });

  validate(input: unknown): CreateAlbumDto {
    try {
      const result = this.schema.parse(input);
      return CreateAlbumDto.create(result);
    } catch (error) {
      return handleValidationError(error, AlbumInvalidDataError);
    }
  }
}

@injectable()
export class ZodUpdateAlbumValidator implements IValidatorEntity<UpdateAlbumDto> {
  private schema: z.ZodType<UpdateAlbumDto> = z
    .object({
      idUser: z.number(),
      title: z.string().min(1, 'Title cannot be empty'),
    })
    .refine((data) => Object.values(data).some((v) => v !== undefined), {
      message: 'At least one field is required',
    });

  validate(input: unknown): UpdateAlbumDto {
    try {
      const result = this.schema.parse(input);
      return UpdateAlbumDto.create(result);
    } catch (error) {
      return handleValidationError(error, AlbumInvalidDataError);
    }
  }
}

@injectable()
export class ZodPatchAlbumValidator implements IValidatorEntity<PatchAlbumDto> {
  private schema: z.ZodType<PatchAlbumDto> = z
    .object({
      idUser: z.number().optional(),
      title: z.string().min(1, 'Title cannot be empty').optional(),
    })
    .refine((data) => Object.values(data).some((v) => v !== undefined), {
      message: 'At least one field is required',
    });

  validate(input: unknown): PatchAlbumDto {
    try {
      const result = this.schema.parse(input);
      return PatchAlbumDto.create(result);
    } catch (error) {
      return handleValidationError(error, AlbumInvalidDataError);
    }
  }
}

@injectable()
export class ZodEntityAlbumValidator implements IValidatorEntity<UpdateAlbumDto> {
  private schema: z.ZodType<UpdateAlbumDto> = z.object({
    idUser: z.number(),
    title: z.string().min(1, 'Title cannot be empty'),
  });

  validate(input: unknown): UpdateAlbumDto {
    try {
      const result = this.schema.parse(input);
      return UpdateAlbumDto.create(result);
    } catch (error) {
      return handleValidationError(error, AlbumInvalidDataError);
    }
  }
}
