import type { IWithChildren, IWithRootProps } from 'lib-styleguide-simba/interfaces';

export interface IAuthCardProps extends IWithRootProps<'article'>, IWithChildren {
  title: string;
  subtitle: string;
}
