import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useCreatePost, usePost, useUpdatePost } from '../../hooks';
import {
  type IPostFormModel,
  usePostFormConfig,
  type IPostFormProps,
} from '@presentation/features/posts/components';
import { mapIssuesToForm } from '@presentation/utils';

const USER_ID = 1; // TODO: replace with auth logic when implemented

export const usePostPage = () => {
  const navigate = useNavigate();

  const { Input, hookForm } = usePostFormConfig();

  // edit logic
  const { id: urlPostId } = useParams();
  const isEditMode = Boolean(urlPostId);
  const idPost = Number(urlPostId);

  const { data: postData, isLoading: isPostLoading } = usePost(idPost);
  const { mutate: updatePost, isPending: isUpdatingPost } = useUpdatePost();

  // create logic
  const { mutate: createPost, isPending: isCreatingPost } = useCreatePost();

  const handleMutationError = (err: unknown) =>
    mapIssuesToForm<IPostFormModel>(err, hookForm.setError);

  const handleSubmit = hookForm.handleSubmit((data) => {
    const { title, content } = data;

    const payload = { title, content, idUser: USER_ID };
    const options = {
      onSuccess: () => navigate('/posts'),
      onError: handleMutationError,
    };

    if (isEditMode) return updatePost({ id: idPost, input: payload }, options);

    return createPost(payload, options);
  });

  const handleCancel = () => navigate('/posts');

  // computed
  const TITLE = isEditMode ? 'EDIT POST' : 'CREATE POST';
  const SUBTITLE = isEditMode
    ? 'Edit your entry. Saved through Clean Architecture Use Cases with an optimistic update.'
    : 'Write a new entry. Saved through Clean Architecture Use Cases with an optimistic update.';
  const isLoadingForm = isEditMode && isPostLoading;

  const isDisabledCancelButton = isUpdatingPost || isCreatingPost;
  const isDisabledOkButton = isUpdatingPost || isCreatingPost;
  const okButtonText =
    isUpdatingPost || isCreatingPost ? 'Saving…' : isEditMode ? 'Update Post' : 'Create Post';

  const btnCancelProps: IPostFormProps['btnCancelProps'] = {
    disabled: isDisabledCancelButton,
    onClick: handleCancel,
    children: 'Cancel',
  };

  const btnOkProps: IPostFormProps['btnOkProps'] = {
    disabled: isDisabledOkButton,
    children: okButtonText,
    onClick: handleSubmit,
  };

  useEffect(() => {
    if (postData) hookForm.reset(postData);
  }, [postData, hookForm]);

  return {
    // props
    isLoadingForm,
    btnCancelProps,
    btnOkProps,

    // form
    Input,

    // computed
    TITLE,
    SUBTITLE,
  };
};
