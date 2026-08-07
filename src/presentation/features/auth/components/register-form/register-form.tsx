import { cn } from 'lib-styleguide-simba/utils';
import { Button } from 'lib-styleguide-simba/button';
import { StatusContent } from 'lib-styleguide-simba/status-content';

import type { IRegisterFormProps } from './register-form.interfaces';
import './register-form.css';

export const RegisterForm = ({
  Input,
  status,
  btnRegisterProps,
  btnLoginProps,
  rootProps,
}: IRegisterFormProps) => {
  return (
    <form className={cn('register-form-container', rootProps?.className)}>
      <StatusContent {...status}>
        <Input.UserName />
        <Input.Email />
        <Input.Password />
        <Input.ConfirmPassword />

        <div className="rfc__actions">
          <Button children="Create account" type="button" {...btnRegisterProps} />
        </div>

        <p className="rfc__login">
          Already have an account?{' '}
          <Button children="Sign in" type="button" variant="text" size="sm" {...btnLoginProps} />
        </p>
      </StatusContent>
    </form>
  );
};
