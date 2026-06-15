import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useCreatePost, usePost, useUpdatePost } from '../../hooks';
import { PostForm } from '../../components/PostForm';
import './PostPage.css';

export const PostPage = () => {
  // ! Edit logic
  const navigate = useNavigate();
  const { id: urlPostId } = useParams();
  const isEditMode = Boolean(urlPostId);

  const { data: postData, isLoading: isPostLoading } = usePost(Number(urlPostId));
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost(Number(urlPostId));

  // ! Create logic
  const { mutate: createPost, isPending: isCreating } = useCreatePost();

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  // ! Shared logic
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) return;

    if (isEditMode) {
      updatePost({
        id: Number(urlPostId),
        title: title.trim(),
        content: content.trim(),
      });
      return navigate('/posts');
    }

    return createPost(
      { title: title.trim(), content: content.trim(), idUser: 1 },
      {
        onSuccess: () => navigate('/posts'),
      },
    );
  };

  useEffect(() => {
    if (!isEditMode || isPostLoading || !postData) return;

    setTitle(postData.title);
    setContent(postData.content);
  }, [isEditMode, isPostLoading, postData]);

  return (
    <section className="post-page">
      <header className="pp__header">
        <p className="pp__system-tag">[ System // Action // Compose ]</p>
        <h1 className="pp__title">{isEditMode ? 'EDIT POST' : 'CREATE POST'}</h1>
        <p className="pp__subtitle">
          Write a new entry. Saved through Clean Architecture Use Cases with an optimistic update.
        </p>
      </header>

      <PostForm
        btnCancelProps={{
          disabled: isUpdating || isCreating,
          onClick: () => navigate('/posts'),
          children: 'Cancel',
        }}
        btnOkProps={{
          disabled: !isValid || isUpdating || isCreating,
          children:
            isUpdating || isCreating ? 'Saving…' : isEditMode ? 'Update Post' : 'Create Post',
        }}
        content={content}
        isLoading={isEditMode && isPostLoading}
        title={title}
        onContentChange={setContent}
        onSubmit={handleSubmit}
        onTitleChange={setTitle}
      />
    </section>
  );
};
