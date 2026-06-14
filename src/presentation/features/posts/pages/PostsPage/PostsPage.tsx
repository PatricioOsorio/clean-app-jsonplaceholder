import { useNavigate } from 'react-router';

import { usePosts } from '../../hooks';
import { Posts } from '../../components';
import { formatError } from '@presentation/utils';

import './PostsPage.css';

export const PostsPage = () => {
  const navigate = useNavigate();

  const { data: posts, isLoading, isError, error } = usePosts();
  const isEmpty = !isLoading && !isError && !posts?.length;

  const { errorTitle, errorMessage } = formatError(error, 'Error Loading Posts');

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <section className="posts-page-container">
      <header className="ppc__header">
        <p className="ppc__system-tag">[ System // Data // Posts ]</p>
        <h1 className="ppc__title">SYSTEM POSTS</h1>
        <p className="ppc__subtitle">
          Data fetched via TanStack Query + Clean Architecture Use Cases.
        </p>
      </header>

      <div className="ppc__content">
        <Posts
          errorDescription={errorMessage}
          errorTitle={errorTitle}
          isEmpty={isEmpty}
          isError={isError}
          isLoading={isLoading}
          posts={posts}
          onPostClick={handlePostClick}
        />
      </div>
    </section>
  );
};
