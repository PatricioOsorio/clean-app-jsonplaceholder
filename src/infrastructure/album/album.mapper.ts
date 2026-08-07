import { AlbumEntity, type IGetAlbumsParams } from '@domain/album';
import type { IAlbumResponse } from '@infrastructure/album/album.response';

export abstract class AlbumMapper {
  static toEntity(response: IAlbumResponse): AlbumEntity {
    return new AlbumEntity({
      id: response.id,
      idUser: response.userId,
      title: response.title,
    });
  }

  static toEntities(responses: IAlbumResponse[]): AlbumEntity[] {
    return responses.map((response) => this.toEntity(response));
  }

  static toResponse(entity: Partial<AlbumEntity>): Partial<IAlbumResponse> {
    const response: Partial<IAlbumResponse> = {};

    if (entity.id !== undefined) response.id = entity.id;
    if (entity.idUser !== undefined) response.userId = entity.idUser;
    if (entity.title !== undefined) response.title = entity.title;

    return response;
  }

  static toQueryParams(params?: IGetAlbumsParams): URLSearchParams {
    const queryParams = new URLSearchParams();

    if (!params) return queryParams;

    if (params.page !== undefined) queryParams.append('_page', params.page.toString());
    if (params.limit !== undefined) queryParams.append('_limit', params.limit.toString());
    if (params.sort !== undefined) queryParams.append('_sort', params.sort);
    if (params.sortOrder !== undefined) queryParams.append('_order', params.sortOrder);

    return queryParams;
  }
}
