import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'lib-styleguide-simba/interfaces';

import type { IHomeGalleryItemVM } from '../home-gallery.interfaces';

export interface IHomeGalleryItemProps extends IWithRootProps<'div'> {
  item?: IHomeGalleryItemVM;
  status?: IWithLoading & IWithError & IWithEmpty;
}
