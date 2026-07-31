import { resolveDelay } from '@infrastructure/utils/dev-tools';

export const DEFAULT_DELAY = 1000;

export const withDelay = <T>(result: T, delay = resolveDelay()): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(result), delay));
};
