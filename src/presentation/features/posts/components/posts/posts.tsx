import { cn } from 'lib-styleguide-simba/utils';
import { StatusContent } from 'lib-styleguide-simba/status-content';

import type { IPostsProps } from './posts.interfaces';

import { Empty, Error } from '@presentation/shared/components';
import { Post } from '../post';
import { PostsSkeleton } from './skeleton';
import './posts.css';

export const Posts = ({ rootProps, items, status = {} }: IPostsProps) => (
  <section {...rootProps} className={cn('posts-container', rootProps?.className)}>
    <StatusContent
      {...status}
      emptyTemplate={
        <Empty
          description="Check back later or try fetching the posts again."
          title="No publications found"
        />
      }
      errorTemplate={<Error description={status.errorDescription} title={status.errorTitle} />}
      loadingTemplate={status.loadingTemplate ?? <PostsSkeleton />}
    >
      <div className="pc__grid">
        {items?.map((item) => (
          <Post key={item.post.id} {...item} />
        ))}
      </div>
    </StatusContent>
  </section>
);

Posts.Skeleton = PostsSkeleton;
