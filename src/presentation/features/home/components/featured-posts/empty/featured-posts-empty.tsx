import { IconArticle } from 'lib-styleguide-simba/icons';

export const FeaturedPostsEmpty = () => {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center">
      <IconArticle className="mb-2 h-8 w-8 opacity-50" />
      <p className="text-sm font-medium">No featured posts available</p>
    </div>
  );
};
