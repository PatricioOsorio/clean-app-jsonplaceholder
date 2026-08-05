import { IconPhoto } from 'lib-styleguide-simba/icons';
import { StatusContent } from 'lib-styleguide-simba/status-content';
import { cn } from 'lib-styleguide-simba/utils';

import type { IHomeGalleryProps } from './home-gallery.interfaces';
import { HomeGalleryItem } from './item/home-gallery-item';
import { HomeGallerySkeleton } from './skeleton/home-gallery-skeleton';
import { HomeGalleryEmpty } from './empty/home-gallery-empty';
import { HomeGalleryError } from './error/home-gallery-error';
import './home-gallery.css';

export const HomeGallery = ({ items, rootProps, status = {} }: IHomeGalleryProps) => {
  return (
    <section {...rootProps} className={cn('home-gallery-container', rootProps?.className)}>
      <div className="hg__section-header">
        <div className="hg__section-title-group">
          <IconPhoto className="hg__section-icon" />
          <h2 className="hg__section-title">Gallery</h2>
        </div>
      </div>

      <StatusContent
        {...status}
        loadingTemplate={<HomeGallerySkeleton />}
        emptyTemplate={<HomeGalleryEmpty />}
        errorTemplate={<HomeGalleryError />}
      >
        <div className="hg__gallery-grid">
          {items?.map((item) => (
            <HomeGalleryItem key={item.id} item={item} />
          ))}
        </div>
      </StatusContent>
    </section>
  );
};

HomeGallery.Skeleton = HomeGallerySkeleton;
HomeGallery.Empty = HomeGalleryEmpty;
HomeGallery.Error = HomeGalleryError;
HomeGallery.Item = HomeGalleryItem;
