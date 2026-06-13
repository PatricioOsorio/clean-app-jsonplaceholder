import type { IWithEmpty, IWithLoading, IWithRootProps } from 'styleguide/component.interfaces';
import type { IPostMV } from '../../models/post';

export interface IPostProps
  extends IWithRootProps<'article'>, IWithLoading, IWithEmpty, Partial<IPostMV> {}
