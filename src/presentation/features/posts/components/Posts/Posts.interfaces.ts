import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'styleguide/component.interfaces';
import type { IPostVM } from '../../models/post';

export interface IPostsVM {
  posts?: IPostVM[];
}

export interface IPostsProps
  extends IWithRootProps<'section'>, IWithLoading, IWithError, IWithEmpty, IPostsVM {
  onPostClick?: (id: number) => void;
}
