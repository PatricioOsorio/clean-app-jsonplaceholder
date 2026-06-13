import type { IWithEmpty, IWithLoading, IWithRootProps } from 'styleguide/component.interfaces';
import type { IPostMV } from '../../models/post/post.mv';

export interface IPostProps
  extends IWithRootProps<'article'>, IWithLoading, IWithEmpty, Partial<IPostMV> {}
