import { type RouteObject } from 'react-router-dom';
import { lazyWithFallback } from 'lib-styleguide-simba/remote-loader';
import AppLayout from '@presentation/shared/layouts/app-layout';

const HomePage = lazyWithFallback(() => import('@presentation/features/home/HomePage'));

export const homeRoutes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
];
