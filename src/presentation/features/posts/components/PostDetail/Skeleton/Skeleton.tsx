import type { IPostDetailSkeletonProps } from './Skeleton.interfaces';
import './Skeleton.css';

export const PostDetailSkeleton = ({ items = 1, rootProps }: IPostDetailSkeletonProps) => {
  return (
    <>
      {Array.from({ length: items }).map((_, i) => (
        <div {...rootProps} key={`skeleton-${i}`} className="post-detail-skeleton-container">
          <div className="pdsc__title" />
          <div className="pdsc__meta" />
          <div className="pdsc__line pdsc__line--full" />
          <div className="pdsc__line pdsc__line--full" />
          <div className="pdsc__line pdsc__line--partial" />
        </div>
      ))}
    </>
  );
};
