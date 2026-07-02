import type { CommentEntity } from '@domain/comment';

export abstract class CommentRepository {
  static readonly TOKEN = Symbol('CommentRepository');

  abstract getByPostId(id: number): Promise<CommentEntity[]>;
}
