import { inject, injectable } from 'tsyringe';

import { CreatePostDto, UpdatePostDto, PatchPostDto, PostRepository } from '@domain/post';
import type { IPostEntity } from '@domain/post';
import { PostNotFoundError } from '@domain/post/errors/post-not-found.error';
import { StorageClient, LOCAL_STORAGE_KEYS } from '@infrastructure/storage';
import { resolveDelay, runDataCommand, withDelay } from '@infrastructure/utils';
import { simulateFault } from './post.dev';

@injectable()
export class PostRepositoryLocal implements PostRepository {
  private readonly key = LOCAL_STORAGE_KEYS.posts;

  private readonly seed: IPostEntity[] = [
    { id: 1, idUser: 1, title: 'Post 1', content: 'Content of post 1' },
    { id: 2, idUser: 1, title: 'Post 2', content: 'Content of post 2' },
    { id: 3, idUser: 2, title: 'Post 3', content: 'Content of post 3' },
  ];

  constructor(@inject(StorageClient.TOKEN) private readonly storage: StorageClient) {}

  private read(): IPostEntity[] {
    const posts = this.storage.get<IPostEntity[]>(this.key);
    if (!posts) {
      this.write(this.seed);
      return [...this.seed];
    }
    return posts;
  }

  private write(posts: IPostEntity[]): void {
    this.storage.set(this.key, posts);
  }

  private nextId(posts: IPostEntity[]): number {
    return posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
  }

  async getAll(): Promise<IPostEntity[]> {
    runDataCommand({
      onSeed: () => this.write(this.seed),
      onEmpty: () => this.write([]),
    });

    await simulateFault(undefined, 'getAll');

    return withDelay(this.read(), resolveDelay());
  }

  async getById(id: number): Promise<IPostEntity> {
    await simulateFault(id, 'getById');

    const post = this.read().find((p) => p.id === id);
    if (!post) throw new PostNotFoundError(id);

    return withDelay({ ...post }, resolveDelay());
  }

  async create(post: CreatePostDto): Promise<IPostEntity> {
    await simulateFault(undefined, 'create');

    const posts = this.read();

    const newPost: IPostEntity = {
      id: this.nextId(posts),
      idUser: post.idUser,
      title: post.title,
      content: post.content,
    };

    this.write([...posts, newPost]);
    return withDelay({ ...newPost }, resolveDelay());
  }

  async update(id: number, post: UpdatePostDto): Promise<IPostEntity> {
    await simulateFault(id, 'update');

    const posts = this.read();
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) throw new PostNotFoundError(id);

    const existingPost = posts[index];

    const updatedPost: IPostEntity = {
      id,
      idUser: post.idUser ?? existingPost.idUser,
      title: post.title ?? existingPost.title,
      content: post.content ?? existingPost.content,
    };

    posts[index] = updatedPost;
    this.write(posts);

    return withDelay({ ...updatedPost }, resolveDelay());
  }

  async patch(id: number, fields: PatchPostDto): Promise<IPostEntity> {
    await simulateFault(id, 'patch');

    const posts = this.read();
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) throw new PostNotFoundError(id);

    const existingPost = posts[index];

    const patchedPost: IPostEntity = {
      id,
      idUser: fields.idUser ?? existingPost.idUser,
      title: fields.title ?? existingPost.title,
      content: fields.content ?? existingPost.content,
    };

    posts[index] = patchedPost;
    this.write(posts);

    return withDelay({ ...patchedPost }, resolveDelay());
  }

  async delete(id: number): Promise<boolean> {
    await simulateFault(id, 'delete');

    const posts = this.read();
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) throw new PostNotFoundError(id);

    posts.splice(index, 1);
    this.write(posts);

    return withDelay(true, resolveDelay());
  }
}
