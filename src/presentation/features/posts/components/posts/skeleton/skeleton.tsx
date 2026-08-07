import { cn } from 'lib-styleguide-simba/utils';

import type { IPostsSkeletonProps } from './skeleton.interfaces';

import { PostSkeleton } from '../../post/skeleton/skeleton';
import './skeleton.css';

export const PostsSkeleton = ({ items = 6, rootProps }: IPostsSkeletonProps) => {
  return (
    <div {...rootProps} className={cn('posts-skeleton-container', rootProps?.className)}>
      <PostSkeleton items={items} />
    </div>
  );
};
