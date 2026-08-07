import { PhotoEntity, type IGetPhotosParams } from '@domain/photo';
import type { IPhotoResponse } from './photo.response';

export abstract class PhotoMapper {
  static toEntity(response: IPhotoResponse): PhotoEntity {
    return new PhotoEntity({
      id: response.id,
      idAlbum: response.albumId,
      title: response.title,
      url: response.url,
      thumbnailUrl: response.thumbnailUrl,
    });
  }

  static toEntities(responses: IPhotoResponse[]): PhotoEntity[] {
    return responses.map((response) => this.toEntity(response));
  }

  static toResponse(entity: Partial<PhotoEntity>): Partial<IPhotoResponse> {
    const response: Partial<IPhotoResponse> = {};

    if (entity.id !== undefined) response.id = entity.id;
    if (entity.idAlbum !== undefined) response.albumId = entity.idAlbum;
    if (entity.title !== undefined) response.title = entity.title;
    if (entity.url !== undefined) response.url = entity.url;
    if (entity.thumbnailUrl !== undefined) response.thumbnailUrl = entity.thumbnailUrl;

    return response;
  }

  static toQueryParams(params?: IGetPhotosParams): URLSearchParams {
    const queryParams = new URLSearchParams();

    if (!params) return queryParams;

    if (params.page !== undefined) queryParams.append('_page', params.page.toString());
    if (params.limit !== undefined) queryParams.append('_limit', params.limit.toString());
    if (params.sort !== undefined) queryParams.append('_sort', params.sort);
    if (params.sortOrder !== undefined) queryParams.append('_order', params.sortOrder);

    return queryParams;
  }
}
