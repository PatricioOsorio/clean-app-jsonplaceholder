import { CommentEntity, type CommentRepository } from '@domain/comment';
import { CommentNotFoundError } from '@domain/comment/errors/comment-not-found.error';
import { simulateFaultComment } from './comment.dev';
import { resolveDelay, withDelay, InMemoryDb } from '@infrastructure/utils';
import { injectable } from 'tsyringe';

@injectable()
export class CommentRepositoryMock implements CommentRepository {
  private readonly db = new InMemoryDb<CommentEntity>([
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

  async getByPostId(id: number): Promise<CommentEntity[]> {
    await simulateFaultComment(id, 'getByPostId');

    const comments = this.db.getBy((c) => c.idPost === id);
    if (!comments || comments.length === 0) throw new CommentNotFoundError(id);

    return withDelay(comments, resolveDelay());
  }
}
