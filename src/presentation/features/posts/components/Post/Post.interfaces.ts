import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'styleguide/component.interfaces';
import type { IPostVM } from '../../models/post';

export interface IPostProps
  extends IWithRootProps<'button'>, Partial<IPostVM>, IWithLoading, IWithError, IWithEmpty {
  isOptimistic?: boolean;
}
