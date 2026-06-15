import type { ComponentProps } from 'react';
import type { Button } from 'styleguide/button';
import type { IWithLoading, IWithRootProps } from 'styleguide/component.interfaces';

import type { IPostFormVM } from '../../models/post';

export interface IPostFormProps extends IWithRootProps<'form'>, IPostFormVM, IWithLoading {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  btnCancelProps?: ComponentProps<typeof Button>;
  btnOkProps?: ComponentProps<typeof Button>;
}
