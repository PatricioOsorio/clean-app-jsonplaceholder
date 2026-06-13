import { cn } from 'styleguide/utils';

import type { IEmptyProps } from './Empty.interfaces';

import './Empty.css';

export const Empty = ({
  rootProps,
  icon,
  title = 'Nothing here yet',
  description = "There's no content to display right now.",
  children,
}: IEmptyProps) => {
  return (
    <div {...rootProps} className={cn('empty-container', rootProps?.className)}>
      {icon && <div className="ec__icon">{icon}</div>}
      <h3 className="ec__title">{title}</h3>
      <p className="ec__desc">{description}</p>
      {children && <div className="ec__actions">{children}</div>}
    </div>
  );
};
