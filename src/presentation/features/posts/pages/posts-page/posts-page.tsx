import { Badge } from 'lib-styleguide-simba/badge';
import { IconArticle } from 'lib-styleguide-simba/icons';

import { Posts } from '../../components';
import { usePostsPage } from './use-posts-page';
import { PaginationCustom } from '@presentation/shared/components';

import './posts-page.css';

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
    totalPosts,
    handlePageChange,

    // components
    btnEditProps,
    btnDeleteProps,

    // handlers
    handlePostClick,
  } = usePostsPage();

  return (
    <div className="posts-page-container">
      <header className="ppc__header">
        <div className="ppc__header-text">
          <h1 className="ppc__title">Posts</h1>
          <p className="ppc__subtitle">
            Browse, edit and manage the posts synced from JSONPlaceholder.
          </p>
        </div>

        <div className="ppc__header-actions">
          <Badge className="ppc__count-pill" variant="primary">
            <span className="ppc__count-dot" />
            <span>{totalPosts} posts</span>
          </Badge>
        </div>
      </header>

      <section className="ppc__panel">
        <div className="ppc__panel-header">
          <div className="ppc__panel-title-group">
            <IconArticle className="ppc__panel-icon" />
            <h2 className="ppc__panel-title">All Posts</h2>
          </div>
        </div>

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
      </section>
    </div>
  );
};
