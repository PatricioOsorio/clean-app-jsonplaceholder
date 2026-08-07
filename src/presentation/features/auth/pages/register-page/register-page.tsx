import { AuthCard, RegisterForm } from '@presentation/features/auth/components';
import { useRegisterPage } from './use-register-page';

export const RegisterPage = () => {
  const {
    // props
    btnRegisterProps,
    btnLoginProps,

    // form
    Input,
  } = useRegisterPage();

  return (
    <AuthCard title="Create your account" subtitle="Fill in your details to get started.">
      <RegisterForm
        Input={Input}
        btnRegisterProps={btnRegisterProps}
        btnLoginProps={btnLoginProps}
      />
    </AuthCard>
  );
};
