import 'reflect-metadata';

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { App } from './App';
import './presentation/styles/app.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
