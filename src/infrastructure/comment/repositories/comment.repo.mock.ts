import {
  CommentEntity,
  CommentNotFoundError,
  CreateCommentDto,
  PatchCommentDto,
  UpdateCommentDto,
  type CommentRepository,
  type IGetCommentsParams,
} from '@domain/comment';
import { SEED_COMMENT, simulateFaultComment } from './comment.dev';
import {
  withDelay,
  InMemoryDb,
  runDataCommand,
  applyPaginationAndSorting,
} from '@infrastructure/utils';
import { injectable } from 'tsyringe';
import type { IPaginatedResult } from '@domain/shared';

@injectable()
export class CommentRepositoryMock implements CommentRepository {
  private readonly db = new InMemoryDb<CommentEntity>(SEED_COMMENT);

  async getAll(params?: IGetCommentsParams): Promise<IPaginatedResult<CommentEntity>> {
    runDataCommand({
      onSeed: () => this.db.resetToSeed(),
      onEmpty: () => this.db.clear(),
    });

    await simulateFaultComment('getAll');

    const allComments = this.db.getAll();
    const total = allComments.length;

    const sortedPaginatedComments = applyPaginationAndSorting(allComments, params);

    const paginatedResult: IPaginatedResult<CommentEntity> = {
      data: sortedPaginatedComments,
      total,
    };

    return withDelay(paginatedResult);
  }

  async getById(id: number): Promise<CommentEntity> {
    await simulateFaultComment('getById', id);

    const comments = this.db.getById(id);
    if (!comments) throw new CommentNotFoundError(id);

    return withDelay(comments);
  }

  async getByPostId(id: number): Promise<CommentEntity[]> {
    await simulateFaultComment('getByPostId', id);

    const comments = this.db.getBy((c) => c.idPost === id);

    return withDelay(comments);
  }

  async create(comment: CreateCommentDto): Promise<CommentEntity> {
    await simulateFaultComment('create');

    const newComment = this.db.create(comment);

    return withDelay(newComment);
  }

  async update(id: number, comment: UpdateCommentDto): Promise<CommentEntity> {
    await simulateFaultComment('update', id);

    const updated = this.db.update(id, comment);
    if (!updated) throw new CommentNotFoundError(id);

    return withDelay(updated);
  }

  async patch(id: number, fields: PatchCommentDto): Promise<CommentEntity> {
    await simulateFaultComment('patch', id);

    const patched = this.db.update(id, fields);
    if (!patched) throw new CommentNotFoundError(id);

    return withDelay(patched);
  }

  async delete(id: number): Promise<boolean> {
    await simulateFaultComment('delete', id);

    const deleted = this.db.delete(id);
    if (!deleted) throw new CommentNotFoundError(id);

    return withDelay(deleted);
  }
}
