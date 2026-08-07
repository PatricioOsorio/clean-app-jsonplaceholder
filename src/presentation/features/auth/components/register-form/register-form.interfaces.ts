import type { useRegisterFormConfig } from '@presentation/features/auth/components/register-form';
import type { Button } from 'lib-styleguide-simba/button';
import type { IWithError, IWithLoading, IWithRootProps } from 'lib-styleguide-simba/interfaces';
import type { ComponentProps } from 'react';

export interface IRegisterFormModel {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterFormProps extends IWithRootProps<'form'> {
  Input: ReturnType<typeof useRegisterFormConfig>['Input'];

  btnRegisterProps?: ComponentProps<typeof Button>;
  btnLoginProps?: ComponentProps<typeof Button>;

  status?: IWithLoading & IWithError;
}
