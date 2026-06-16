import { useParams, useNavigate } from 'react-router-dom';

import { formatError } from '@presentation/utils';
import { useDeletePost, usePost } from '../../hooks';

export const usePostDetailPage = () => {
  const { id: idPostParam } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const idPost = idPostParam ? Number(idPostParam) : undefined;
  const { data: post, isLoading, isError, error } = usePost(idPost);
  const isEmpty = !isLoading && !isError && !post;

  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  const { errorTitle, errorMessage } = formatError(error, 'Error Loading Post');

  // handlers
  const handleBack = () => {
    navigate('/posts');
  };

  const handleDelete = () => {
    if (!idPost) return;
    deletePost(idPost, {
      onSuccess: () => {
        navigate('/posts');
      },
    });
  };

  const handleEdit = () => {
    navigate(`/posts/edit/${idPost}`);
  };

  return {
    // props
    post,
    isLoading,
    isError,
    errorTitle,
    errorMessage,
    isEmpty,
    isDeleting,

    // handlers
    handleBack,
    handleDelete,
    handleEdit,
  };
};
