import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ThemeProvider } from 'lib-styleguide-simba/theme-provider';

import { appRouter } from '@presentation/router/app.router';
import { queryClient } from '@presentation/libs/tanstack';
export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <RouterProvider router={appRouter} />
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
  );
};
