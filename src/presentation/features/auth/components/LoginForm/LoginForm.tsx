import { cn } from 'lib-styleguide-simba/utils';
import { Button } from 'lib-styleguide-simba/button';

import { Skeleton, StatusContent } from '@presentation/shared/components';
import type { ILoginFormProps } from './LoginForm.interfaces';
import './LoginForm.css';

export const LoginForm = ({
  Input,
  status,
  btnRegisterProps,
  btnLoginProps,
  btnForgotPasswordProps,
  rootProps,
}: ILoginFormProps) => {
  return (
    <form className={cn('login-form-container', rootProps?.className)}>
      <StatusContent
        {...status}
        loadingTemplate={
          <div className="lfc__skeleton">
            <Skeleton.Text className="h-10 w-full" />
            <Skeleton.Text className="h-10 w-full" />
            <Skeleton.Button className="ml-auto w-full" />
          </div>
        }
      >
        <Input.Email />

        <div className="lfc__field">
          <Input.Password />
          <Button
            children="Forgot password?"
            type="button"
            variant="link"
            size="sm"
            className="lfc__forgot"
            {...btnForgotPasswordProps}
          />
        </div>

        <div className="lfc__actions">
          <Button children="Sign in" type="button" {...btnLoginProps} />

          <Button
            children="Create an account"
            type="button"
            variant="ghost"
            {...btnRegisterProps}
          />
        </div>
      </StatusContent>
    </form>
  );
};
