import { IconPhoto } from 'lib-styleguide-simba/icons';
import { cn } from 'lib-styleguide-simba/utils';

import type { IHomeGalleryProps } from './home-gallery.interfaces';
import './home-gallery.css';

export const HomeGallery = ({ items, rootProps }: IHomeGalleryProps) => {
  return (
    <section {...rootProps} className={cn('home-gallery-container', rootProps?.className)}>
      <div className="hg__section-header">
        <div className="hg__section-title-group">
          <IconPhoto className="hg__section-icon" />
          <h2 className="hg__section-title">Gallery</h2>
        </div>
      </div>

      <div className="hg__gallery-grid">
        {items.map((item) => (
          <div key={item.id} className="hg__gallery-card">
            <img src={item.url} alt={item.title} className="hg__gallery-img" loading="lazy" />
            <div className="hg__gallery-overlay">
              <span className="hg__gallery-title">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
