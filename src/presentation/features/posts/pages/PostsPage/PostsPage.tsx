import { Posts } from '../../components';
import { usePostsPage } from './usePostsPage';

import './PostsPage.css';

export const PostsPage = () => {
  const {
    // props
    posts,
    isLoading,
    isError,
    errorTitle,
    errorMessage,
    isEmpty,

    // handlers
    handlePostClick,
    handleEdit,
    handleDelete,
  } = usePostsPage();
  
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
          postProps={{
            onEdit: handleEdit,
            onDelete: handleDelete,
          }}
          posts={posts}
          onPostClick={handlePostClick}
        />
      </div>
    </section>
  );
};
