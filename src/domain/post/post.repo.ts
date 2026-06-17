import type { IPostEntity } from './post.entity';
import type { CreatePostDto, UpdatePostDto, PatchPostDto } from './dtos';

export abstract class PostRepository {
  static readonly TOKEN = Symbol('PostRepository');
  abstract getAll(): Promise<IPostEntity[]>;
  abstract getById(id: number): Promise<IPostEntity>;
  abstract create(post: CreatePostDto): Promise<IPostEntity>;
  abstract update(id: number, post: UpdatePostDto): Promise<IPostEntity>;
  abstract patch(id: number, fields: PatchPostDto): Promise<IPostEntity>;
  abstract delete(id: number): Promise<boolean>;
}
