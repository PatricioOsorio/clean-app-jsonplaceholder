import type { CreatePhotoDto, IGetPhotosParams, PatchPhotoDto, PhotoEntity } from '@domain/photo';
import type { IPhotoResponse } from './photo.response';

export class PhotoMapper {
  static toEntity(response: IPhotoResponse): PhotoEntity {
    return {
      id: response.id,
      idAlbum: response.albumId,
      title: response.title,
      url: response.url,
      thumbnailUrl: response.thumbnailUrl,
    };
  }

  static toEntities(responses: IPhotoResponse[]): PhotoEntity[] {
    return responses.map((response) => this.toEntity(response));
  }

  static toResponse(photo: CreatePhotoDto | PatchPhotoDto): Partial<IPhotoResponse> {
    const response: Partial<IPhotoResponse> = {};

    if (photo.idAlbum !== undefined) response.albumId = photo.idAlbum;
    if (photo.title !== undefined) response.title = photo.title;
    if (photo.url !== undefined) response.url = photo.url;
    if (photo.thumbnailUrl !== undefined) response.thumbnailUrl = photo.thumbnailUrl;

    return response;
  }

  static toQueryParams(params?: IGetPhotosParams): Record<string, unknown> | undefined {
    if (!params) return undefined;

    const { filter, pagination } = params;
    const queryParams: Record<string, unknown> = {};

    if (filter?.idAlbum !== undefined) {
      queryParams.albumId = filter.idAlbum;
    }

    if (pagination) {
      queryParams._page = pagination.page;
      queryParams._limit = pagination.limit;
    }

    return queryParams;
  }
}
