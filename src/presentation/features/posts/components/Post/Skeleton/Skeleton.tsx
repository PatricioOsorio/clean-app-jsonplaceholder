import type { IPostSkeletonProps } from './Skeleton.interfaces';
import './Skeleton.css';

export const PostSkeleton = ({ items = 6, rootProps }: IPostSkeletonProps) => {
  return (
    <>
      {Array.from({ length: items }).map((_, i) => (
        <article {...rootProps} key={`skeleton-${i}`} className="post-skeleton-container">
          <div className="psc__title" />
          <div className="psc__line psc__line--full" />
          <div className="psc__line psc__line--partial" />
          <div className="psc__footer">
            <div className="psc__badge psc__badge--sm" />
            <div className="psc__badge psc__badge--xs" />
          </div>
        </article>
      ))}
    </>
  );
};
