import type {
  IWithEmpty,
  IWithError,
  IWithLoading,
  IWithRootProps,
} from 'lib-styleguide-simba/interfaces';

export interface IFeaturedPostVM {
  id: number;
  title: string;
  body: string;
  user: string;
}

export interface IFeaturedPostsProps extends IWithRootProps<'section'> {
  posts?: IFeaturedPostVM[];
  status?: IWithLoading & IWithError & IWithEmpty;
}
