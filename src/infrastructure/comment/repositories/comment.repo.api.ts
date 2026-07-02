import { inject, injectable } from 'tsyringe';

import { CommentMapper } from '@infrastructure/comment/comment.mapper';
import { HttpRepository } from '@domain/http';
import { createApiErrorHandler } from '@infrastructure/http';
import type { CommentEntity, CommentRepository } from '@domain/comment';
import type { ICommentResponse } from '@infrastructure/comment/comment.response';
import { CommentNotFoundError } from '@domain/comment/errors/comment-not-found.error';

const commentErrorHandler = createApiErrorHandler((error, commentId) => {
  if (error.gatewayCode === 'NOT_FOUND' && commentId !== undefined) {
    return new CommentNotFoundError(commentId);
  }
});

@injectable()
export class CommentRepositoryApi implements CommentRepository {
  constructor(@inject(HttpRepository.TOKEN) private readonly httpClient: HttpRepository) {}

  private handleError(error: unknown, commentId?: number): never {
    return commentErrorHandler(error, commentId);
  }

  async getByPostId(id: number): Promise<CommentEntity[]> {
    try {
      const response = await this.httpClient.get<ICommentResponse[]>(`/comments?postId=${id}`);
      return CommentMapper.toEntities(response);
    } catch (error) {
      this.handleError(error, id);
    }
  }
}
