import { inject, injectable } from 'tsyringe';

import { HttpRepository } from '@domain/http/http.repo';
import { HttpError } from '@domain/http/errors/http.error';
import { NetworkError } from '@domain/errors/network.error';
import { PostMapper } from '../post.mapper';
import { PostNotFoundError } from '@domain/post/errors/post-not-found.error';
import { PostRepository, CreatePostDto, UpdatePostDto, PatchPostDto } from '@domain/post';
import type { IPostEntity } from '@domain/post';
import type { IPostResponse } from '../post.reponse';
import { DomainError } from '@domain/errors/domain.error';

@injectable()
export class PostRepositoryApi implements PostRepository {
  constructor(@inject(HttpRepository.TOKEN) private readonly httpClient: HttpRepository) {}

  private handleError(error: unknown, postId?: number): never {
    // server/network error (CORS, DNS, offline)
    if (!(error instanceof HttpError)) {
      throw new NetworkError();
    }

    // 404 over a specific resource → the post doesn't exist
    if (error.statusCode === 404 && postId !== undefined) {
      throw new PostNotFoundError(postId);
    }

    // 404 without id → the collection couldn't be loaded (getAll, create...)
    if (error.statusCode === 404) {
      throw new DomainError('Load Failed', 'Could not load posts from server.');
    }

    // any other HTTP failure (4xx/5xx)
    throw new DomainError('API Error', error.message);
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
      const response = await this.httpClient.post<IPostResponse>('/posts', PostMapper.toResponse(post));
      return PostMapper.toEntity(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: number, post: UpdatePostDto): Promise<IPostEntity> {
    try {
      const response = await this.httpClient.put<IPostResponse>(`/posts/${id}`, PostMapper.toResponse(post));
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
