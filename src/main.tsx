import 'reflect-metadata';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'styleguide/theme-provider';

import { DependenciesProvider } from '@presentation/context/dependencies.context';
import { appRouter } from '@presentation/router/app.router';
import { queryClient } from '@presentation/context/query-client';

import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DependenciesProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="vercel-dark">
          <RouterProvider router={appRouter} />
        </ThemeProvider>
      </QueryClientProvider>
    </DependenciesProvider>
  </StrictMode>,
);
