import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'lib-styleguide-simba/component.interfaces';
import type { IPostVM } from '../../models/post';

type IPostVMLocal = Pick<IPostVM, 'id' | 'title' | 'content' | 'idUser'>;

export interface IPostProps
  extends IWithRootProps<'article'>, IPostVMLocal, IWithLoading, IWithError, IWithEmpty {
  isOptimistic?: boolean;
  onEdit?: (post: IPostVM, e: React.MouseEvent) => void;
  onDelete?: (id: number, e: React.MouseEvent) => void;
}
