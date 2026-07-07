import { type RouteObject } from 'react-router-dom';
import { lazyWithFallback } from 'lib-styleguide-simba/remote-loader';

const AuthLayout = lazyWithFallback(() => import('@presentation/features/auth/layouts'));
const LoginPage = lazyWithFallback(() => import('@presentation/features/auth/pages/LoginPage'));

export const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
];
