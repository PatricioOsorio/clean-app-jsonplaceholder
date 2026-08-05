import { IconArticle } from 'lib-styleguide-simba/icons';

export const FeaturedPostsError = () => {
  return (
    <div className="text-destructive border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center rounded-2xl border p-8 text-center">
      <IconArticle className="mb-2 h-8 w-8 opacity-80" />
      <p className="text-sm font-medium">Failed to load featured posts</p>
    </div>
  );
};
