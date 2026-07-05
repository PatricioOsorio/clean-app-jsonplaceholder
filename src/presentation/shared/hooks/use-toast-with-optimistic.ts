import { toast } from 'lib-styleguide-simba/shadcn/sonner';
import { useOptimistic, type IOptimisticProps } from './use-optimistic-mutation';
import { formatError } from '@presentation/utils';

type IMessages = {
  success: string;
  fallbackError: string;
};

type IToastWithOptimisticProps<TInput, TCache, TData = unknown> = Omit<
  IOptimisticProps<TInput, TCache, TData>,
  'onSuccess' | 'onError'
> & {
  messages: IMessages;
};

export const useToastWithOptimistic = <TInput, TCache, TData = unknown>(
  options: IToastWithOptimisticProps<TInput, TCache, TData>,
) =>
  useOptimistic({
    ...options,

    onSuccess: () => {
      toast.success(options.messages.success);
    },

    onError: (error) => {
      // Si el error tiene issues (validación de formulario)
      if (error && typeof error === 'object' && 'issues' in error) return;

      toast.error(formatError(error, options.messages.fallbackError).errorMessage);
    },
  });
