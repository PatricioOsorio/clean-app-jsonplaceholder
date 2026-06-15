import { Skeleton } from '@presentation/shared/components';

import type { IPostFormSkeletonProps } from './Skeleton.interfaces';
import './Skeleton.css';

export const PostFormSkeleton = ({ rootProps }: IPostFormSkeletonProps) => {
  return (
    <div {...rootProps} className="post-form-skeleton-container">
      <div className="pfsc__field">
        <Skeleton.Text className="h-4 w-16" />
        <Skeleton.Text className="h-10 w-full" />
      </div>

      <div className="pfsc__field">
        <Skeleton.Text className="h-4 w-20" />
        <Skeleton.Text className="h-32 w-full" />
      </div>

      <div className="pfsc__actions">
        <Skeleton.Text className="h-10 w-24" />
        <Skeleton.Text className="h-10 w-24" />
      </div>
    </div>
  );
};
