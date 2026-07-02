import { Skeleton } from '@presentation/shared/components';

import type { ICommentSkeletonProps } from './Skeleton.interfaces';
import './Skeleton.css';

export const CommentSkeleton = ({ items = 3, rootProps }: ICommentSkeletonProps) => {
  return (
    <div {...rootProps} className="comment-skeleton-container">
      {Array.from({ length: items }).map((_, i) => (
        <div key={`comment-skeleton-${i}`} className="csc__item">
          <div className="csc__header">
            <Skeleton.Text className="csc__avatar-placeholder h-10 w-10 rounded-full" />
            <div className="csc__meta">
              <Skeleton.Text className="h-4 w-32" />
              <Skeleton.Text className="h-3 w-40" />
            </div>
          </div>
          <div className="csc__body">
            <Skeleton.Text className="w-full" />
            <Skeleton.Text className="w-11/12" />
            <Skeleton.Text className="w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
};
