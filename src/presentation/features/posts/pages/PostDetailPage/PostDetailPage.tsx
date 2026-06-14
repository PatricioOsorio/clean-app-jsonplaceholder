import { useParams, useNavigate } from 'react-router';
import { PostDetail } from '../../components/PostDetail';
import { usePost } from '../../hooks/use-post';

import './PostDetailPage.css';
import { formatError } from '@presentation/utils/error-formatter';

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
        isEmpty={isEmpty}
        isError={isError}
        isLoading={isLoading}
        post={post}
        onBack={() => navigate('/posts')}
        errorTitle={errorTitle}
        errorDescription={errorMessage}
      />
    </section>
  );
};
