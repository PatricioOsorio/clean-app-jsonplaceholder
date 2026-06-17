import { PostForm } from '../../components/PostForm';
import { usePostPage } from './usePostPage';

import './PostPage.css';

export const PostPage = () => {
  const {
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
    fieldErrors,

    // handlers
    handleCancel,
    handleSubmit,
    handleContentChange,
    handleTitleChange,
  } = usePostPage();

  return (
    <section className="post-page">
      <header className="pp__header">
        <p className="pp__system-tag">[ System // Action // Compose ]</p>
        <h1 className="pp__title">{TITLE}</h1>
        <p className="pp__subtitle">{SUBTITLE}</p>
      </header>

      <PostForm
        btnCancelProps={{
          disabled: isDisabledCancelButton,
          onClick: handleCancel,
          children: 'Cancel',
        }}
        btnOkProps={{
          disabled: isDisabledOkButton,
          children: okButtonText,
        }}
        content={content}
        isLoading={isEditMode && isPostLoading}
        title={title}
        onContentChange={handleContentChange}
        onSubmit={handleSubmit}
        onTitleChange={handleTitleChange}
        errors={fieldErrors}
      />
    </section>
  );
};
