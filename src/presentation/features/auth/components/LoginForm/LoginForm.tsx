import { cn } from 'lib-styleguide-simba/utils';
import { Button } from 'lib-styleguide-simba/button';
import { StatusContent } from 'lib-styleguide-simba/status-content';

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
      <StatusContent {...status}>
        <Input.Email />

        <div className="lfc__field">
          <Input.Password />
          <Button
            children="Forgot password?"
            type="button"
            variant="text"
            size="sm"
            className="lfc__forgot"
            {...btnForgotPasswordProps}
          />
        </div>

        <div className="lfc__actions">
          <Button children="Sign in" type="button" {...btnLoginProps} />
        </div>

        <p className="lfc__register">
          Don&apos;t have an account?{' '}
          <Button
            children="Create account"
            type="button"
            variant="text"
            size="sm"
            {...btnRegisterProps}
          />
        </p>
      </StatusContent>
    </form>
  );
};
