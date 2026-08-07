import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'lib-styleguide-simba/interfaces';

import type { IPostProps } from '../post/post.interfaces';

export interface IPostsProps extends IWithRootProps<'section'> {
  items?: IPostProps[];
  status?: IWithLoading & IWithError & IWithEmpty;
}
