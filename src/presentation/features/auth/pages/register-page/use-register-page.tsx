import {
  useRegisterFormConfig,
  type IRegisterFormModel,
  type IRegisterFormProps,
} from '@presentation/features/auth/components';
import { useRedirectAfterLogin } from '@presentation/features/auth/hooks';
import { useAuthContext } from '@presentation/shared/providers';
import { mapIssuesToForm } from '@presentation/utils';
import { toastService } from 'lib-styleguide-simba/toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const useRegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { Input, hookForm } = useRegisterFormConfig();
  const { register, isRegistering } = useAuthContext();
  const { redirectAfterLogin } = useRedirectAfterLogin();

  // ! handlers
  const handleSubmit = hookForm.handleSubmit(async (data) => {
    try {
      await register(data.userName, data.email, data.password);

      redirectAfterLogin();
    } catch (error) {
      const isFormError = mapIssuesToForm<IRegisterFormModel>(error, hookForm.setError);
      if (!isFormError) {
        toastService.error('Registration failed. Please try again.');
      }
    }
  });

  const handleLogin = () => {
    navigate('/auth/login');
  };

  const btnRegisterProps: IRegisterFormProps['btnRegisterProps'] = {
    onClick: handleSubmit,
    disabled: !hookForm.formState.isValid || hookForm.formState.isSubmitting || isRegistering,
  };

  const btnLoginProps: IRegisterFormProps['btnLoginProps'] = {
    onClick: handleLogin,
  };

  useEffect(() => {
    if (isAuthenticated) redirectAfterLogin();
  }, [isAuthenticated, redirectAfterLogin]);

  return {
    // props
    btnRegisterProps,
    btnLoginProps,

    // form
    Input,
  };
};
