import { inject, injectable } from 'tsyringe';

import { CommentMapper } from '@infrastructure/comment/comment.mapper';
import { HttpRepository, type IHttpResponse } from '@domain/http';
import { createApiErrorHandler } from '@infrastructure/http';
import type {
  CommentEntity,
  CommentRepository,
  CreateCommentDto,
  IGetCommentsParams,
  PatchCommentDto,
  UpdateCommentDto,
} from '@domain/comment';
import type { ICommentResponse } from '@infrastructure/comment/comment.response';
import { CommentNotFoundError } from '@domain/comment/errors/comment-not-found.error';
import type { IPaginatedResult } from '@domain/shared';

const commentErrorHandler = createApiErrorHandler((error, commentId) => {
  if (error.gatewayCode === 'NOT_FOUND' && commentId !== undefined) {
    return new CommentNotFoundError(Number(commentId));
  }
});

@injectable()
export class CommentRepositoryApi implements CommentRepository {
  constructor(@inject(HttpRepository.TOKEN) private readonly httpClient: HttpRepository) {}

  private handleError(error: unknown, commentId?: number): never {
    return commentErrorHandler(error, commentId);
  }

  private toPaginatedResult<TResponse, TEntity>(
    response: IHttpResponse<TResponse[]>,
    mapper: (response: TResponse[]) => TEntity[],
  ): IPaginatedResult<TEntity> {
    const headerCount = response.headers?.['x-total-count'];
    const dataCount = Array.isArray(response.data) ? response.data.length : 0;

    const total = Number(headerCount ?? dataCount ?? 0);
    const entities = mapper(response.data);

    return {
      data: entities,
      total,
    };
  }

  async getAll(params?: IGetCommentsParams): Promise<IPaginatedResult<CommentEntity>> {
    try {
      const queryParams = CommentMapper.toQueryParams(params);

      const response = await this.httpClient.get<ICommentResponse[]>('/comments', {
        params: queryParams,
      });

      return this.toPaginatedResult<ICommentResponse, CommentEntity>(response, (responses) =>
        CommentMapper.toEntities(responses),
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async getById(id: number): Promise<CommentEntity> {
    try {
      const response = await this.httpClient.get<ICommentResponse>(`/comments/${id}`);
      return CommentMapper.toEntity(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getByPostId(id: number): Promise<CommentEntity[]> {
    try {
      const response = await this.httpClient.get<ICommentResponse[]>(`/comments?postId=${id}`);
      return CommentMapper.toEntities(response.data);
    } catch (error) {
      this.handleError(error, id);
    }
  }

  async create(comment: CreateCommentDto): Promise<CommentEntity> {
    try {
      const response = await this.httpClient.post<ICommentResponse>(
        '/comments',
        CommentMapper.toResponse(comment),
      );

      return CommentMapper.toEntity(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: number, comment: UpdateCommentDto): Promise<CommentEntity> {
    try {
      const response = await this.httpClient.put<ICommentResponse>(
        `/comments/${id}`,
        CommentMapper.toResponse(comment),
      );

      return CommentMapper.toEntity(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async patch(id: number, fields: PatchCommentDto): Promise<CommentEntity> {
    try {
      const response = await this.httpClient.patch<ICommentResponse>(
        `/comments/${id}`,
        CommentMapper.toResponse(fields),
      );

      return CommentMapper.toEntity(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.httpClient.delete(`/comments/${id}`);

      return true;
    } catch (error) {
      this.handleError(error);
    }
  }
}
