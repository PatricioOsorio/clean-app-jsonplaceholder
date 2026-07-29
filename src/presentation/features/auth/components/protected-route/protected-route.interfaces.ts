import type { IRolesVM } from '@presentation/features/auth/models';
import type { PropsWithChildren } from 'react';

export interface IProtectedRouteProps extends PropsWithChildren {
  allowedRoles?: IRolesVM[];
  fallbackPath?: string;
}
