import type { IButtonProps } from 'lib-styleguide-simba/button';
import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';

export interface IHomeCtaBannerProps extends IWithRootProps<'section'> {
  title: string;
  subtitle: string;
  btnActionProps: IButtonProps;
}
