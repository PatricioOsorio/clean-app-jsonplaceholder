import type { IStatusContentProps } from './StatusContent.interfaces';

import { Empty } from '../Empty';
import { Error } from '../Error';

export const StatusContent = ({
  isLoading,
  loadingTemplate,

  isError,
  errorTemplate,
  errorTitle,
  errorDescription,

  isEmpty,
  emptyTemplate,
  emptyTitle,
  emptyDescription,

  children,
}: IStatusContentProps) => {
  if (isLoading) {
    return <>{loadingTemplate}</>;
  }

  if (isError) {
    return <>{errorTemplate ?? <Error description={errorDescription} title={errorTitle} />}</>;
  }

  if (isEmpty) {
    return <>{emptyTemplate ?? <Empty description={emptyDescription} title={emptyTitle} />}</>;
  }

  return <>{children}</>;
};
