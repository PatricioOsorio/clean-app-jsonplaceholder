import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'lib-styleguide-simba/interfaces';
import type { IPostVM } from '../../models/post';
import type { IPostProps } from '../post/post.interfaces';

export interface IPostsVM {
  posts?: IPostVM[];
}

export interface IPostsProps extends IWithRootProps<'section'>, IPostsVM {
  onPostClick?: (id: number) => void;
  postProps: Partial<IPostProps>;
  status?: IWithLoading & IWithError & IWithEmpty;
}
