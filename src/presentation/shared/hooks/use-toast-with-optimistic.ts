import { toast } from 'styleguide/sonner';

import { formatError } from '@presentation/utils/error-formatter';
import { useOptimistic, type IOptimisticProps } from './use-optimistic-mutation';

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
      toast.error(formatError(error, options.messages.fallbackError).errorMessage);
    },
  });
