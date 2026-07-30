import { type RouteObject } from 'react-router-dom';
import { lazyWithFallback } from 'lib-styleguide-simba/remote-loader';
import AppLayout from '@presentation/shared/layouts/app-layout';

const HomePage = lazyWithFallback(() => import('@presentation/features/home/home-page'));
const PostsPage = lazyWithFallback(() => import('@presentation/features/posts/pages/posts-page'));
const PostDetailPage = lazyWithFallback(
  () => import('@presentation/features/posts/pages/post-detail-page'),
);

export const homeRoutes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        element: <PostsPage />,
      },
      {
        path: ':id',
        element: <PostDetailPage />,
      },
      // {
      //   path: 'posts',
      //   element:
      // }
    ],
  },
];
