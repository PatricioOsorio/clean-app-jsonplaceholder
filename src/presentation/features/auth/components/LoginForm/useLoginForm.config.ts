import { createFormConfig, useFormBuilder } from 'lib-styleguide-simba/hooks';
import { FB } from 'form-builder';
import { useMemo } from 'react';

import type { ILoginFormModel } from '@presentation/features/auth/components/LoginForm';

export const useLoginFormConfig = () => {
  const configForm = useMemo(() => {
    return createFormConfig<ILoginFormModel>()({
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
    });
  }, []);

  const formBuilder = useFormBuilder(configForm);

  return { ...formBuilder };
};
