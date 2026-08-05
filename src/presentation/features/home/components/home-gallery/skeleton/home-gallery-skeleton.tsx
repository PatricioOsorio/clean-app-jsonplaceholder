import { Skeleton } from 'lib-styleguide-simba/shadcn/skeleton';

export const HomeGallerySkeleton = () => {
  return (
    <div className="hg__gallery-grid">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={`hg-skeleton-${index}`}
          className="hg__gallery-card aspect-square rounded-2xl"
        />
      ))}
    </div>
  );
};
