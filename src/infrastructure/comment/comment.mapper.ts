import { CommentEntity, type IGetCommentsParams } from '@domain/comment';
import type { ICommentResponse } from '@infrastructure/comment/comment.response';

export abstract class CommentMapper {
  static toEntity(response: ICommentResponse): CommentEntity {
    return new CommentEntity(
      response.id,
      response.postId,
      response.name,
      response.email,
      response.body,
    );
  }

  static toEntities(responses: ICommentResponse[]): CommentEntity[] {
    return responses.map((response) => this.toEntity(response));
  }

  static toResponse(entity: Partial<CommentEntity>): Partial<CommentEntity> {
    const response: Partial<CommentEntity> = {};

    if (entity.id !== undefined) response.id = entity.id;
    if (entity.idPost !== undefined) response.idPost = entity.idPost;
    if (entity.name !== undefined) response.name = entity.name;
    if (entity.email !== undefined) response.email = entity.email;
    if (entity.content !== undefined) response.content = entity.content;

    return response;
  }

  static toQueryParams(params?: IGetCommentsParams): URLSearchParams {
    const queryParams = new URLSearchParams();

    if (!params) return queryParams;

    if (params.page !== undefined) queryParams.append('_page', params.page.toString());
    if (params.limit !== undefined) queryParams.append('_limit', params.limit.toString());
    if (params.sort !== undefined) queryParams.append('_sort', params.sort);
    if (params.sortOrder !== undefined) queryParams.append('_order', params.sortOrder);

    return queryParams;
  }
}
