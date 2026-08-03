import { CommentEntity, CommentInvalidDataError, CommentNotFoundError } from '@domain/comment';
import { createFaultSimulator } from '@infrastructure/utils';

export const simulateFaultComment = createFaultSimulator<number>((fault, id = 0) => {
  if (fault === 'not-found') return new CommentNotFoundError(id);
  if (fault === 'invalid') return new CommentInvalidDataError('Simulated invalid data');
});

export const SEED_COMMENT: CommentEntity[] = [
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
