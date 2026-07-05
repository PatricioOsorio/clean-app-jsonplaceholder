import type { Spinner } from 'lib-styleguide-simba/shadcn/spinner';
import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';

import type { ComponentProps } from 'react';

export interface ILoadingVM {
  spinnerProps?: ComponentProps<typeof Spinner>;
}

export interface ILoadingProps extends IWithRootProps<'section'>, ILoadingVM {}
