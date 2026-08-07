import { createFormConfig, useFormBuilder, FB } from 'lib-styleguide-simba/form-builder';
import { useMemo } from 'react';

import type { IRegisterFormModel } from '@presentation/features/auth/components/register-form';

export const useRegisterFormConfig = () => {
  const configForm = useMemo(() => {
    return createFormConfig<IRegisterFormModel>()({
      userName: {
        type: 'text',
        label: FB.LabelRequired.fn('Username'),
        rules: {
          required: {
            value: true,
            message: 'Username is required',
          },
          minLength: {
            value: 1,
            message: 'Username must be at least 1 characters',
          },
        },
      },
      email: {
        type: 'text',
        label: FB.LabelRequired.fn('Email'),
        rules: {
          required: {
            value: true,
            message: 'Email is required',
          },
          minLength: {
            value: 1,
            message: 'Email must be at least 1 characters',
          },
        },
      },
      password: {
        type: 'text',
        label: FB.LabelRequired.fn('Password'),
        rules: {
          required: {
            value: true,
            message: 'Password is required',
          },
          minLength: {
            value: 1,
            message: 'Password must be at least 1 characters',
          },
        },
      },
      confirmPassword: {
        type: 'text',
        label: FB.LabelRequired.fn('Confirm password'),
        rules: {
          required: {
            value: true,
            message: 'Confirm your password',
          },
          validate: (value, formValues) =>
            value === formValues.password || 'Passwords do not match',
        },
      },
    });
  }, []);

  const formBuilder = useFormBuilder(configForm, {
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return { ...formBuilder };
};
