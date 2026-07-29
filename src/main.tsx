import 'reflect-metadata';
import '@infrastructure/di/container';

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { App } from './app';
import './presentation/styles/app.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
