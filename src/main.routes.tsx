import { createBrowserRouter } from 'react-router';

import { ENV } from '@infrastructure/utils/constants';
import { homeRoutes } from '@presentation/features/home/home.routes';
import { postRoutes } from '@presentation/features/posts/post.routes';
import { authRoutes } from '@presentation/features/auth/auth.routes';

export const mainRouter = createBrowserRouter(
  [
    {
      path: '/',
      children: [
        {
          path: 'auth',
          children: authRoutes,
        },
        {
          path: 'posts',
          children: postRoutes,
        },
        { path: '*', children: homeRoutes },
      ],
    },
  ],
  {
    basename: ENV.VITE_BASEPATH,
  },
);
