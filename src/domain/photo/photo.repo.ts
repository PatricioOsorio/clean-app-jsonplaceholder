import type { PhotoEntity, IGetPhotosParams } from '@domain/photo';
import type { CreatePhotoDto, PatchPhotoDto, UpdatePhotoDto } from '@domain/photo/dtos';
import type { IPaginatedResult } from '@domain/shared';

export abstract class PhotoRepository {
  static readonly TOKEN = Symbol('PhotoRepository');

  abstract getAll(params?: IGetPhotosParams): Promise<IPaginatedResult<PhotoEntity>>;
  abstract getById(id: number): Promise<PhotoEntity>;
  abstract create(photo: CreatePhotoDto): Promise<PhotoEntity>;
  abstract update(id: number, photo: UpdatePhotoDto): Promise<PhotoEntity>;
  abstract patch(id: number, fields: PatchPhotoDto): Promise<PhotoEntity>;
  abstract delete(id: number): Promise<boolean>;
}
