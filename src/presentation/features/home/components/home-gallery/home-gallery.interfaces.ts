import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'lib-styleguide-simba/interfaces';

export interface IHomeGalleryItemVM {
  id: number;
  title: string;
  url: string;
}

export interface IHomeGalleryProps extends IWithRootProps<'section'> {
  items?: IHomeGalleryItemVM[];
  status?: IWithLoading & IWithError & IWithEmpty;
}
