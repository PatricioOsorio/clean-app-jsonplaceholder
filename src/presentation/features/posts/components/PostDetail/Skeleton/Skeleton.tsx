import { Skeleton } from '@presentation/shared/components/Skeleton';

import type { IPostDetailSkeletonProps } from './Skeleton.interfaces';
import './Skeleton.css';

export const PostDetailSkeleton = ({ items = 1, rootProps }: IPostDetailSkeletonProps) => {
  return (
    <>
      {Array.from({ length: items }).map((_, i) => (
        <div {...rootProps} key={`skeleton-${i}`} className="post-detail-skeleton-container">
          <Skeleton.Text className="h-10 w-5/6" />
          <Skeleton.Text className="w-1/3" />
          <Skeleton.Text className="w-full" />
          <Skeleton.Text className="w-full" />
          <Skeleton.Text className="w-3/4" />
        </div>
      ))}
    </>
  );
};
