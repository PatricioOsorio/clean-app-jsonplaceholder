import type { IWithRootProps } from 'lib-styleguide-simba/interfaces';

export interface IHomeCtaBannerProps extends IWithRootProps<'section'> {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
}
