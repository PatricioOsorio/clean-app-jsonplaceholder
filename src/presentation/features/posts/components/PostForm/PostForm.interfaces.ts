import type { ComponentProps } from 'react';
import type { Button } from 'lib-styleguide-simba/button';
import type { IWithError, IWithLoading, IWithRootProps } from 'lib-styleguide-simba/component.interfaces';

import type { IPostFormVM } from '../../models/post';

export interface IPostFormProps
  extends IWithRootProps<'form'>, IPostFormVM, IWithLoading, IWithError {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  btnCancelProps?: ComponentProps<typeof Button>;
  btnOkProps?: ComponentProps<typeof Button>;
  errors?: Record<string, string>;
}
