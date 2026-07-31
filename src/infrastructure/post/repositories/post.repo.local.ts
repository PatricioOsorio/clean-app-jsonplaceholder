import { inject, injectable } from 'tsyringe';

import {
  CreatePostDto,
  UpdatePostDto,
  PatchPostDto,
  PostRepository,
  PostNotFoundError,
  PostEntity,
} from '@domain/post';
import {
  runDataCommand,
  withDelay,
  LocalDb,
  applyPaginationAndSorting,
} from '@infrastructure/utils';
import { SEED_POST, simulateFaultPost } from './post.dev';
import { StorageClient, LOCAL_STORAGE_KEYS } from '@infrastructure/storage';
import type { IGetPostsParams } from '@domain/post';
import type { IValidatorEntity } from '@domain/shared/validator.entity';
import type { IPaginatedResult } from '@domain/shared';

@injectable()
export class PostRepositoryLocal implements PostRepository {
  private readonly db: LocalDb<PostEntity>;

  constructor(
    @inject(StorageClient.TOKEN) private readonly storage: StorageClient,
    @inject(PostEntity.TOKEN) private readonly validator: IValidatorEntity<PostEntity>,
  ) {
    this.db = new LocalDb<PostEntity>(this.storage, LOCAL_STORAGE_KEYS.posts, SEED_POST);
  }

  async getAll(params?: IGetPostsParams): Promise<IPaginatedResult<PostEntity>> {
    runDataCommand({
      onSeed: () => this.db.resetToSeed(),
      onEmpty: () => this.db.clear(),
    });

    await simulateFaultPost('getAll');

    const allPosts = this.db.getAll().map((post) => this.validator.validate(post));
    const total = allPosts.length;

    const paginatedPosts = applyPaginationAndSorting(allPosts, params);

    const paginatedResult: IPaginatedResult<PostEntity> = {
      data: paginatedPosts,
      total,
    };

    return withDelay(paginatedResult);
  }

  async getById(id: number): Promise<PostEntity> {
    await simulateFaultPost('getById', id);

    const post = this.db.getById(id);
    if (!post) throw new PostNotFoundError(id);

    return withDelay(this.validator.validate(post));
  }

  async create(post: CreatePostDto): Promise<PostEntity> {
    await simulateFaultPost('create');
    const newPost = this.db.create(post);
    return withDelay(this.validator.validate(newPost));
  }

  async update(id: number, post: UpdatePostDto): Promise<PostEntity> {
    await simulateFaultPost('update', id);

    const updated = this.db.update(id, post);
    if (!updated) throw new PostNotFoundError(id);

    return withDelay(this.validator.validate(updated));
  }

  async patch(id: number, fields: PatchPostDto): Promise<PostEntity> {
    await simulateFaultPost('patch', id);

    const patched = this.db.update(id, fields);
    if (!patched) throw new PostNotFoundError(id);

    return withDelay(this.validator.validate(patched));
  }

  async delete(id: number): Promise<boolean> {
    await simulateFaultPost('delete', id);

    const deleted = this.db.delete(id);
    if (!deleted) throw new PostNotFoundError(id);

    return withDelay(true);
  }
}
