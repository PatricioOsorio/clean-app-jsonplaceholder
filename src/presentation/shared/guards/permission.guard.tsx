import { usePermission } from '@presentation/features/auth/hooks';
import type { IPermissionsVM } from '@presentation/features/auth/models';
import type { IWithChildren } from 'lib-styleguide-simba/interfaces';
import type { ReactNode } from 'react';

interface IPermissionGuardProps extends IWithChildren {
  permission: IPermissionsVM[];
  fallback?: ReactNode;
}

export const PermissionGuard = ({ permission, children, fallback }: IPermissionGuardProps) => {
  const { hasPermission } = usePermission();

  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
