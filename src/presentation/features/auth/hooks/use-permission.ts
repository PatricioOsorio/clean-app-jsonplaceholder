import { useCallback } from 'react';

import { useAuthContext } from '@presentation/features/auth/providers';
import type { IPermissionsVM } from '@presentation/features/auth/models';

export const usePermission = () => {
  const { userSession } = useAuthContext();

  const hasPermission = useCallback(
    (requiredPermission: IPermissionsVM): boolean => {
      if (!userSession) return false;

      if (userSession.roles?.includes('admin')) return true;

      return userSession.permissions?.includes(requiredPermission) ?? false;
    },
    [userSession],
  );

  return { hasPermission };
};
