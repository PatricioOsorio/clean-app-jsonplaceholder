import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useCreatePost, usePost, useUpdatePost } from '../../hooks';

const USER_ID = 1; // TODO: replace with auth logic when implemented

export const usePostPage = () => {
  const navigate = useNavigate();
  const isInitialized = useRef(false);

  // edit logic
  const { id: urlPostId } = useParams();
  const isEditMode = Boolean(urlPostId);
  const idPost = Number(urlPostId);

  const { data: postData, isLoading: isPostLoading } = usePost(idPost);
  const { mutate: updatePost, isPending: isUpdatingPost } = useUpdatePost(idPost);
  // const { mutate: updatePost, isPending: isUpdatingPost } = usePatchPost(idPost);

  // create logic
  const { mutate: createPost, isPending: isCreatingPost } = useCreatePost();

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  // shared logic
  const isValid = title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) return;

    const titleTrimmed = title.trim();
    const contentTrimmed = content.trim();

    if (isEditMode) {
      updatePost({
        id: idPost,
        title: titleTrimmed,
        content: contentTrimmed,
        idUser: USER_ID,
      });
      // optimistic ui
      return navigate('/posts');
    }

    return createPost(
      { title: titleTrimmed, content: contentTrimmed, idUser: USER_ID },
      {
        onSuccess: () => navigate('/posts'),
      },
    );
  };

  useEffect(() => {
    if (!isEditMode || isPostLoading || !postData || isInitialized.current) return;

    setTitle(postData.title);
    setContent(postData.content);

    isInitialized.current = true;
  }, [isEditMode, isPostLoading, postData]);

  const handleCancel = () => navigate('/posts');

  const handleContentChange = (value: string) => setContent(value);
  const handleTitleChange = (value: string) => setTitle(value);

  // computed
  const TITLE = isEditMode ? 'EDIT POST' : 'CREATE POST';
  const SUBTITLE = isEditMode
    ? 'Edit your entry. Saved through Clean Architecture Use Cases with an optimistic update.'
    : 'Write a new entry. Saved through Clean Architecture Use Cases with an optimistic update.';

  const isDisabledCancelButton = isUpdatingPost || isCreatingPost;
  const isDisabledOkButton = !isValid || isUpdatingPost || isCreatingPost;
  const okButtonText =
    isUpdatingPost || isCreatingPost ? 'Saving…' : isEditMode ? 'Update Post' : 'Create Post';

  return {
    // props
    isEditMode,
    isPostLoading,
    title,
    content,

    // computed
    TITLE,
    SUBTITLE,
    isDisabledCancelButton,
    isDisabledOkButton,
    okButtonText,

    // handlers
    handleCancel,
    handleSubmit,
    handleContentChange,
    handleTitleChange,
  };
};
