import type { IPost } from './post.entity';

export type ICreatePostInput = Omit<IPost, 'id'>;
export type IUpdatePostInput = Partial<Omit<IPost, 'id'>>;
export type IPatchPostInput = Partial<Omit<IPost, 'id'>>;

export abstract class PostRepository {
  static TOKEN = Symbol('PostRepository');
  abstract getAll(): Promise<IPost[]>;
  abstract getById(id: number): Promise<IPost>;
  abstract create(post: ICreatePostInput): Promise<IPost>;
  abstract update(id: number, post: IUpdatePostInput): Promise<IPost>;
  abstract patch(id: number, fields: IPatchPostInput): Promise<IPost>;
  abstract delete(id: number): Promise<boolean>;
}
