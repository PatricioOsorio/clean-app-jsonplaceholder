import type { IWithEmpty, IWithLoading, IWithRootProps } from 'styleguide/component.interfaces';
import type { IPostMV } from '../../models/post/post.mv';

export interface IPostsVM {
  posts?: IPostMV[];
}

export interface IPostsProps extends IWithRootProps<'section'>, IWithLoading, IWithEmpty, IPostsVM {
  onPostClick?: (id: number) => void;
}
