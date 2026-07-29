import { cn } from 'lib-styleguide-simba/utils';

import type { IEmptyProps } from './empty.interfaces';

import './empty.css';

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
      <span className="ec__eyebrow">No content</span>
      <h3 className="ec__title">{title}</h3>
      <p className="ec__desc">{description}</p>
      {children && <div className="ec__actions">{children}</div>}
    </div>
  );
};
