import { cn } from 'styleguide/utils';

import type { IPostEmptyProps } from './Empty.interfaces';
import './Empty.css';

export const PostEmpty = ({ rootProps }: IPostEmptyProps) => {
  return (
    <article {...rootProps} className={cn('post-empty-container', rootProps?.className)}>
      <h3 className="pec__title">No publications found</h3>
      <p className="pec__desc">Check back later or try fetching the posts again.</p>
    </article>
  );
};
