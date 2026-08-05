import { Badge } from 'lib-styleguide-simba/badge';
import { IconArticle } from 'lib-styleguide-simba/icons';
import { StatusContent } from 'lib-styleguide-simba/status-content';
import { cn } from 'lib-styleguide-simba/utils';

import type { IFeaturedPostsProps } from './featured-posts.interfaces';
import { FeaturedPostItem } from './item/featured-post-item';
import { FeaturedPostsSkeleton } from './skeleton/featured-posts-skeleton';
import { FeaturedPostsEmpty } from './empty/featured-posts-empty';
import { FeaturedPostsError } from './error/featured-posts-error';
import './featured-posts.css';

export const FeaturedPosts = ({ posts, rootProps, status = {} }: IFeaturedPostsProps) => {
  return (
    <section {...rootProps} className={cn('featured-posts-container', rootProps?.className)}>
      <div className="fp__section-header">
        <div className="fp__section-title-group">
          <IconArticle className="fp__section-icon" />
          <h2 className="fp__section-title">Featured Posts</h2>
        </div>
        <Badge className="fp__live-badge">Live Feed</Badge>
      </div>

      <StatusContent
        {...status}
        loadingTemplate={<FeaturedPostsSkeleton />}
        emptyTemplate={<FeaturedPostsEmpty />}
        errorTemplate={<FeaturedPostsError />}
      >
        <div className="fp__posts-grid">
          {posts?.map((post) => (
            <FeaturedPostItem key={post.id} post={post} />
          ))}
        </div>
      </StatusContent>
    </section>
  );
};

FeaturedPosts.Skeleton = FeaturedPostsSkeleton;
FeaturedPosts.Empty = FeaturedPostsEmpty;
FeaturedPosts.Error = FeaturedPostsError;
FeaturedPosts.Item = FeaturedPostItem;
