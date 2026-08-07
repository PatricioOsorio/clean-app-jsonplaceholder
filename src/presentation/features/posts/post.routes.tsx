import { type RouteObject } from 'react-router-dom';
import { lazyWithFallback } from 'lib-styleguide-simba/remote-loader';
import AppLayout from '@presentation/shared/layouts/app-layout';
import { ProtectedRouteGuard } from '@presentation/shared/guards';

const PostDetailPage = lazyWithFallback(
  () => import('@presentation/features/posts/pages/post-detail-page'),
);
const PostFormPage = lazyWithFallback(
  () => import('@presentation/features/posts/pages/post-form-page'),
);
const PostsPage = lazyWithFallback(() => import('@presentation/features/posts/pages/posts-page'));

export const postRoutes: RouteObject[] = [
  {
    element: <AppLayout />,
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
        element: <ProtectedRouteGuard requiredPermission={['posts:create']} />,
        children: [{ path: 'create', element: <PostFormPage /> }],
      },
      {
        element: <ProtectedRouteGuard requiredPermission={['posts:update']} />,
        children: [{ path: 'edit/:id', element: <PostFormPage /> }],
      },
    ],
  },
];
