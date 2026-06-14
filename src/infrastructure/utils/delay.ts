export const DEFAULT_DELAY = 1000;

export const withDelay = <T>(result: T, delay = DEFAULT_DELAY): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(result), delay));
};
