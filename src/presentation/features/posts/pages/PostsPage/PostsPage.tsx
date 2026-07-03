import { Posts } from '../../components';
import { usePostsPage } from './usePostsPage';

import './PostsPage.css';
import { Pagination } from '@presentation/shared/components';

export const PostsPage = () => {
  const {
    // props
    posts,
    isLoading,
    isError,
    errorTitle,
    errorMessage,
    isEmpty,

    // paginator
    page,
    totalPages,
    handlePageChange,

    // constants
    TITLE,
    SUBTITLE,

    // handlers
    handlePostClick,
    handleEdit,
    handleDelete,
  } = usePostsPage();

  return (
    <section className="posts-page-container">
      <header className="ppc__header">
        <p className="ppc__system-tag">[ System // Data // Posts ]</p>
        <h1 className="ppc__title">{TITLE}</h1>
        <p className="ppc__subtitle">{SUBTITLE}</p>
      </header>

      <div className="ppc__content">
        <Posts
          status={{
            errorDescription: errorMessage,
            errorTitle,
            isEmpty,
            isError,
            isLoading,
          }}
          postProps={{
            onEdit: handleEdit,
            onDelete: handleDelete,
          }}
          posts={posts}
          onPostClick={handlePostClick}
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          siblingCount={5}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};
