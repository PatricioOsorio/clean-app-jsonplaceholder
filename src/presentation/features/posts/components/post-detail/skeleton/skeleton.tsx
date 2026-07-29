import { Skeleton } from '@presentation/shared/components';

import type { IPostDetailSkeletonProps } from './skeleton.interfaces';
import './skeleton.css';

export const PostDetailSkeleton = ({ items = 1, rootProps }: IPostDetailSkeletonProps) => {
  return (
    <div {...rootProps} className="post-detail-skeleton-container">
      {Array.from({ length: items }).map((_, i) => (
        <div key={`skeleton-${i}`} className="pdsc__item">
          <Skeleton.Text className="h-10 w-5/6" />
          <Skeleton.Text className="w-1/3" />
          <Skeleton.Text className="w-full" />
          <Skeleton.Text className="w-full" />
          <Skeleton.Text className="w-3/4" />
        </div>
      ))}
    </div>
  );
};
