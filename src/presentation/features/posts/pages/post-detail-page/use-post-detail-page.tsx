import type { ComponentProps } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useComment } from '@presentation/features/comments/hooks';
import type { CommentsList } from '@presentation/features/comments/components';
import { formatError } from '@presentation/utils';
import { PostDetail } from '../../components';
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

  const postDetailProps: ComponentProps<typeof PostDetail> = {
    post,
    isDeleting,
    isOptimistic: isDeleting,
    btnBackProps: { onClick: handleBack },
    btnEditProps: { onClick: handleEdit },
    btnDeleteProps: { onClick: handleDelete },
    status: {
      isLoading: isPostLoading,
      isError: isPostError,
      errorTitle: errorPostTitle,
      errorDescription: errorPostMessage,
      isEmpty: isPostEmpty,
    },
  };

  const commentsListProps: ComponentProps<typeof CommentsList> = {
    comments: comments ?? [],
    status: {
      isLoading: isCommentsLoading || isPostLoading,
      isError: isCommentsError,
      errorTitle: errorCommentsTitle,
      errorDescription: errorCommentsMessage,
    },
  };

  return {
    shouldShowComments,
    postDetailProps,
    commentsListProps,
  };
};
