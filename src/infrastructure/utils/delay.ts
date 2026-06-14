export const withDelay = <T>(result: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(result), delay));
};
