import { Posts } from '../../components';
import { usePostsPage } from './use-posts-page';

import './posts-page.css';
import { PaginationCustom } from '@presentation/shared/components';

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

    // components
    btnEditProps,
    btnDeleteProps,

    // handlers
    handlePostClick,
  } = usePostsPage();

  return (
    <section className="posts-page-container">
      <header className="ppc__header">
        <p className="ppc__system-tag">Publications</p>
        <h1 className="ppc__title">SYSTEM POSTS</h1>
        <p className="ppc__subtitle">
          Data fetched via TanStack Query + Clean Architecture Use Cases.
        </p>
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
            btnEditProps,
            btnDeleteProps,
          }}
          posts={posts}
          onPostClick={handlePostClick}
        />

        <PaginationCustom
          page={page}
          totalPages={totalPages}
          siblingCount={5}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};
