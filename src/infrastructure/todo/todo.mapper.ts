import { TodoEntity, type IGetTodosParams } from '@domain/todo';
import type { ITodoResponse } from './todo.response';

export abstract class TodoMapper {
  static toEntity(response: ITodoResponse): TodoEntity {
    return new TodoEntity({
      id: response.id,
      idUser: response.userId,
      title: response.title,
      completed: response.completed,
    });
  }

  static toEntities(responses: ITodoResponse[]): TodoEntity[] {
    return responses.map((response) => this.toEntity(response));
  }

  static toResponse(entity: Partial<TodoEntity>): Partial<ITodoResponse> {
    const response: Partial<ITodoResponse> = {};

    if (entity.id !== undefined) response.id = entity.id;
    if (entity.idUser !== undefined) response.userId = entity.idUser;
    if (entity.title !== undefined) response.title = entity.title;
    if (entity.completed !== undefined) response.completed = entity.completed;

    return response;
  }

  static toQueryParams(params?: IGetTodosParams): URLSearchParams {
    const queryParams = new URLSearchParams();

    if (!params) return queryParams;

    if (params.page !== undefined) queryParams.append('_page', params.page.toString());
    if (params.limit !== undefined) queryParams.append('_limit', params.limit.toString());
    if (params.sort !== undefined) queryParams.append('_sort', params.sort);
    if (params.sortOrder !== undefined) queryParams.append('_order', params.sortOrder);

    return queryParams;
  }
}
