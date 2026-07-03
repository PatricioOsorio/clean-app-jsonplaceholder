import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'lib-styleguide-simba/component.interfaces';
import type { IPostVM } from '../../models/post';

export interface IPostProps extends IWithRootProps<'article'> {
  post: Pick<IPostVM, 'id' | 'title' | 'content' | 'idUser'>;
  isOptimistic?: boolean;
  onEdit?: (post: IPostVM, e: React.MouseEvent) => void;
  onDelete?: (id: number, e: React.MouseEvent) => void;
  status?: IWithLoading & IWithError & IWithEmpty;
}
