import { type RouteObject } from 'react-router-dom';
import { lazyWithFallback } from 'lib-styleguide-simba/remote-loader';
import AppLayout from '@presentation/shared/layouts/app-layout';
import { ProtectedRoute } from '@presentation/features/auth/components';

const PostDetailPage = lazyWithFallback(
  () => import('@presentation/features/posts/pages/PostDetailPage'),
);
const PostPage = lazyWithFallback(() => import('@presentation/features/posts/pages/PostPage'));
const PostsPage = lazyWithFallback(() => import('@presentation/features/posts/pages/PostsPage'));

export const postRoutes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <PostsPage />,
      },
      {
        path: ':id',
        element: <PostDetailPage />,
      },
      {
        path: 'create',
        element: <PostPage />,
      },
      {
        path: 'edit/:id',
        element: <PostPage />,
      },
    ],
  },
];
