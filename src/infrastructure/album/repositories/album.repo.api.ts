import {
  AlbumEntity,
  AlbumNotFoundError,
  CreateAlbumDto,
  PatchAlbumDto,
  type AlbumRepository,
  type IGetAlbumsParams,
} from '@domain/album';
import { HttpRepository } from '@domain/http';
import type { IPaginatedResult, IValidatorEntity } from '@domain/shared';
import { AlbumMapper } from '@infrastructure/album/album.mapper';
import type { IAlbumResponse } from '@infrastructure/album/album.response';
import { createApiErrorHandler, toPaginatedResult } from '@infrastructure/http';
import { inject, injectable } from 'tsyringe';

const albumErrorHandler = createApiErrorHandler((error, albumId) => {
  if (error.gatewayCode === 'NOT_FOUND' && albumId !== undefined) {
    return new AlbumNotFoundError(Number(albumId));
  }
});

@injectable()
export class AlbumRepositoryApi implements AlbumRepository {
  constructor(
    @inject(HttpRepository.TOKEN) private readonly httpClient: HttpRepository,
    @inject(AlbumEntity.TOKEN)
    private readonly validator: IValidatorEntity<AlbumEntity>,
  ) {}

  private handleError(error: unknown, albumId?: number): never {
    return albumErrorHandler(error, albumId);
  }

  async getAll(params?: IGetAlbumsParams): Promise<IPaginatedResult<AlbumEntity>> {
    try {
      const queryParams = AlbumMapper.toQueryParams(params);

      const response = await this.httpClient.get<IAlbumResponse[]>('/albums', {
        params: queryParams,
      });

      return toPaginatedResult<IAlbumResponse, AlbumEntity>(response, (responses) =>
        AlbumMapper.toEntities(responses).map((album) => this.validator.validate(album)),
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getById(id: number): Promise<AlbumEntity> {
    try {
      const response = await this.httpClient.get<IAlbumResponse>(`/albums/${id}`);
      return this.validator.validate(AlbumMapper.toEntity(response.data));
    } catch (error) {
      return this.handleError(error, id);
    }
  }

  async create(album: CreateAlbumDto): Promise<AlbumEntity> {
    try {
      const response = await this.httpClient.post<IAlbumResponse>(
        '/albums',
        AlbumMapper.toResponse(album),
      );

      return this.validator.validate(AlbumMapper.toEntity(response.data));
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: number, album: CreateAlbumDto): Promise<AlbumEntity> {
    try {
      const response = await this.httpClient.put<IAlbumResponse>(
        `/albums/${id}`,
        AlbumMapper.toResponse(album),
      );

      return this.validator.validate(AlbumMapper.toEntity(response.data));
    } catch (error) {
      this.handleError(error, id);
    }
  }

  async patch(id: number, fields: PatchAlbumDto): Promise<AlbumEntity> {
    try {
      const response = await this.httpClient.patch<IAlbumResponse>(
        `/albums/${id}`,
        AlbumMapper.toResponse(fields),
      );

      return this.validator.validate(AlbumMapper.toEntity(response.data));
    } catch (error) {
      this.handleError(error, id);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.httpClient.delete(`/albums/${id}`);

      return true;
    } catch (error) {
      this.handleError(error, id);
    }
  }
}
