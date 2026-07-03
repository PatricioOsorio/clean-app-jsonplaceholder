import { PostEntity } from '@domain/post/post.entity';
import type { IPostResponse } from './post.response';
import type { IGetPostsParams } from '@domain/post';

export abstract class PostMapper {
  static toEntity(response: IPostResponse): PostEntity {
    return new PostEntity(response.id, response.userId, response.title, response.body);
  }

  static toEntities(responses: IPostResponse[]): PostEntity[] {
    return responses.map((response) => this.toEntity(response));
  }

  static toResponse(entity: Partial<PostEntity>): Partial<IPostResponse> {
    const response: Partial<IPostResponse> = {};

    if (entity.id !== undefined) response.id = entity.id;
    if (entity.idUser !== undefined) response.userId = entity.idUser;
    if (entity.title !== undefined) response.title = entity.title;
    if (entity.content !== undefined) response.body = entity.content;

    return response;
  }

  static toQueryParams(params?: IGetPostsParams): URLSearchParams {
    const queryParams = new URLSearchParams();

    if (!params) return queryParams;

    if (params.page !== undefined) queryParams.append('_page', params.page.toString());
    if (params.limit !== undefined) queryParams.append('_limit', params.limit.toString());
    if (params.sort !== undefined) queryParams.append('_sort', params.sort);
    if (params.sortOrder !== undefined) queryParams.append('_order', params.sortOrder);

    return queryParams;
  }
}
