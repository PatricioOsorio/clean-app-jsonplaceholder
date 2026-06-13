import { useParams, useNavigate } from 'react-router';
import { PostDetail } from '../../components/PostDetail';
import { usePost } from '../../hooks/use-post';

import './PostDetailPage.css';

export const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const numberId = id ? Number(id) : undefined;
  const { data: post, isLoading, isError } = usePost(numberId);
  const isEmpty = !isLoading && !isError && !post;

  return (
    <section className="post-detail-page">
      <PostDetail
        isEmpty={isEmpty}
        isError={isError}
        isLoading={isLoading}
        post={post}
        onBack={() => navigate('/posts')}
      />
    </section>
  );
};
