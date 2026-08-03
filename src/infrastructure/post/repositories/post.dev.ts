import { PostNotFoundError, PostInvalidDataError, PostEntity } from '@domain/post';
import { createFaultSimulator } from '@infrastructure/utils';

export const simulateFaultPost = createFaultSimulator<number>((fault, id = 0) => {
  if (fault === 'not-found') return new PostNotFoundError(id);
  if (fault === 'invalid') return new PostInvalidDataError('Simulated invalid data');
});

export const SEED_POST: PostEntity[] = [
  { id: 1, idUser: 1, title: 'Post 1', content: 'Content of post 1' },
  { id: 2, idUser: 1, title: 'Post 2', content: 'Content of post 2' },
  { id: 3, idUser: 2, title: 'Post 3', content: 'Content of post 3' },
];
