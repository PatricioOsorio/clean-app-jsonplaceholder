import type { Spinner } from 'styleguide/spinner';
import type { IWithRootProps } from 'styleguide/component.interfaces';

import type { ComponentProps } from 'react';

export interface ILoadingVM {
  spinnerProps?: ComponentProps<typeof Spinner>;
}

export interface ILoadingProps extends IWithRootProps<'section'>, ILoadingVM {}
