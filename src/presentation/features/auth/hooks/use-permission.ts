import { useCallback } from 'react';

import type { IPermissionsVM } from '@presentation/features/auth/models';
import { useAuthContext } from '@presentation/shared/providers';

export const usePermission = () => {
  const { userSession } = useAuthContext();

  const hasPermission = useCallback(
    (requiredPermission: IPermissionsVM[]): boolean => {
      if (!userSession) return false;

      return userSession.hasPermission(requiredPermission);
    },
    [userSession],
  );

  return { hasPermission };
};
