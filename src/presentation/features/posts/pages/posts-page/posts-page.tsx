import { Badge } from 'lib-styleguide-simba/badge';

import { PaginationCustom } from '@presentation/shared/components';
import { Posts } from '../../components';
import { usePostsPage } from './use-posts-page';
import './posts-page.css';

export const PostsPage = () => {
  const { totalPosts, postsProps, paginationProps } = usePostsPage();

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
        <Posts {...postsProps} />
        <PaginationCustom {...paginationProps} />
      </section>
    </div>
  );
};
