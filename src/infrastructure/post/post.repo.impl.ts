import { inject, injectable } from 'tsyringe';

import { HttpClient } from '../http/http.client';
import { PostMapper } from './post.mapper';
import { PostRepository } from '@domain/post/post.repo';
import type { ICreatePostInput, IPatchPostInput, IUpdatePostInput } from '@domain/post/post.repo';
import type { IPost } from '@domain/post/post.entity';
import type { IPostDTO } from './post.dto';

@injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(@inject(HttpClient.TOKEN) private readonly httpClient: HttpClient) {}

  async getAll(): Promise<IPost[]> {
    const response = await this.httpClient.get<IPostDTO[]>('/posts');
    return PostMapper.toEntities(response);
  }

  async getById(id: number): Promise<IPost> {
    const response = await this.httpClient.get<IPostDTO>(`/posts/${id}`);
    return PostMapper.toEntity(response);
  }

  async create(post: ICreatePostInput): Promise<IPost> {
    const response = await this.httpClient.post<IPostDTO>('/posts', PostMapper.toDTO(post));
    return PostMapper.toEntity(response);
  }

  async update(id: number, post: IUpdatePostInput): Promise<IPost> {
    const response = await this.httpClient.put<IPostDTO>(`/posts/${id}`, PostMapper.toDTO(post));
    return PostMapper.toEntity(response);
  }

  async patch(id: number, fields: IPatchPostInput): Promise<IPost> {
    const response = await this.httpClient.patch<IPostDTO>(
      `/posts/${id}`,
      PostMapper.toDTO(fields),
    );
    return PostMapper.toEntity(response);
  }

  async delete(id: number): Promise<boolean> {
    await this.httpClient.delete(`/posts/${id}`);
    return true;
  }
}
