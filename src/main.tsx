import 'reflect-metadata';

import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';
import { StrictMode } from 'react';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ThemeProvider } from 'styleguide/theme-provider';

import { appRouter } from '@presentation/router/app.router';
import { DependenciesProvider } from '@presentation/context/dependencies.context';
import { queryClient } from '@/presentation/libs/tanstack';

import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DependenciesProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="vercel-dark">
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
    </DependenciesProvider>
  </StrictMode>,
);
