import { inject, injectable } from 'tsyringe';

import { CommentEntity, CommentRepository } from '@domain/comment';
import { CommentNotFoundError } from '@domain/comment/errors/comment-not-found.error';
import { resolveDelay, withDelay, LocalDb } from '@infrastructure/utils';
import { simulateFaultComment } from './comment.dev';
import { StorageClient, LOCAL_STORAGE_KEYS } from '@infrastructure/storage';

@injectable()
export class CommentRepositoryLocal implements CommentRepository {
  private readonly db: LocalDb<CommentEntity>;

  constructor(@inject(StorageClient.TOKEN) private readonly storage: StorageClient) {
    this.db = new LocalDb<CommentEntity>(this.storage, LOCAL_STORAGE_KEYS.comments, [
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
    ]);
  }

  async getByPostId(id: number): Promise<CommentEntity[]> {
    await simulateFaultComment(id, 'getByPostId');

    const comments = this.db.getBy((c) => c.idPost === id);

    return withDelay(comments, resolveDelay());
  }
}
