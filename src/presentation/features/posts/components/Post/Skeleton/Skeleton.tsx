import { Skeleton } from '@presentation/shared/components';

import type { IPostSkeletonProps } from './Skeleton.interfaces';
import './Skeleton.css';

export const PostSkeleton = ({ items = 6, rootProps }: IPostSkeletonProps) => {
  return (
    <div {...rootProps} className="post-skeleton-container">
      {Array.from({ length: items }).map((_, i) => (
        <article key={`skeleton-${i}`} className="psc__item">
          <Skeleton.Text className="h-6 w-3/4" />
          <Skeleton.Text className="w-full" />
          <Skeleton.Text className="w-5/6" />

          <div className="psc__footer">
            <Skeleton.Text className="w-16" />
            <Skeleton.Text className="w-10" />
          </div>
        </article>
      ))}
    </div>
  );
};
