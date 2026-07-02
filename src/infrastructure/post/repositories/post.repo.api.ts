import { inject, injectable } from 'tsyringe';

import { createApiErrorHandler } from '@infrastructure/http';
import { DomainError } from '@domain/errors/domain.error';
import { HttpRepository } from '@domain/http/http.repo';
import { PostMapper } from '../post.mapper';
import { PostNotFoundError } from '@domain/post/errors/post-not-found.error';
import { PostRepository, CreatePostDto, UpdatePostDto, PatchPostDto } from '@domain/post';
import type { IPostEntity } from '@domain/post';
import type { IPostResponse } from '../post.response';

const postErrorHandler = createApiErrorHandler((error, postId) => {
  if (error.gatewayCode === 'NOT_FOUND') {
    return postId !== undefined
      ? new PostNotFoundError(postId)
      : new DomainError('Load Failed', 'Could not load posts from server.', 'NOT_FOUND');
  }
});

@injectable()
export class PostRepositoryApi implements PostRepository {
  constructor(@inject(HttpRepository.TOKEN) private readonly httpClient: HttpRepository) {}

  private handleError(error: unknown, postId?: number): never {
    return postErrorHandler(error, postId);
  }

  async getAll(): Promise<IPostEntity[]> {
    try {
      const response = await this.httpClient.get<IPostResponse[]>('/posts');
      return PostMapper.toEntities(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getById(id: number): Promise<IPostEntity> {
    try {
      const response = await this.httpClient.get<IPostResponse>(`/posts/${id}`);
      return PostMapper.toEntity(response);
    } catch (error) {
      this.handleError(error, id);
    }
  }

  async create(post: CreatePostDto): Promise<IPostEntity> {
    try {
      const response = await this.httpClient.post<IPostResponse>(
        '/posts',
        PostMapper.toResponse(post),
      );
      return PostMapper.toEntity(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: number, post: UpdatePostDto): Promise<IPostEntity> {
    try {
      const response = await this.httpClient.put<IPostResponse>(
        `/posts/${id}`,
        PostMapper.toResponse(post),
      );
      return PostMapper.toEntity(response);
    } catch (error) {
      this.handleError(error, id);
    }
  }

  async patch(id: number, fields: PatchPostDto): Promise<IPostEntity> {
    try {
      const response = await this.httpClient.patch<IPostResponse>(
        `/posts/${id}`,
        PostMapper.toResponse(fields),
      );
      return PostMapper.toEntity(response);
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
