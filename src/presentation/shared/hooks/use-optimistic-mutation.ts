import { type QueryKey, useQueryClient, useMutation } from '@tanstack/react-query';

export interface IOptimisticProps<TInput, TCache, TData = unknown> {
  queryKey: QueryKey;
  mutationFn: (input: TInput) => Promise<TData>;
  optimisticUpdate: (old: TCache | undefined, input: TInput) => TCache;
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
}

export const useOptimistic = <TInput, TCache, TData = unknown>(
  options: IOptimisticProps<TInput, TCache, TData>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: options.mutationFn,

    onMutate: async (input: TInput) => {
      await queryClient.cancelQueries({ queryKey: options.queryKey });

      const snapshot = queryClient.getQueryData<TCache>(options.queryKey);

      queryClient.setQueryData<TCache>(options.queryKey, (old) =>
        options.optimisticUpdate(old, input),
      );

      return { snapshot };
    },

    onSuccess: (data: TData) => {
      options.onSuccess?.(data);
    },

    onError: (error, _input, context) => {
      queryClient.setQueryData<TCache>(options.queryKey, context?.snapshot);
      options.onError?.(error);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: options.queryKey });
    },
  });
};
