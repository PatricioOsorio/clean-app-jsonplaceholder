import type { TodoEntity, IGetTodosParams } from '@domain/todo';
import type { CreateTodoDto, PatchTodoDto, UpdateTodoDto } from '@domain/todo/dtos';
import type { IPaginatedResult } from '@domain/shared';

export abstract class TodoRepository {
  static readonly TOKEN = Symbol('TodoRepository');

  abstract getAll(params?: IGetTodosParams): Promise<IPaginatedResult<TodoEntity>>;
  abstract getById(id: number): Promise<TodoEntity>;
  abstract create(todo: CreateTodoDto): Promise<TodoEntity>;
  abstract update(id: number, todo: UpdateTodoDto): Promise<TodoEntity>;
  abstract patch(id: number, fields: PatchTodoDto): Promise<TodoEntity>;
  abstract delete(id: number): Promise<boolean>;
}
