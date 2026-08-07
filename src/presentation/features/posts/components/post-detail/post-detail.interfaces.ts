import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
  IButtonWithCustomOnClick,
} from 'lib-styleguide-simba/interfaces';
import type { IPostVM } from '../../models/post';
import type { IButtonProps } from 'lib-styleguide-simba/button';

export interface IPostDetailVM {
  post?: IPostVM;
  isOptimistic?: boolean;
}

export interface IPostDetailProps extends IWithRootProps<'article'>, IPostDetailVM {
  btnBackProps?: IButtonProps;
  btnEditProps?: IButtonWithCustomOnClick<IPostVM>;
  btnDeleteProps?: IButtonWithCustomOnClick<number>;

  isDeleting?: boolean;
  status?: IWithLoading & IWithError & IWithEmpty;
}
