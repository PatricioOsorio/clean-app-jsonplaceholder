import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'lib-styleguide-simba/interfaces';
import type { IPostVM } from '../../models/post';

export interface IPostDetailVM {
  post?: IPostVM;
  isOptimistic?: boolean;
}

export interface IPostDetailProps extends IWithRootProps<'article'>, IPostDetailVM {
  onBack?: () => void;
  onEdit?: (post: IPostVM, e: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (id: number, e: React.MouseEvent<HTMLButtonElement>) => void;

  isDeleting?: boolean;
  status?: IWithLoading & IWithError & IWithEmpty;
}
