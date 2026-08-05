import { IconPhoto } from 'lib-styleguide-simba/icons';

export const HomeGalleryItemEmpty = () => {
  return (
    <div className="hg__gallery-card text-muted-foreground flex flex-col items-center justify-center rounded-2xl border border-dashed p-4 text-center">
      <IconPhoto className="mb-1 h-6 w-6 opacity-50" />
      <span className="text-[10px] font-medium">No image</span>
    </div>
  );
};
