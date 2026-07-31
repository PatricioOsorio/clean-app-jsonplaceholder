import { injectable } from 'tsyringe';

import {
  CreatePostDto,
  UpdatePostDto,
  PatchPostDto,
  PostRepository,
  PostNotFoundError,
} from '@domain/post';
import type { IGetPostsParams, PostEntity } from '@domain/post';
import {
  runDataCommand,
  withDelay,
  InMemoryDb,
  applyPaginationAndSorting,
} from '@infrastructure/utils';
import { SEED_POST, simulateFaultPost } from './post.dev';
import type { IPaginatedResult } from '@domain/shared';

@injectable()
export class PostRepositoryMock implements PostRepository {
  private readonly db = new InMemoryDb<PostEntity>(SEED_POST);

  async getAll(params?: IGetPostsParams): Promise<IPaginatedResult<PostEntity>> {
    runDataCommand({
      onSeed: () => this.db.resetToSeed(),
      onEmpty: () => this.db.clear(),
    });

    await simulateFaultPost('getAll');

    const allPosts = this.db.getAll();
    const total = allPosts.length;

    const sortedPaginatedPosts = applyPaginationAndSorting(allPosts, params);

    const paginatedResult: IPaginatedResult<PostEntity> = {
      data: sortedPaginatedPosts,
      total,
    };

    return withDelay(paginatedResult);
  }

  async getById(id: number): Promise<PostEntity> {
    await simulateFaultPost('getById', id);

    const post = this.db.getById(id);
    if (!post) throw new PostNotFoundError(id);

    return withDelay(post);
  }

  async create(post: CreatePostDto): Promise<PostEntity> {
    await simulateFaultPost('create');
    const newPost = this.db.create(post);
    return withDelay(newPost);
  }

  async update(id: number, post: UpdatePostDto): Promise<PostEntity> {
    await simulateFaultPost('update', id);

    const updated = this.db.update(id, post);
    if (!updated) throw new PostNotFoundError(id);

    return withDelay(updated);
  }

  async patch(id: number, fields: PatchPostDto): Promise<PostEntity> {
    await simulateFaultPost('patch', id);

    const patched = this.db.update(id, fields);
    if (!patched) throw new PostNotFoundError(id);

    return withDelay(patched);
  }

  async delete(id: number): Promise<boolean> {
    await simulateFaultPost('delete', id);

    const deleted = this.db.delete(id);
    if (!deleted) throw new PostNotFoundError(id);

    return withDelay(true);
  }
}
