import { inject, injectable } from 'tsyringe';

import { createApiErrorHandler, toPaginatedResult } from '@infrastructure/http';
import { DomainError } from '@domain/errors/domain.error';
import { HttpRepository } from '@domain/http/http.repo';
import { PostMapper } from '../post.mapper';
import {
  PostRepository,
  CreatePostDto,
  UpdatePostDto,
  PatchPostDto,
  PostNotFoundError,
  PostEntity,
} from '@domain/post';
import type { IGetPostsParams } from '@domain/post';
import type { IPostResponse } from '../post.response';
import type { IValidatorEntity } from '@domain/shared/validator.entity';
import type { IPaginatedResult } from '@domain/shared';

const postErrorHandler = createApiErrorHandler((error, postId) => {
  if (error.gatewayCode !== 'NOT_FOUND') {
    return;
  }

  if (postId !== undefined) {
    return new PostNotFoundError(Number(postId));
  }

  return new DomainError('Load Failed', 'Could not load posts from server.', 'NOT_FOUND');
});

@injectable()
export class PostRepositoryApi implements PostRepository {
  constructor(
    @inject(HttpRepository.TOKEN) private readonly httpClient: HttpRepository,
    @inject(PostEntity.TOKEN) private readonly validator: IValidatorEntity<PostEntity>,
  ) {}

  /*
   * Handles errors that occur during HTTP requests.
   * @param error - The error object thrown during the HTTP request.
   * @param postId - Optional ID of the post related to the error.
   * @throws A domain-specific error based on the HTTP error response.
   */
  private handleError(error: unknown, postId?: number): never {
    return postErrorHandler(error, postId);
  }

  async getAll(params?: IGetPostsParams): Promise<IPaginatedResult<PostEntity>> {
    try {
      const queryParams = PostMapper.toQueryParams(params);

      const response = await this.httpClient.get<IPostResponse[]>('/posts', {
        params: queryParams,
      });

      return toPaginatedResult<IPostResponse, PostEntity>(response, (responses) =>
        PostMapper.toEntities(responses).map((post) => this.validator.validate(post)),
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async getById(id: number): Promise<PostEntity> {
    try {
      const response = await this.httpClient.get<IPostResponse>(`/posts/${id}`);
      return this.validator.validate(PostMapper.toEntity(response.data));
    } catch (error) {
      this.handleError(error, id);
    }
  }

  async create(post: CreatePostDto): Promise<PostEntity> {
    try {
      const response = await this.httpClient.post<IPostResponse>(
        '/posts',
        PostMapper.toResponse(post),
      );
      return this.validator.validate(PostMapper.toEntity(response.data));
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: number, post: UpdatePostDto): Promise<PostEntity> {
    try {
      const response = await this.httpClient.put<IPostResponse>(
        `/posts/${id}`,
        PostMapper.toResponse(post),
      );
      return this.validator.validate(PostMapper.toEntity(response.data));
    } catch (error) {
      this.handleError(error, id);
    }
  }

  async patch(id: number, fields: PatchPostDto): Promise<PostEntity> {
    try {
      const response = await this.httpClient.patch<IPostResponse>(
        `/posts/${id}`,
        PostMapper.toResponse(fields),
      );
      return this.validator.validate(PostMapper.toEntity(response.data));
    } catch (error) {
      this.handleError(error, id);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.httpClient.delete(`/posts/${id}`);
      return true;
    } catch (error) {
      this.handleError(error, id);
    }
  }
}
