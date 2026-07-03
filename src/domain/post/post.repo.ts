import type { PostEntity } from './post.entity';
import type { CreatePostDto, UpdatePostDto, PatchPostDto } from './dtos';
import type { IGetPostsParams } from './post.interfaces';
import type { IPaginatedResult } from '../shared/pagination';

export abstract class PostRepository {
  static readonly TOKEN = Symbol('PostRepository');
  abstract getAll(params?: IGetPostsParams): Promise<IPaginatedResult<PostEntity>>;
  abstract getById(id: number): Promise<PostEntity>;
  abstract create(post: CreatePostDto): Promise<PostEntity>;
  abstract update(id: number, post: UpdatePostDto): Promise<PostEntity>;
  abstract patch(id: number, fields: PatchPostDto): Promise<PostEntity>;
  abstract delete(id: number): Promise<boolean>;
}
