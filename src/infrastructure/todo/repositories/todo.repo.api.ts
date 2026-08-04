import {
  CreateTodoDto,
  PatchTodoDto,
  TodoEntity,
  TodoNotFoundError,
  UpdateTodoDto,
  type IGetTodosParams,
  type TodoRepository,
} from '@domain/todo';
import { HttpRepository } from '@domain/http';
import type { IPaginatedResult, IValidatorEntity } from '@domain/shared';
import { TodoMapper } from '@infrastructure/todo/todo.mapper';
import type { ITodoResponse } from '@infrastructure/todo/todo.response';
import { createApiErrorHandler, toPaginatedResult } from '@infrastructure/http';
import { inject, injectable } from 'tsyringe';

const todoErrorHandler = createApiErrorHandler((error, todoId) => {
  if (error.gatewayCode === 'NOT_FOUND' && todoId !== undefined) {
    return new TodoNotFoundError(Number(todoId));
  }
});

@injectable()
export class TodoRepositoryApi implements TodoRepository {
  constructor(
    @inject(HttpRepository.TOKEN) private readonly httpClient: HttpRepository,
    @inject(TodoEntity.VALIDATOR_TOKEN)
    private readonly validator: IValidatorEntity<TodoEntity>,
  ) {}

  private handleError(error: unknown, todoId?: number): never {
    return todoErrorHandler(error, todoId);
  }

  async getAll(params?: IGetTodosParams): Promise<IPaginatedResult<TodoEntity>> {
    try {
      const queryParams = TodoMapper.toQueryParams(params);

      const response = await this.httpClient.get<ITodoResponse[]>('/todos', {
        params: queryParams,
      });

      return toPaginatedResult<ITodoResponse, TodoEntity>(response, (responses) =>
        TodoMapper.toEntities(responses).map((todo) => this.validator.validate(todo)),
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getById(id: number): Promise<TodoEntity> {
    try {
      const response = await this.httpClient.get<ITodoResponse>(`/todos/${id}`);
      return this.validator.validate(TodoMapper.toEntity(response.data));
    } catch (error) {
      return this.handleError(error, id);
    }
  }

  async create(todo: CreateTodoDto): Promise<TodoEntity> {
    try {
      const response = await this.httpClient.post<ITodoResponse>(
        '/todos',
        TodoMapper.toResponse(todo),
      );

      return this.validator.validate(TodoMapper.toEntity(response.data));
    } catch (error) {
      return this.handleError(error);
    }
  }

  async update(id: number, todo: UpdateTodoDto): Promise<TodoEntity> {
    try {
      const response = await this.httpClient.put<ITodoResponse>(
        `/todos/${id}`,
        TodoMapper.toResponse(todo),
      );

      return this.validator.validate(TodoMapper.toEntity(response.data));
    } catch (error) {
      return this.handleError(error, id);
    }
  }

  async patch(id: number, fields: PatchTodoDto): Promise<TodoEntity> {
    try {
      const response = await this.httpClient.patch<ITodoResponse>(
        `/todos/${id}`,
        TodoMapper.toResponse(fields),
      );

      return this.validator.validate(TodoMapper.toEntity(response.data));
    } catch (error) {
      return this.handleError(error, id);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.httpClient.delete(`/todos/${id}`);
      return true;
    } catch (error) {
      return this.handleError(error, id);
    }
  }
}
