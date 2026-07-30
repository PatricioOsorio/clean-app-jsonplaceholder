import {
  useLoginFormConfig,
  type ILoginFormModel,
  type ILoginFormProps,
} from '@presentation/features/auth/components';
import { useAuthContext } from '@presentation/shared/providers';
import { mapIssuesToForm } from '@presentation/utils';
import { toastService } from 'lib-styleguide-simba/toast';
import { useNavigate } from 'react-router-dom';

export const useLoginPage = () => {
  const { Input, hookForm } = useLoginFormConfig();
  const { login, isAuthenticating } = useAuthContext();
  const navigate = useNavigate();

  // ! handlers
  const handleSubmit = hookForm.handleSubmit(async (data) => {
    try {
      await login(data.email, data.password);

      navigate('/');
    } catch (error) {
      const isFormError = mapIssuesToForm<ILoginFormModel>(error, hookForm.setError);
      if (!isFormError) {
        toastService.error('Login failed. Please check your credentials.');
      }
    }
  });

  const handleRegister = () => {
    toastService.success('Register button clicked!');
  };
  const handleForgotPassword = () => {
    toastService.success('Forgot Password button clicked!');
  };

  const btnLoginProps: ILoginFormProps['btnLoginProps'] = {
    onClick: handleSubmit,
    disabled: !hookForm.formState.isValid || hookForm.formState.isSubmitting || isAuthenticating,
  };

  const btnRegisterProps: ILoginFormProps['btnRegisterProps'] = {
    onClick: handleRegister,
  };

  const btnForgotPasswordProps: ILoginFormProps['btnForgotPasswordProps'] = {
    onClick: handleForgotPassword,
  };

  return {
    // props
    btnRegisterProps,
    btnLoginProps,
    btnForgotPasswordProps,

    // form
    Input,
  };
};
