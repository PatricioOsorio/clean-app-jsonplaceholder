import { IconAlertCircle } from 'lib-styleguide-simba/icons';

export const HomeGalleryItemError = () => {
  return (
    <div className="hg__gallery-card text-destructive border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center rounded-2xl border p-4 text-center">
      <IconAlertCircle className="mb-1 h-6 w-6" />
      <span className="text-[10px] font-medium">Failed to load</span>
    </div>
  );
};
