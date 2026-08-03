import { useMemo } from 'react';
import { createFormConfig, FB, useFormBuilder } from 'lib-styleguide-simba/form-builder';
import type { IPostFormModel } from './post-form.interfaces';

export const usePostFormConfig = () => {
  const configForm = useMemo(() => {
    return createFormConfig<IPostFormModel>()({
      title: {
        type: 'text',
        label: FB.LabelRequired.fn('Title'),
        rules: {
          required: {
            value: true,
            message: 'Title is required',
          },
          minLength: {
            value: 1,
            message: 'Title must be at least 1 characters',
          },
        },
      },

      content: {
        type: 'textarea',
        label: FB.LabelRequired.fn('Content'),
        rules: {
          required: {
            value: true,
            message: 'Content is required',
          },
          minLength: {
            value: 1,
            message: 'Content must be at least 1 characters',
          },
        },
      },
    });
  }, []);

  const formBuilder = useFormBuilder(configForm);

  return { ...formBuilder };
};
