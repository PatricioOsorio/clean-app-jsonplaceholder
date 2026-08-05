import { StatusContent } from 'lib-styleguide-simba/status-content';
import { cn } from 'lib-styleguide-simba/utils';

import type { IHomeGalleryItemProps } from './home-gallery-item.interfaces';
import { HomeGalleryItemEmpty } from './empty/home-gallery-item-empty';
import { HomeGalleryItemError } from './error/home-gallery-item-error';
import { HomeGalleryItemSkeleton } from './skeleton/home-gallery-item-skeleton';
import { useState } from 'react';

const DEFAULT_IMAGE_URL = 'https://placehold.co/600x400?text=NO-IMAGE';

export const HomeGalleryItem = ({ item, rootProps, status = {} }: IHomeGalleryItemProps) => {
  const [imgSrc, setImgSrc] = useState(item?.url);

  return (
    <StatusContent
      {...status}
      loadingTemplate={<HomeGalleryItemSkeleton />}
      emptyTemplate={<HomeGalleryItemEmpty />}
      errorTemplate={<HomeGalleryItemError />}
    >
      {item && (
        <div {...rootProps} className={cn('hg__gallery-card', rootProps?.className)}>
          <img
            src={imgSrc}
            alt={item.title}
            className="hg__gallery-img"
            loading="lazy"
            onError={() => setImgSrc(DEFAULT_IMAGE_URL)}
          />
          <div className="hg__gallery-overlay">
            <span className="hg__gallery-title">{item.title}</span>
          </div>
        </div>
      )}
    </StatusContent>
  );
};

HomeGalleryItem.Skeleton = HomeGalleryItemSkeleton;
HomeGalleryItem.Empty = HomeGalleryItemEmpty;
HomeGalleryItem.Error = HomeGalleryItemError;
