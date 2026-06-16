import { useParams, useNavigate } from 'react-router-dom';

import { formatError } from '@presentation/utils';
import { usePost } from '../../hooks';

export const usePostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const numberId = id ? Number(id) : undefined;
  const { data: post, isLoading, isError, error } = usePost(numberId);
  const isEmpty = !isLoading && !isError && !post;

  const { errorTitle, errorMessage } = formatError(error, 'Error Loading Post');

  // handlers
  const handleBack = () => {
    navigate('/posts');
  };

  return {
    // props
    post,
    isLoading,
    isError,
    errorTitle,
    errorMessage,
    isEmpty,

    // handlers
    handleBack,
  };
};
