import { PostEntity } from '@domain/post/post.entity';
import type { IPostEntity } from '@domain/post/post.entity';
import type { IPostResponse } from './post.reponse';

export abstract class PostMapper {
  static toEntity(response: IPostResponse): IPostEntity {
    return new PostEntity(response.id, response.userId, response.title, response.body);
  }

  static toEntities(responses: IPostResponse[]): IPostEntity[] {
    return responses.map((response) => this.toEntity(response));
  }

  static toResponse(entity: Partial<IPostEntity>): Partial<IPostResponse> {
    const response: Partial<IPostResponse> = {};

    if (entity.id !== undefined) response.id = entity.id;
    if (entity.idUser !== undefined) response.userId = entity.idUser;
    if (entity.title !== undefined) response.title = entity.title;
    if (entity.content !== undefined) response.body = entity.content;

    return response;
  }
}
