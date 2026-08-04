import {
  CreatePhotoDto,
  PatchPhotoDto,
  PhotoEntity,
  PhotoNotFoundError,
  UpdatePhotoDto,
  type IGetPhotosParams,
  type PhotoRepository,
} from '@domain/photo';
import { HttpRepository } from '@domain/http';
import type { IPaginatedResult, IValidatorEntity } from '@domain/shared';
import { PhotoMapper } from '@infrastructure/photo/photo.mapper';
import type { IPhotoResponse } from '@infrastructure/photo/photo.response';
import { createApiErrorHandler, toPaginatedResult } from '@infrastructure/http';
import { inject, injectable } from 'tsyringe';

const photoErrorHandler = createApiErrorHandler((error, photoId) => {
  if (error.gatewayCode === 'NOT_FOUND' && photoId !== undefined) {
    return new PhotoNotFoundError(Number(photoId));
  }
});

@injectable()
export class PhotoRepositoryApi implements PhotoRepository {
  constructor(
    @inject(HttpRepository.TOKEN) private readonly httpClient: HttpRepository,
    @inject(PhotoEntity.VALIDATOR_TOKEN)
    private readonly validator: IValidatorEntity<PhotoEntity>,
  ) {}

  private handleError(error: unknown, photoId?: number): never {
    return photoErrorHandler(error, photoId);
  }

  async getAll(params?: IGetPhotosParams): Promise<IPaginatedResult<PhotoEntity>> {
    try {
      const queryParams = PhotoMapper.toQueryParams(params);

      const response = await this.httpClient.get<IPhotoResponse[]>('/photos', {
        params: queryParams,
      });

      return toPaginatedResult<IPhotoResponse, PhotoEntity>(response, (responses) =>
        PhotoMapper.toEntities(responses).map((photo) => this.validator.validate(photo)),
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getById(id: number): Promise<PhotoEntity> {
    try {
      const response = await this.httpClient.get<IPhotoResponse>(`/photos/${id}`);
      return this.validator.validate(PhotoMapper.toEntity(response.data));
    } catch (error) {
      return this.handleError(error, id);
    }
  }

  async create(photo: CreatePhotoDto): Promise<PhotoEntity> {
    try {
      const response = await this.httpClient.post<IPhotoResponse>(
        '/photos',
        PhotoMapper.toResponse(photo),
      );

      return this.validator.validate(PhotoMapper.toEntity(response.data));
    } catch (error) {
      return this.handleError(error);
    }
  }

  async update(id: number, photo: UpdatePhotoDto): Promise<PhotoEntity> {
    try {
      const response = await this.httpClient.put<IPhotoResponse>(
        `/photos/${id}`,
        PhotoMapper.toResponse(photo),
      );

      return this.validator.validate(PhotoMapper.toEntity(response.data));
    } catch (error) {
      return this.handleError(error, id);
    }
  }

  async patch(id: number, fields: PatchPhotoDto): Promise<PhotoEntity> {
    try {
      const response = await this.httpClient.patch<IPhotoResponse>(
        `/photos/${id}`,
        PhotoMapper.toResponse(fields),
      );

      return this.validator.validate(PhotoMapper.toEntity(response.data));
    } catch (error) {
      return this.handleError(error, id);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.httpClient.delete(`/photos/${id}`);
      return true;
    } catch (error) {
      return this.handleError(error, id);
    }
  }
}
