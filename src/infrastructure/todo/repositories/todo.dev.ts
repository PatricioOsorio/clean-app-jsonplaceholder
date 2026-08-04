import type { TodoEntity } from '@domain/todo';
import { TodoInvalidDataError, TodoNotFoundError } from '@domain/todo/errors';
import { createFaultSimulator } from '@infrastructure/utils';

export const simulateFaultTodo = createFaultSimulator<number>((fault, id = 0) => {
  if (fault === 'not-found') return new TodoNotFoundError(id);
  if (fault === 'invalid') return new TodoInvalidDataError('Simulated invalid data');
});

export const SEED_TODOS: TodoEntity[] = [
  {
    id: 1,
    idUser: 1,
    title: 'delectus aut autem',
    completed: false,
  },
  {
    id: 2,
    idUser: 1,
    title: 'quis ut nam facilis et officia qui',
    completed: true,
  },
];
