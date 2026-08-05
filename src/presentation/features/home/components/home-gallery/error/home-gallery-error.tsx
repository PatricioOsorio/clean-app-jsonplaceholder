import { IconAlertCircle } from 'lib-styleguide-simba/icons';

export const HomeGalleryError = () => {
  return (
    <div className="text-destructive border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center rounded-2xl border p-8 text-center">
      <IconAlertCircle className="mb-2 h-8 w-8" />
      <p className="text-sm font-medium">Failed to load gallery</p>
    </div>
  );
};
