import type { IWithChildren } from 'lib-styleguide-simba/interfaces';
import type { ReactNode } from 'react';

import { useAuthContext } from '@presentation/shared/providers';

interface IGuestGuardProps extends IWithChildren {
  fallback?: ReactNode;
}

export const GuestGuard = ({ children, fallback = null }: IGuestGuardProps) => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
