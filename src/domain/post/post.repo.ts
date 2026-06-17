import type { IPostEntity } from './post.entity';

export type ICreatePostInput = Omit<IPostEntity, 'id'>;
export type IUpdatePostInput = Omit<IPostEntity, 'id'>; // all required
export type IPatchPostInput = Partial<Omit<IPostEntity, 'id'>>; // all optional

export abstract class PostRepository {
  static TOKEN = Symbol('PostRepository');
  abstract getAll(): Promise<IPostEntity[]>;
  abstract getById(id: number): Promise<IPostEntity>;
  abstract create(post: ICreatePostInput): Promise<IPostEntity>;
  abstract update(id: number, post: IUpdatePostInput): Promise<IPostEntity>;
  abstract patch(id: number, fields: IPatchPostInput): Promise<IPostEntity>;
  abstract delete(id: number): Promise<boolean>;
}
