import { createBrowserRouter, Navigate } from 'react-router';

import { ENV } from '@infrastructure/utils/constants';

const AppLayout = async () => (await import('@presentation/layouts/AppLayout')).default;
const HomePage = async () => (await import('@presentation/pages/HomePage')).default;
const PostsPage = async () => (await import('@presentation/pages/PostsPage')).default;
const PostDetailPage = async () => (await import('@presentation/pages/PostDetailPage')).default;

export const appRouter = createBrowserRouter(
  [
    {
      path: '/',
      lazy: { Component: AppLayout },
      children: [
        {
          index: true,
          lazy: { Component: HomePage },
        },
        {
          path: 'posts',
          lazy: { Component: PostsPage },
        },
        {
          path: 'posts/:id',
          lazy: { Component: PostDetailPage },
        },
      ],
    },
    { path: '*', element: <Navigate replace to="/" /> },
  ],
  {
    basename: ENV.VITE_BASEPATH,
  },
);
