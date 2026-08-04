import {
  TodoEntity,
  TodoNotFoundError,
  type CreateTodoDto,
  type IGetTodosParams,
  type PatchTodoDto,
  type TodoRepository,
  type UpdateTodoDto,
} from '@domain/todo';
import type { IPaginatedResult, IValidatorEntity } from '@domain/shared';
import { SEED_TODOS, simulateFaultTodo } from '@infrastructure/todo/repositories/todo.dev';
import { LOCAL_STORAGE_KEYS, StorageClient } from '@infrastructure/storage';
import {
  applyPaginationAndSorting,
  LocalDb,
  runDataCommand,
  withDelay,
} from '@infrastructure/utils';
import { inject, injectable } from 'tsyringe';

@injectable()
export class TodoRepositoryLocal implements TodoRepository {
  private readonly db: LocalDb<TodoEntity>;

  constructor(
    @inject(StorageClient.TOKEN) private readonly storage: StorageClient,
    @inject(TodoEntity.VALIDATOR_TOKEN) private readonly validator: IValidatorEntity<TodoEntity>,
  ) {
    this.db = new LocalDb<TodoEntity>(this.storage, LOCAL_STORAGE_KEYS.todos, SEED_TODOS);
  }

  async getAll(params?: IGetTodosParams): Promise<IPaginatedResult<TodoEntity>> {
    runDataCommand({
      onSeed: () => this.db.resetToSeed(),
      onEmpty: () => this.db.clear(),
    });

    await simulateFaultTodo('getAll');

    const allTodos = this.db.getAll().map((todo) => this.validator.validate(todo));
    const total = allTodos.length;

    const paginatedTodos = applyPaginationAndSorting(allTodos, params);

    const paginatedResult: IPaginatedResult<TodoEntity> = {
      data: paginatedTodos,
      total,
    };
    return withDelay(paginatedResult);
  }

  async getById(id: number): Promise<TodoEntity> {
    await simulateFaultTodo('getById', id);

    const todo = this.db.getById(id);
    if (!todo) throw new TodoNotFoundError(id);

    return withDelay(this.validator.validate(todo));
  }

  async create(todo: CreateTodoDto): Promise<TodoEntity> {
    await simulateFaultTodo('create');

    const newTodo = this.db.create(todo);
    return withDelay(this.validator.validate(newTodo));
  }

  async update(id: number, todo: UpdateTodoDto): Promise<TodoEntity> {
    await simulateFaultTodo('update', id);

    const updated = this.db.update(id, todo);
    if (!updated) throw new TodoNotFoundError(id);

    return withDelay(this.validator.validate(updated));
  }

  async patch(id: number, fields: PatchTodoDto): Promise<TodoEntity> {
    await simulateFaultTodo('patch', id);

    const patched = this.db.update(id, fields);
    if (!patched) throw new TodoNotFoundError(id);

    return withDelay(this.validator.validate(patched));
  }

  async delete(id: number): Promise<boolean> {
    await simulateFaultTodo('delete', id);

    const deleted = this.db.delete(id);
    if (!deleted) throw new TodoNotFoundError(id);

    return withDelay(true);
  }
}
