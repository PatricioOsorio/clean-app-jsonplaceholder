import { CommentEntity } from '@domain/comment';
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
}
