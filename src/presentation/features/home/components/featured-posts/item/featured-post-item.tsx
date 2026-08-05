import { Link } from 'react-router';
import { IconArrowRight } from 'lib-styleguide-simba/icons';
import { StatusContent } from 'lib-styleguide-simba/status-content';
import { cn } from 'lib-styleguide-simba/utils';

import type { IFeaturedPostItemProps } from './featured-post-item.interfaces';
import { FeaturedPostItemEmpty } from './empty/featured-post-item-empty';
import { FeaturedPostItemError } from './error/featured-post-item-error';
import { FeaturedPostItemSkeleton } from './skeleton/featured-post-item-skeleton';

export const FeaturedPostItem = ({ post, rootProps, status = {} }: IFeaturedPostItemProps) => {
  return (
    <StatusContent
      {...status}
      loadingTemplate={<FeaturedPostItemSkeleton />}
      emptyTemplate={<FeaturedPostItemEmpty />}
      errorTemplate={<FeaturedPostItemError />}
    >
      {post && (
        <Link to="/posts" {...rootProps} className={cn('fp__post-card', rootProps?.className)}>
          <div className="fp__post-card-header">
            <h3 className="fp__post-title">{post.title}</h3>
            <p className="fp__post-body">{post.body}</p>
          </div>

          <div className="fp__post-footer">
            <span className="fp__post-author">{post.user}</span>
            <IconArrowRight className="fp__post-arrow" />
          </div>
        </Link>
      )}
    </StatusContent>
  );
};

FeaturedPostItem.Skeleton = FeaturedPostItemSkeleton;
FeaturedPostItem.Empty = FeaturedPostItemEmpty;
FeaturedPostItem.Error = FeaturedPostItemError;
