import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'lib-styleguide-simba/component.interfaces';
import type { ICommentVM } from '../../models';

export interface ICommentProps
  extends IWithRootProps<'div'>, ICommentVM, IWithLoading, IWithError, IWithEmpty {}
