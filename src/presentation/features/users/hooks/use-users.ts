import { useQuery } from '@tanstack/react-query';

import type { IGetUsersParams } from '@domain/user';
import { UserMapper } from '@presentation/features/users/models';
import { QUERY_KEYS } from '@presentation/libs/tanstack';
import { useUsersDependencies } from './use-users-dependencies';

export const useUsers = (params?: IGetUsersParams) => {
  const { users } = useUsersDependencies();

  return useQuery({
    queryKey: QUERY_KEYS.users.all(params),
    queryFn: async () => {
      const result = await users.getAll(params);
      return {
        data: UserMapper.toVMs(result.data),
        total: result.total,
      };
    },
  });
};
