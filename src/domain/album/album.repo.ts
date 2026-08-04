import type { AlbumEntity, IGetAlbumsParams } from '@domain/album';
import type { CreateAlbumDto, PatchAlbumDto } from '@domain/album/dtos';
import type { IPaginatedResult } from '@domain/shared';

export abstract class AlbumRepository {
  static readonly TOKEN = Symbol('AlbumRepository');

  abstract getAll(params?: IGetAlbumsParams): Promise<IPaginatedResult<AlbumEntity>>;
  abstract getById(id: number): Promise<AlbumEntity>;
  abstract create(album: CreateAlbumDto): Promise<AlbumEntity>;
  abstract update(id: number, album: CreateAlbumDto): Promise<AlbumEntity>;
  abstract patch(id: number, fields: PatchAlbumDto): Promise<AlbumEntity>;
  abstract delete(id: number): Promise<boolean>;
}
