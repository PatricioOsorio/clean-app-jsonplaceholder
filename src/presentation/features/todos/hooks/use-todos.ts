import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@presentation/libs/tanstack';
import type { IGetQueryParams } from '@domain/shared';
import type { TodoEntity } from '@domain/todo';
import { useTodosDependencies } from './use-todos-dependencies';
import { TodoMapper } from '@presentation/features/todos/models';

export const useTodos = (params?: IGetQueryParams<TodoEntity>) => {
  const { todos } = useTodosDependencies();

  const todosQuery = useQuery({
    queryKey: QUERY_KEYS.todos.all(params),
    queryFn: async () => {
      const result = await todos.getAll(params);
      return {
        data: TodoMapper.toVMs(result.data),
        total: result.total,
      };
    },
  });

  return todosQuery;
};
