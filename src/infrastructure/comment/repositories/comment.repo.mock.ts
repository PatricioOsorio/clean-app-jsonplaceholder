import {
  CommentEntity,
  CommentNotFoundError,
  CreateCommentDto,
  PatchCommentDto,
  UpdateCommentDto,
  type CommentRepository,
  type IGetCommentsParams,
} from '@domain/comment';
import { simulateFaultComment } from './comment.dev';
import {
  resolveDelay,
  withDelay,
  InMemoryDb,
  runDataCommand,
  applyPaginationAndSorting,
} from '@infrastructure/utils';
import { injectable } from 'tsyringe';
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
export class CommentRepositoryMock implements CommentRepository {
  private readonly db = new InMemoryDb<CommentEntity>(SEED);

  async getAll(params?: IGetCommentsParams): Promise<IPaginatedResult<CommentEntity>> {
    runDataCommand({
      onSeed: () => this.db.resetToSeed(),
      onEmpty: () => this.db.clear(),
    });

    await simulateFaultComment(undefined, 'getAll');

    const allComments = this.db.getAll();
    const total = allComments.length;

    const sortedPaginatedComments = applyPaginationAndSorting(allComments, params);

    const paginatedResult: IPaginatedResult<CommentEntity> = {
      data: sortedPaginatedComments,
      total,
    };

    return withDelay(paginatedResult, resolveDelay());
  }

  async getById(id: number): Promise<CommentEntity> {
    await simulateFaultComment(id, 'getById');

    const comments = this.db.getById(id);
    if (!comments) throw new CommentNotFoundError(id);

    return withDelay(comments, resolveDelay());
  }

  async getByPostId(id: number): Promise<CommentEntity[]> {
    await simulateFaultComment(id, 'getByPostId');

    const comments = this.db.getBy((c) => c.idPost === id);

    return withDelay(comments, resolveDelay());
  }

  async create(comment: CreateCommentDto): Promise<CommentEntity> {
    await simulateFaultComment(undefined, 'create');

    const newComment = this.db.create(comment);

    return withDelay(newComment, resolveDelay());
  }

  async update(id: number, comment: UpdateCommentDto): Promise<CommentEntity> {
    await simulateFaultComment(id, 'update');

    const updated = this.db.update(id, comment);
    if (!updated) throw new CommentNotFoundError(id);

    return withDelay(updated, resolveDelay());
  }

  async patch(id: number, fields: PatchCommentDto): Promise<CommentEntity> {
    await simulateFaultComment(id, 'patch');

    const patched = this.db.update(id, fields);
    if (!patched) throw new CommentNotFoundError(id);

    return withDelay(patched, resolveDelay());
  }

  async delete(id: number): Promise<boolean> {
    await simulateFaultComment(id, 'delete');

    const deleted = this.db.delete(id);
    if (!deleted) throw new CommentNotFoundError(id);

    return withDelay(deleted, resolveDelay());
  }
}
