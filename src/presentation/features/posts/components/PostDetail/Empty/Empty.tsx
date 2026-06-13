import { cn } from 'styleguide/utils';

import type { IPostDetailEmptyProps } from './Empty.interfaces';
import './Empty.css';

export const PostDetailEmpty = ({ rootProps }: IPostDetailEmptyProps) => {
  return (
    <div {...rootProps} className={cn('post-detail-empty-container', rootProps?.className)}>
      <h3 className="pdec__title">Publication not found</h3>
      <p className="pdec__desc">
        The requested publication might have been deleted or does not exist.
      </p>
    </div>
  );
};
