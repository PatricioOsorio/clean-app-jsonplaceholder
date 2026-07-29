import { useAuthContext } from '@presentation/features/auth/providers';
import { Navigate } from 'react-router-dom';
import type { IProtectedRouteProps } from './protected-route.interfaces';

export const ProtectedRoute = ({
  allowedRoles,
  fallbackPath = '/auth/login',
  children,
}: IProtectedRouteProps) => {
  const auth = useAuthContext();

  if (!auth.isAuthenticated) return <Navigate replace to={fallbackPath} />;

  const userRoles = auth.userSession?.roles ?? [];
  const hasRoleRequirements = Boolean(allowedRoles?.length);
  const userHasRoles = userRoles.some((role) => allowedRoles?.includes(role));

  if (hasRoleRequirements && !userHasRoles) {
    return <Navigate replace to="/unauthorized" />;
  }

  return children;
};
