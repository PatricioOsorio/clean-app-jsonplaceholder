import { PostDetail } from '../../components';
import { usePostDetailPage } from './use-post-detail-page';
import { CommentsList } from '@presentation/features/comments/components';
import './post-detail-page.css';

export const PostDetailPage = () => {
  const { shouldShowComments, postDetailProps, commentsListProps } = usePostDetailPage();

  return (
    <section className="post-detail-page">
      <PostDetail {...postDetailProps} />
      {shouldShowComments && <CommentsList {...commentsListProps} />}
    </section>
  );
};
