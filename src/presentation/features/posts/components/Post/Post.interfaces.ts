import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';
import type { IPostVM } from '../../models/post';

export interface IPostProps extends IWithRootProps<'article'> {
  post: IPostVM;
  isOptimistic?: boolean;
  onEdit?: (post: IPostVM, e: React.MouseEvent) => void;
  onDelete?: (id: number, e: React.MouseEvent) => void;
}
