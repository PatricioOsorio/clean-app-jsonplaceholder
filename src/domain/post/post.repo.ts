import type { IPost } from './post.entity';

type ICreatePostInput = Omit<IPost, 'id'>;
type IUpdatePostInput = Partial<Omit<IPost, 'id'>>;

export abstract class PostRepository {
  static TOKEN = Symbol('PostRepository');
  abstract getAll(): Promise<IPost[]>;
  abstract getById(id: number): Promise<IPost>;
  abstract create(post: ICreatePostInput): Promise<IPost>;
  abstract update(id: number, post: IUpdatePostInput): Promise<IPost>;
  abstract delete(id: number): Promise<void>;
}
