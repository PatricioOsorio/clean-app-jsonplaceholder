import type { TodoEntity } from '@domain/todo';
import type { IGetQueryParams } from '@domain/shared';

export type IGetTodosParams = IGetQueryParams<TodoEntity>;
