import { useParams, useNavigate } from 'react-router-dom';

import { useComment } from '@presentation/features/comments/hooks';
import { formatError } from '@presentation/utils';
import { useDeletePost, usePost } from '../../hooks';

export const usePostDetailPage = () => {
  const { id: idPostParam } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const idPost = idPostParam ? Number(idPostParam) : undefined;

  // ! POST
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
    error: errorPost,
  } = usePost(idPost);

  const { errorTitle: errorPostTitle, errorMessage: errorPostMessage } = formatError(
    errorPost,
    'Error Loading Post',
  );

  // ! DELETE POST
  const { mutate: mutateDeletePost, isPending: isDeleting } = useDeletePost();

  // ! COMMENTS
  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    error: errorComments,
  } = useComment(post ? post.id : undefined);

  const { errorTitle: errorCommentsTitle, errorMessage: errorCommentsMessage } = formatError(
    errorComments,
    'Error Loading Comments',
  );

  // ! Handlers
  const handleBack = () => navigate('/posts');
  const handleEdit = () => navigate(`/posts/edit/${idPost}`);
  const handleDelete = () => {
    if (!idPost) return;
    mutateDeletePost(idPost, {
      onSuccess: () => navigate('/posts'),
    });
  };

  const isPostEmpty = !isPostLoading && !isPostError && !post;
  const shouldShowComments = !isPostError && !isPostEmpty;

  return {
    // post
    post,
    isPostLoading,
    isPostError,
    errorPostTitle,
    errorPostMessage,
    isPostEmpty,
    shouldShowComments,

    // delete post
    isDeleting,

    // comments
    comments: comments ?? [],
    isCommentsLoading: isCommentsLoading || isPostLoading,
    isCommentsError,
    errorCommentsTitle,
    errorCommentsMessage,

    // Handlers
    handleBack,
    handleDelete,
    handleEdit,
  };
};
