import { Skeleton } from 'lib-styleguide-simba/shadcn/skeleton';

export const FeaturedPostItemSkeleton = () => {
  return (
    <div className="fp__post-card fp__post-card--skeleton">
      <div className="fp__post-card-header">
        <Skeleton className="mb-2 h-5 w-3/4" />
        <Skeleton className="mb-1 h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="fp__post-footer">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
    </div>
  );
};
