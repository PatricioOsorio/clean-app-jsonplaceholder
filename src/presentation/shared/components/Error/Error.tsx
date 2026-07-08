import { cn } from 'lib-styleguide-simba/utils';

import type { IErrorProps } from './Error.interfaces';

import './Error.css';

export const Error = ({
  rootProps,
  icon,
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again later.',
  children,
}: IErrorProps) => {
  return (
    <div {...rootProps} className={cn('error-container', rootProps?.className)}>
      {icon && <div className="ec__icon">{icon}</div>}
      <span className="ec__eyebrow">Error</span>
      <h3 className="ec__title">{title}</h3>
      <p className="ec__desc">{description}</p>
      {children && <div className="ec__actions">{children}</div>}
    </div>
  );
};
