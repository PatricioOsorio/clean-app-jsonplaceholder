import { IconArticle } from 'lib-styleguide-simba/icons';

export const FeaturedPostItemError = () => {
  return (
    <div className="fp__post-card fp__post-card--error">
      <div className="text-destructive flex items-center justify-center gap-2 py-4 text-xs">
        <IconArticle className="h-4 w-4" />
        <span>Failed to load post</span>
      </div>
    </div>
  );
};
