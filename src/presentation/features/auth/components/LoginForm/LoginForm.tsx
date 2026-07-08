import { cn } from 'lib-styleguide-simba/utils';
import { Button } from 'lib-styleguide-simba/button';

import { StatusContent } from '@presentation/shared/components';
import type { ILoginFormProps } from './LoginForm.interfaces';
import './LoginForm.css';

export const LoginForm = ({
  Input,
  status,
  btnRegisterProps,
  btnLoginProps,
  rootProps,
}: ILoginFormProps) => {
  return (
    <form className={cn('login-form-container', rootProps?.className)}>
      <StatusContent {...status} loadingTemplate={<div>Loading...</div>}>
        <Input.Email inputProps={{ defaultValue: 'Sincere@april.biz' }} />
        <Input.Password inputProps={{ defaultValue: 'pass' }} />

        <div className="lfc__actions">
          <Button children="Login" type="button" {...btnLoginProps} />
          <Button children="Register" type="button" variant="ghost" {...btnRegisterProps} />
        </div>
      </StatusContent>
    </form>
  );
};
