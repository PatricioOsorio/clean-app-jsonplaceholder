import { useParams, useNavigate } from 'react-router';

import { PostDetail } from '../../components';
import { usePost } from '../../hooks';
import { formatError } from '@presentation/utils';

import './PostDetailPage.css';

export const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const numberId = id ? Number(id) : undefined;
  const { data: post, isLoading, isError, error } = usePost(numberId);
  const isEmpty = !isLoading && !isError && !post;

  const { errorTitle, errorMessage } = formatError(error, 'Error Loading Post');

  return (
    <section className="post-detail-page">
      <PostDetail
        errorDescription={errorMessage}
        errorTitle={errorTitle}
        isEmpty={isEmpty}
        isError={isError}
        isLoading={isLoading}
        post={post}
        onBack={() => navigate('/posts')}
      />
    </section>
  );
};
