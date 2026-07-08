import type { useLoginFormConfig } from '@presentation/features/auth/components/LoginForm';
import type { Button } from 'lib-styleguide-simba/button';
import type { IWithError, IWithLoading, IWithRootProps } from 'lib-styleguide-simba/interfaces';
import type { ComponentProps } from 'react';

export interface ILoginFormModel {
  email: string;
  password: string;
}

export interface ILoginFormProps extends IWithRootProps<'form'> {
  Input: ReturnType<typeof useLoginFormConfig>['Input'];

  btnLoginProps?: ComponentProps<typeof Button>;
  btnRegisterProps?: ComponentProps<typeof Button>;

  status?: IWithLoading & IWithError;
}
