import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'styleguide/component.interfaces';
import type { IPostVM } from '../../models/post';

export interface IPostDetailVM {
  post?: IPostVM;
}

export interface IPostDetailProps
  extends IWithRootProps<'article'>, IWithLoading, IWithError, IWithEmpty, IPostDetailVM {
  onBack?: () => void;
}
