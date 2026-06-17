import { injectable } from 'tsyringe';

import {
  CreatePostDto,
  UpdatePostDto,
  PatchPostDto,
  PostRepository,
} from '@domain/post';
import type { IPostEntity } from '@domain/post';
import { PostNotFoundError } from '@domain/post/errors/post-not-found.error';
import { resolveDelay, runDataCommand, withDelay } from '@infrastructure/utils';
import { simulateFault } from './post.dev';


@injectable()
export class PostRepositoryMock implements PostRepository {
  private readonly seed: IPostEntity[] = [
    { id: 1, idUser: 1, title: 'Post 1', content: 'Content of post 1' },
    { id: 2, idUser: 1, title: 'Post 2', content: 'Content of post 2' },
    { id: 3, idUser: 2, title: 'Post 3', content: 'Content of post 3' },
  ];

  private posts: IPostEntity[] = structuredClone(this.seed);

  private nextId(): number {
    return this.posts.length ? Math.max(...this.posts.map((p) => p.id)) + 1 : 1;
  }

  async getAll(): Promise<IPostEntity[]> {
    runDataCommand({
      onSeed: () => (this.posts = structuredClone(this.seed)),
      onEmpty: () => (this.posts = []),
    });

    await simulateFault(undefined, 'getAll');

    return withDelay([...this.posts], resolveDelay());
  }

  async getById(id: number): Promise<IPostEntity> {
    await simulateFault(id, 'getById');

    const post = this.posts.find((p) => p.id === id);
    if (!post) throw new PostNotFoundError(id);

    return withDelay({ ...post }, resolveDelay());
  }

  async create(post: CreatePostDto): Promise<IPostEntity> {
    await simulateFault(undefined, 'create');

    const newPost: IPostEntity = {
      id: this.nextId(),
      idUser: post.idUser,
      title: post.title,
      content: post.content,
    };
    this.posts.push(newPost);
    return withDelay({ ...newPost }, resolveDelay());
  }

  async update(id: number, post: UpdatePostDto): Promise<IPostEntity> {
    await simulateFault(id, 'update');

    const index = this.posts.findIndex((p) => p.id === id);

    if (index === -1) throw new PostNotFoundError(id);

    const existingPost = this.posts[index];

    const updatedPost: IPostEntity = {
      id,
      idUser: post.idUser ?? existingPost.idUser,
      title: post.title ?? existingPost.title,
      content: post.content ?? existingPost.content,
    };

    this.posts[index] = updatedPost;

    return withDelay({ ...updatedPost }, resolveDelay());
  }

  async patch(id: number, fields: PatchPostDto): Promise<IPostEntity> {
    await simulateFault(id, 'patch');

    const index = this.posts.findIndex((p) => p.id === id);

    if (index === -1) throw new PostNotFoundError(id);

    const existingPost = this.posts[index];

    const patchedPost: IPostEntity = {
      id,
      idUser: fields.idUser ?? existingPost.idUser,
      title: fields.title ?? existingPost.title,
      content: fields.content ?? existingPost.content,
    };

    this.posts[index] = patchedPost;

    return withDelay({ ...patchedPost }, resolveDelay());
  }

  async delete(id: number): Promise<boolean> {
    await simulateFault(id, 'delete');
    const index = this.posts.findIndex((p) => p.id === id);

    if (index === -1) throw new PostNotFoundError(id);

    this.posts.splice(index, 1);

    return withDelay(true, resolveDelay());
  }
}
