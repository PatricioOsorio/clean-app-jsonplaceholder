import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ThemeProvider } from 'lib-styleguide-simba/theme-provider';

import { queryClient } from '@presentation/libs/tanstack';
import { AuthProvider } from '@presentation/shared/providers';
import { mainRouter } from './main.routes';

export const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" viewTransition={{ animation: 'CircleBlurTopRight' }}>
          <RouterProvider router={mainRouter} />
        </ThemeProvider>

        <TanStackDevtools
          plugins={[
            {
              name: 'TanStack Query',
              render: <ReactQueryDevtoolsPanel />,
            },
          ]}
        />
      </QueryClientProvider>
    </AuthProvider>
  );
};
