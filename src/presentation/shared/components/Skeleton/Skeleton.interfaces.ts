import type { IWithRootProps } from 'lib-styleguide-simba/component.interfaces';

export type ISkeletonShape = 'text' | 'circle' | 'rect' | 'button';
export type ISkeletonAnimation = 'shimmer' | 'pulse';

export interface ISkeletonProps extends IWithRootProps<'div'> {
  className?: string;
  animation?: ISkeletonAnimation;
  count?: number;
}

export interface ISkeletonBoxProps extends ISkeletonProps {
  shape: ISkeletonShape;
}
