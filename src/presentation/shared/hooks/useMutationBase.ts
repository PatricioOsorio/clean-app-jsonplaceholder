import { useQueryClient, type QueryKey } from '@tanstack/react-query';

export const useMutationBase = <T>(queryKey: QueryKey) => {
  const queryClient = useQueryClient();

  const cancelAndSnapshot = async (): Promise<T | undefined> => {
    await queryClient.cancelQueries({ queryKey });
    return queryClient.getQueryData<T>(queryKey);
  };

  const rollback = (snapshot: T | undefined) => {
    queryClient.setQueryData<T>(queryKey, snapshot);
  };

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  return {
    cancelAndSnapshot,
    rollback,
    invalidate,
  };
};
