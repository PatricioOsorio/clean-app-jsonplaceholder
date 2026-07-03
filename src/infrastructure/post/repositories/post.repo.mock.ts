import { injectable } from 'tsyringe';

import { CreatePostDto, UpdatePostDto, PatchPostDto, PostRepository } from '@domain/post';
import type { IGetPostsParams, PostEntity } from '@domain/post';
import { PostNotFoundError } from '@domain/post/errors/post-not-found.error';
import {
  resolveDelay,
  runDataCommand,
  withDelay,
  InMemoryDb,
  applyPaginationAndSorting,
} from '@infrastructure/utils';
import { simulateFaultPost } from './post.dev';
import type { IPaginatedResult } from '@domain/shared';

@injectable()
export class PostRepositoryMock implements PostRepository {
  private readonly db = new InMemoryDb<PostEntity>([
    { id: 1, idUser: 1, title: 'Post 1', content: 'Content of post 1' },
    { id: 2, idUser: 1, title: 'Post 2', content: 'Content of post 2' },
    { id: 3, idUser: 2, title: 'Post 3', content: 'Content of post 3' },
  ]);

  async getAll(params?: IGetPostsParams): Promise<IPaginatedResult<PostEntity>> {
    runDataCommand({
      onSeed: () => this.db.resetToSeed(),
      onEmpty: () => this.db.clear(),
    });

    await simulateFaultPost(undefined, 'getAll');

    const allPosts = this.db.getAll();
    const total = allPosts.length;

    const sortedPaginatedPosts = applyPaginationAndSorting(allPosts, params);

    const paginatedResult: IPaginatedResult<PostEntity> = {
      data: sortedPaginatedPosts,
      total: total,
    };

    return withDelay(paginatedResult, resolveDelay());
  }

  async getById(id: number): Promise<PostEntity> {
    await simulateFaultPost(id, 'getById');

    const post = this.db.getById(id);
    if (!post) throw new PostNotFoundError(id);

    return withDelay(post, resolveDelay());
  }

  async create(post: CreatePostDto): Promise<PostEntity> {
    await simulateFaultPost(undefined, 'create');
    const newPost = this.db.create(post);
    return withDelay(newPost, resolveDelay());
  }

  async update(id: number, post: UpdatePostDto): Promise<PostEntity> {
    await simulateFaultPost(id, 'update');

    const updated = this.db.update(id, post);
    if (!updated) throw new PostNotFoundError(id);

    return withDelay(updated, resolveDelay());
  }

  async patch(id: number, fields: PatchPostDto): Promise<PostEntity> {
    await simulateFaultPost(id, 'patch');

    const patched = this.db.update(id, fields);
    if (!patched) throw new PostNotFoundError(id);

    return withDelay(patched, resolveDelay());
  }

  async delete(id: number): Promise<boolean> {
    await simulateFaultPost(id, 'delete');

    const deleted = this.db.delete(id);
    if (!deleted) throw new PostNotFoundError(id);

    return withDelay(true, resolveDelay());
  }
}
