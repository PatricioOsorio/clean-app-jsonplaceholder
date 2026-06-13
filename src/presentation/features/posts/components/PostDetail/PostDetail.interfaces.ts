import type { IWithLoading, IWithRootProps } from 'styleguide/component.interfaces';
import type { IPostMV } from '../../models/post';

export interface IPostDetailVM {
  post?: IPostMV;
}

export interface IPostDetailProps extends IWithRootProps<'article'>, IWithLoading, IPostDetailVM {
  onBack?: () => void;
  isEmpty?: boolean;
}
