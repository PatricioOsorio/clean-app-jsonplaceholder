import { Link } from 'react-router';
import { Badge } from 'lib-styleguide-simba/badge';
import { IconArticle, IconArrowRight } from 'lib-styleguide-simba/icons';
import { cn } from 'lib-styleguide-simba/utils';

import type { IFeaturedPostsProps } from './featured-posts.interfaces';
import './featured-posts.css';

export const FeaturedPosts = ({ posts, rootProps }: IFeaturedPostsProps) => {
  return (
    <section {...rootProps} className={cn('featured-posts-container', rootProps?.className)}>
      <div className="fp__section-header">
        <div className="fp__section-title-group">
          <IconArticle className="fp__section-icon" />
          <h2 className="fp__section-title">Featured Posts</h2>
        </div>
        <Badge className="fp__live-badge">Live Feed</Badge>
      </div>

      <div className="fp__posts-grid">
        {posts.map((post) => (
          <Link key={post.id} to="/posts" className="fp__post-card">
            <div className="fp__post-card-header">
              <h3 className="fp__post-title">{post.title}</h3>
              <p className="fp__post-body">{post.body}</p>
            </div>

            <div className="fp__post-footer">
              <span className="fp__post-author">{post.user}</span>
              <IconArrowRight className="fp__post-arrow" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
