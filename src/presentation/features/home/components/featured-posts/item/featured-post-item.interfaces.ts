import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'lib-styleguide-simba/interfaces';
import type { IFeaturedPostVM } from '../featured-posts.interfaces';

export interface IFeaturedPostItemProps extends IWithRootProps<'a'> {
  post?: IFeaturedPostVM;
  status?: IWithLoading & IWithError & IWithEmpty;
}
