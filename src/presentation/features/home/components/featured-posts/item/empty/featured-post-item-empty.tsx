import { IconArticle } from 'lib-styleguide-simba/icons';

export const FeaturedPostItemEmpty = () => {
  return (
    <div className="fp__post-card fp__post-card--empty">
      <div className="text-muted-foreground flex items-center justify-center gap-2 py-4 text-xs">
        <IconArticle className="h-4 w-4" />
        <span>No post data available</span>
      </div>
    </div>
  );
};
