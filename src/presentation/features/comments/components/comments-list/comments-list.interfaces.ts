import type { ICommentVM } from '@presentation/features/comments/models';
import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'lib-styleguide-simba/interfaces';

export interface ICommentListVM {
  comments: ICommentVM[];
}

export interface ICommentsListProps extends IWithRootProps, ICommentListVM {
  status?: IWithLoading & IWithError & IWithEmpty;
}
