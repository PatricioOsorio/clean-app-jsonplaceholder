import { inject, injectable } from 'tsyringe';

import type {
  ICreatePostInput,
  IPatchPostInput,
  IPost,
  IUpdatePostInput,
  PostRepository,
} from '@domain/post';
import { PostNotFoundError } from '@domain/post/errors/post-not-found.error';
import { StorageClient, LOCAL_STORAGE_KEYS } from '@infrastructure/storage';
import { resolveDelay, runDataCommand, withDelay } from '@infrastructure/utils';
import { simulateFault } from './post.dev';

@injectable()
export class PostRepositoryLocal implements PostRepository {
  private readonly key = LOCAL_STORAGE_KEYS.posts;

  private readonly seed: IPost[] = [
    { id: 1, idUser: 1, title: 'Post 1', content: 'Content of post 1' },
    { id: 2, idUser: 1, title: 'Post 2', content: 'Content of post 2' },
    { id: 3, idUser: 2, title: 'Post 3', content: 'Content of post 3' },
  ];

  constructor(@inject(StorageClient.TOKEN) private readonly storage: StorageClient) {}

  private read(): IPost[] {
    const posts = this.storage.get<IPost[]>(this.key);
    if (!posts) {
      this.write(this.seed);
      return [...this.seed];
    }
    return posts;
  }

  private write(posts: IPost[]): void {
    this.storage.set(this.key, posts);
  }

  private nextId(posts: IPost[]): number {
    return posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
  }

  async getAll(): Promise<IPost[]> {
    runDataCommand({
      onSeed: () => this.write(this.seed),
      onEmpty: () => this.write([]),
    });
    await simulateFault();
    return withDelay(this.read(), resolveDelay());
  }

  async getById(id: number): Promise<IPost> {
    await simulateFault(id);
    const post = this.read().find((p) => p.id === id);
    if (!post) throw new PostNotFoundError(id);

    return withDelay({ ...post }, resolveDelay());
  }

  async create(post: ICreatePostInput): Promise<IPost> {
    await simulateFault();
    const posts = this.read();

    const newPost: IPost = {
      id: this.nextId(posts),
      idUser: post.idUser,
      title: post.title,
      content: post.content,
    };

    this.write([...posts, newPost]);
    return withDelay({ ...newPost }, resolveDelay());
  }

  async update(id: number, post: IUpdatePostInput): Promise<IPost> {
    await simulateFault(id);
    const posts = this.read();
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) throw new PostNotFoundError(id);

    const existingPost = posts[index];

    const updatedPost: IPost = {
      id,
      idUser: post.idUser ?? existingPost.idUser,
      title: post.title ?? existingPost.title,
      content: post.content ?? existingPost.content,
    };

    posts[index] = updatedPost;
    this.write(posts);

    return withDelay({ ...updatedPost }, resolveDelay());
  }

  async patch(id: number, fields: IPatchPostInput): Promise<IPost> {
    await simulateFault(id);
    const posts = this.read();
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) throw new PostNotFoundError(id);

    const existingPost = posts[index];

    const patchedPost: IPost = {
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
    await simulateFault(id);
    const posts = this.read();
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) throw new PostNotFoundError(id);

    posts.splice(index, 1);
    this.write(posts);

    return withDelay(true, resolveDelay());
  }
}
