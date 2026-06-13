import { cn } from 'styleguide/utils';

import type { ISkeletonBoxProps, ISkeletonProps } from './Skeleton.interfaces';

import './Skeleton.css';

const SkeletonBox = ({
  shape,
  rootProps,
  animation = 'shimmer',
  count = 1,
  className,
}: ISkeletonBoxProps) => {
  const classNameComposition = cn(
    'skeleton-container',
    `skeleton-container--${shape}`,
    `skeleton-container--${animation}`,
    rootProps?.className,
    className,
  );

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div {...rootProps} key={`skeleton-${i}`} className={classNameComposition} />
      ))}
    </>
  );
};

const SkeletonText = (props: ISkeletonProps) => <SkeletonBox {...props} shape="text" />;
const SkeletonCircle = (props: ISkeletonProps) => <SkeletonBox {...props} shape="circle" />;
const SkeletonRect = (props: ISkeletonProps) => <SkeletonBox {...props} shape="rect" />;
const SkeletonButton = (props: ISkeletonProps) => <SkeletonBox {...props} shape="button" />;

export const Skeleton = {
  Text: SkeletonText,
  Circle: SkeletonCircle,
  Rect: SkeletonRect,
  Button: SkeletonButton,
};
