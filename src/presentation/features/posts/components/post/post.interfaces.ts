import type { IButtonWithCustomOnClick, IWithRootProps } from 'lib-styleguide-simba/interfaces';

import type { IPostVM } from '../../models/post';

export interface IPostProps extends IWithRootProps<'article'> {
  post: IPostVM;
  isOptimistic?: boolean;
  btnEditProps?: IButtonWithCustomOnClick<IPostVM>;
  btnDeleteProps?: IButtonWithCustomOnClick<number>;
}
