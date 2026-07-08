import { Navigate, type RouteObject } from 'react-router-dom';
import { lazyWithFallback } from 'lib-styleguide-simba/remote-loader';
import AuthLayout from '@presentation/features/auth/layouts';

const LoginPage = lazyWithFallback(() => import('@presentation/features/auth/pages/LoginPage'));

export const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        index: true,
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <Navigate replace to="login" />,
      },
    ],
  },
];
