import { PostDetail } from '../../components';
import { usePostDetailPage } from './use-post-detail-page';
import { CommentsList } from '@presentation/features/comments/components';
import './post-detail-page.css';

export const PostDetailPage = () => {
  const {
    // post
    post,
    isPostLoading,
    isPostError,
    errorPostTitle,
    errorPostMessage,
    isPostEmpty,

    // delete post
    isDeleting,

    // comments
    comments,
    isCommentsLoading,
    isCommentsError,
    errorCommentsTitle,
    errorCommentsMessage,
    shouldShowComments,

    // Handlers
    handleBack,
    handleDelete,
    handleEdit,
  } = usePostDetailPage();

  return (
    <section className="post-detail-page">
      <PostDetail
        post={post}
        isDeleting={isDeleting}
        isOptimistic={isDeleting}
        status={{
          isLoading: isPostLoading,
          isError: isPostError,
          errorTitle: errorPostTitle,
          errorDescription: errorPostMessage,
          isEmpty: isPostEmpty,
        }}
        onBack={handleBack}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {shouldShowComments && (
        <CommentsList
          comments={comments}
          status={{
            isLoading: isCommentsLoading,
            isError: isCommentsError,
            errorTitle: errorCommentsTitle,
            errorDescription: errorCommentsMessage,
          }}
        />
      )}
    </section>
  );
};
