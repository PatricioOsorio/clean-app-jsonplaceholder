import { PostEntity } from '@domain/post/post.entity';
import type { IPostResponse } from './post.response';

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
}
