import { AuthCard, LoginForm } from '@presentation/features/auth/components';
import { useLoginPage } from './use-login-page';

export const LoginPage = () => {
  const {
    // props
    btnRegisterProps,
    btnLoginProps,
    btnForgotPasswordProps,

    // form
    Input,
  } = useLoginPage();

  return (
    <AuthCard title="Welcome back" subtitle="Enter your credentials to access your account.">
      <LoginForm
        Input={Input}
        btnLoginProps={btnLoginProps}
        btnRegisterProps={btnRegisterProps}
        btnForgotPasswordProps={btnForgotPasswordProps}
      />
    </AuthCard>
  );
};
