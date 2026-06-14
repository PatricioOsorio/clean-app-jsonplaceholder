import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'styleguide/component.interfaces';
import type { IPostMV } from '../../models/post';

export interface IPostProps
  extends IWithRootProps<'button'>, Partial<IPostMV>, IWithLoading, IWithError, IWithEmpty {}
