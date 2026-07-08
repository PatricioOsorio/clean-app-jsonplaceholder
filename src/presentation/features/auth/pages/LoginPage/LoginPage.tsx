import { LoginForm } from '@presentation/features/auth/components';
import { useLoginPage } from './useLoginPage';
import './LoginPage.css';

export const LoginPage = () => {
  const {
    // props
    btnRegisterProps,
    btnLoginProps,

    // form
    Input,
  } = useLoginPage();

  return (
    <article className="login-page-container">
      <LoginForm Input={Input} btnLoginProps={btnLoginProps} btnRegisterProps={btnRegisterProps} />
    </article>
  );
};
