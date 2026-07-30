import { Navigate, Outlet } from 'react-router';
import { useAuthContext } from '@presentation/shared/providers';
import { usePermission } from '@presentation/features/auth/hooks';
import type { IPermissionsVM, IRolesVM } from '@presentation/features/auth/models';

interface IProtectedRouteProps {
  requiredPermission?: IPermissionsVM;
  allowedRoles?: IRolesVM[];
  redirectTo?: string;
}

export const ProtectedRouteGuard = ({
  requiredPermission,
  allowedRoles,
  redirectTo = '/auth/login',
}: IProtectedRouteProps) => {
  const { isAuthenticated, userSession } = useAuthContext();
  const { hasPermission } = usePermission();

  // 1. Redirección por falta de sesión activa
  if (!isAuthenticated || !userSession) {
    return <Navigate replace to={redirectTo} />;
  }

  // 2. Validación por Permiso
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate replace to="/unauthorized" />;
  }

  // 3. Validación por Rol (opcional)
  if (allowedRoles && !allowedRoles.some((role) => userSession.roles?.includes(role))) {
    return <Navigate replace to="/unauthorized" />;
  }

  // 4. Autorizado: renderiza sub-rutas
  return <Outlet />;
};
