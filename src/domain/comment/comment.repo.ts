import type { CommentEntity } from '@domain/comment';
import type { CreateCommentDto, PatchCommentDto, UpdateCommentDto } from '@domain/comment/dtos';
import type { IGetCommentsParams } from '@domain/comment/comment.interfaces';
import type { IPaginatedResult } from '@domain/shared';

export abstract class CommentRepository {
  static readonly TOKEN = Symbol('CommentRepository');

  abstract getAll(params?: IGetCommentsParams): Promise<IPaginatedResult<CommentEntity>>;
  abstract getById(id: number): Promise<CommentEntity>;
  abstract getByPostId(id: number): Promise<CommentEntity[]>;
  abstract create(comment: CreateCommentDto): Promise<CommentEntity>;
  abstract update(id: number, comment: UpdateCommentDto): Promise<CommentEntity>;
  abstract patch(id: number, fields: PatchCommentDto): Promise<CommentEntity>;
  abstract delete(id: number): Promise<boolean>;
}
