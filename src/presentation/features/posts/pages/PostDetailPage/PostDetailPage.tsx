import { PostDetail } from '../../components';
import { usePostDetailPage } from './usePostDetailPage';

import './PostDetailPage.css';

export const PostDetailPage = () => {
  const {
    // props
    post,
    isLoading,
    isError,
    errorTitle,
    errorMessage,
    isEmpty,

    // handlers
    handleBack,
  } = usePostDetailPage();

  return (
    <section className="post-detail-page">
      <PostDetail
        errorDescription={errorMessage}
        errorTitle={errorTitle}
        isEmpty={isEmpty}
        isError={isError}
        isLoading={isLoading}
        post={post}
        onBack={handleBack}
      />
    </section>
  );
};
