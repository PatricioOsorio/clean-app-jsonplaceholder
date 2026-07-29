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
  resolveDelay,
  withDelay,
  LocalDb,
  runDataCommand,
  applyPaginationAndSorting,
} from '@infrastructure/utils';
import { simulateFaultComment } from './comment.dev';
import { StorageClient, LOCAL_STORAGE_KEYS } from '@infrastructure/storage';
import type { IValidatorEntity } from '@domain/shared/validator.entity';
import type { IPaginatedResult } from '@domain/shared';

const SEED: CommentEntity[] = [
  {
    id: 1,
    idPost: 1,
    name: 'Comment 1',
    email: 'comment1@example.com',
    content: 'This is the first comment.',
  },
  {
    id: 2,
    idPost: 1,
    name: 'Comment 2',
    email: 'comment2@example.com',
    content: 'This is the second comment.',
  },
  {
    id: 3,
    idPost: 1,
    name: 'Comment 3',
    email: 'comment3@example.com',
    content: 'This is the third comment.',
  },
];
@injectable()
export class CommentRepositoryLocal implements CommentRepository {
  private readonly db: LocalDb<CommentEntity>;

  constructor(
    @inject(StorageClient.TOKEN) private readonly storage: StorageClient,
    @inject(CommentEntity.VALIDATOR_TOKEN)
    private readonly validator: IValidatorEntity<CommentEntity>,
  ) {
    this.db = new LocalDb<CommentEntity>(this.storage, LOCAL_STORAGE_KEYS.comments, SEED);
  }

  async getAll(params?: IGetCommentsParams): Promise<IPaginatedResult<CommentEntity>> {
    runDataCommand({
      onSeed: () => this.db.resetToSeed(),
      onEmpty: () => this.db.clear(),
    });

    await simulateFaultComment(undefined, 'getAll');

    const allComments = this.db.getAll().map((comment) => this.validator.validate(comment));
    const total = allComments.length;

    const paginatedComments = applyPaginationAndSorting(allComments, params);

    const paginatedResult: IPaginatedResult<CommentEntity> = {
      data: paginatedComments,
      total,
    };

    return withDelay(paginatedResult, resolveDelay());
  }

  async getById(id: number): Promise<CommentEntity> {
    await simulateFaultComment(id, 'getById');

    const comment = this.db.getById(id);
    if (!comment) throw new CommentNotFoundError(id);

    return withDelay(this.validator.validate(comment), resolveDelay());
  }

  async getByPostId(id: number): Promise<CommentEntity[]> {
    await simulateFaultComment(id, 'getByPostId');

    const comments = this.db.getBy((c) => c.idPost === id).map((c) => this.validator.validate(c));

    return withDelay(comments, resolveDelay());
  }

  async create(comment: CreateCommentDto): Promise<CommentEntity> {
    await simulateFaultComment(undefined, 'create');

    const newComment = this.db.create(comment);

    return withDelay(this.validator.validate(newComment), resolveDelay());
  }

  async update(id: number, comment: UpdateCommentDto): Promise<CommentEntity> {
    await simulateFaultComment(id, 'update');

    const updated = this.db.update(id, comment);
    if (!updated) throw new CommentNotFoundError(id);

    return withDelay(this.validator.validate(updated), resolveDelay());
  }

  async patch(id: number, fields: PatchCommentDto): Promise<CommentEntity> {
    await simulateFaultComment(id, 'patch');

    const patched = this.db.update(id, fields);
    if (!patched) throw new CommentNotFoundError(id);

    return withDelay(this.validator.validate(patched), resolveDelay());
  }

  async delete(id: number): Promise<boolean> {
    await simulateFaultComment(id, 'delete');

    const deleted = this.db.delete(id);
    if (!deleted) throw new CommentNotFoundError(id);

    return withDelay(true, resolveDelay());
  }
}
