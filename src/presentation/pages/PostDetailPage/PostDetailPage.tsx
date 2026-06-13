import { useParams, useNavigate } from 'react-router';
import { usePost } from '@/presentation/hooks/posts/use-post';
import { PostDetail } from '@/presentation/components/PostDetail';

import './PostDetailPage.css';

export const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const numberId = id ? Number(id) : undefined;
  const { data: post, isLoading, isError } = usePost(numberId);
  const isEmpty = isError || (!isLoading && !post);

  return (
    <section className="post-detail-page">
      <PostDetail
        isEmpty={isEmpty}
        isLoading={isLoading}
        post={post}
        onBack={() => navigate('/posts')}
      />
    </section>
  );
};
