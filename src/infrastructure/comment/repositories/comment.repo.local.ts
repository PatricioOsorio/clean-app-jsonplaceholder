import { inject, injectable } from 'tsyringe';

import {
  CommentEntity,
  CommentNotFoundError,
  CommentRepository,
  CreateCommentDto,
  PatchCommentDto,
  UpdateCommentDto,
  type IGetCommentsParams,
} from '@domain/comment';
import {
  withDelay,
  LocalDb,
  runDataCommand,
  applyPaginationAndSorting,
} from '@infrastructure/utils';
import { SEED_COMMENT, simulateFaultComment } from './comment.dev';
import { StorageClient, LOCAL_STORAGE_KEYS } from '@infrastructure/storage';
import type { IValidatorEntity } from '@domain/shared/validator.entity';
import type { IPaginatedResult } from '@domain/shared';

@injectable()
export class CommentRepositoryLocal implements CommentRepository {
  private readonly db: LocalDb<CommentEntity>;

  constructor(
    @inject(StorageClient.TOKEN) private readonly storage: StorageClient,
    @inject(CommentEntity.TOKEN)
    private readonly validator: IValidatorEntity<CommentEntity>,
  ) {
    this.db = new LocalDb<CommentEntity>(this.storage, LOCAL_STORAGE_KEYS.comments, SEED_COMMENT);
  }

  async getAll(params?: IGetCommentsParams): Promise<IPaginatedResult<CommentEntity>> {
    runDataCommand({
      onSeed: () => this.db.resetToSeed(),
      onEmpty: () => this.db.clear(),
    });

    await simulateFaultComment('getAll');

    const allComments = this.db.getAll().map((comment) => this.validator.validate(comment));
    const total = allComments.length;

    const paginatedComments = applyPaginationAndSorting(allComments, params);

    const paginatedResult: IPaginatedResult<CommentEntity> = {
      data: paginatedComments,
      total,
    };

    return withDelay(paginatedResult);
  }

  async getById(id: number): Promise<CommentEntity> {
    await simulateFaultComment('getById', id);

    const comment = this.db.getById(id);
    if (!comment) throw new CommentNotFoundError(id);

    return withDelay(this.validator.validate(comment));
  }

  async getByPostId(id: number): Promise<CommentEntity[]> {
    await simulateFaultComment('getByPostId', id);

    const comments = this.db.getBy((c) => c.idPost === id).map((c) => this.validator.validate(c));

    return withDelay(comments);
  }

  async create(comment: CreateCommentDto): Promise<CommentEntity> {
    await simulateFaultComment('create');

    const newComment = this.db.create(comment);

    return withDelay(this.validator.validate(newComment));
  }

  async update(id: number, comment: UpdateCommentDto): Promise<CommentEntity> {
    await simulateFaultComment('update', id);

    const updated = this.db.update(id, comment);
    if (!updated) throw new CommentNotFoundError(id);

    return withDelay(this.validator.validate(updated));
  }

  async patch(id: number, fields: PatchCommentDto): Promise<CommentEntity> {
    await simulateFaultComment('patch', id);

    const patched = this.db.update(id, fields);
    if (!patched) throw new CommentNotFoundError(id);

    return withDelay(this.validator.validate(patched));
  }

  async delete(id: number): Promise<boolean> {
    await simulateFaultComment('delete', id);

    const deleted = this.db.delete(id);
    if (!deleted) throw new CommentNotFoundError(id);

    return withDelay(true);
  }
}
