import type { ComponentProps } from 'react';
import type { Button } from 'lib-styleguide-simba/button';
import type { IWithError, IWithLoading, IWithRootProps } from 'lib-styleguide-simba/interfaces';

import type { usePostFormConfig } from './usePostForm.config';

export interface IPostFormConfigModel {
  title: string;
  content: string;
}

export interface IPostFormProps extends IWithRootProps<'form'> {
  Input: ReturnType<typeof usePostFormConfig>['Input'];

  btnCancelProps?: ComponentProps<typeof Button>;
  btnOkProps?: ComponentProps<typeof Button>;

  status?: IWithLoading & IWithError;
}
