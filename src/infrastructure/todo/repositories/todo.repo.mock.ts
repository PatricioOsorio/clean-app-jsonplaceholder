import {
  TodoNotFoundError,
  type CreateTodoDto,
  type IGetTodosParams,
  type PatchTodoDto,
  type TodoEntity,
  type TodoRepository,
  type UpdateTodoDto,
} from '@domain/todo';
import type { IPaginatedResult } from '@domain/shared';
import { SEED_TODOS, simulateFaultTodo } from '@infrastructure/todo/repositories/todo.dev';
import { applyPaginationAndSorting, InMemoryDb, runDataCommand } from '@infrastructure/utils';
import { withDelay } from '@infrastructure/utils/delay';
import { injectable } from 'tsyringe';

@injectable()
export class TodoRepositoryMock implements TodoRepository {
  private readonly db = new InMemoryDb<TodoEntity>(SEED_TODOS);

  async getAll(params?: IGetTodosParams): Promise<IPaginatedResult<TodoEntity>> {
    runDataCommand({
      onSeed: () => this.db.resetToSeed(),
      onEmpty: () => this.db.clear(),
    });

    await simulateFaultTodo('getAll');

    const allTodos = this.db.getAll();
    const total = allTodos.length;

    const sortedPaginatedTodos = applyPaginationAndSorting(allTodos, params);

    const paginatedResult: IPaginatedResult<TodoEntity> = {
      data: sortedPaginatedTodos,
      total,
    };

    return withDelay(paginatedResult);
  }

  async getById(id: number): Promise<TodoEntity> {
    await simulateFaultTodo('getById', id);

    const todo = this.db.getById(id);
    if (!todo) throw new TodoNotFoundError(id);

    return withDelay(todo);
  }

  async create(todo: CreateTodoDto): Promise<TodoEntity> {
    await simulateFaultTodo('create');
    const newTodo = this.db.create(todo);
    return withDelay(newTodo);
  }

  async update(id: number, todo: UpdateTodoDto): Promise<TodoEntity> {
    await simulateFaultTodo('update', id);

    const updated = this.db.update(id, todo);
    if (!updated) throw new TodoNotFoundError(id);

    return withDelay(updated);
  }

  async patch(id: number, fields: PatchTodoDto): Promise<TodoEntity> {
    await simulateFaultTodo('patch', id);

    const patched = this.db.update(id, fields);
    if (!patched) throw new TodoNotFoundError(id);

    return withDelay(patched);
  }

  async delete(id: number): Promise<boolean> {
    await simulateFaultTodo('delete', id);

    const deleted = this.db.delete(id);
    if (!deleted) throw new TodoNotFoundError(id);

    return withDelay(true);
  }
}
