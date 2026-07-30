import { cn } from 'lib-styleguide-simba/utils';
import { StatusContent } from 'lib-styleguide-simba/status-content';

import type { IPostsProps } from './posts.interfaces';

import { Empty, Error } from '@presentation/shared/components';
import { Post } from '../post';
import './posts.css';

export const Posts = ({ rootProps, posts, onPostClick, postProps, status = {} }: IPostsProps) => (
  <section {...rootProps} className={cn('posts-container', rootProps?.className)}>
    <StatusContent
      {...status}
      emptyTemplate={
        status.emptyTemplate ?? (
          <Empty
            description="Check back later or try fetching the posts again."
            title="No publications found"
          />
        )
      }
      errorTemplate={
        status.errorTemplate ?? (
          <Error description={status.errorDescription} title={status.errorTitle} />
        )
      }
      loadingTemplate={status.loadingTemplate ?? <Post.Skeleton items={6} />}
    >
      <div className="pc__grid">
        {posts?.map((post) => (
          <Post
            key={post.id}
            {...postProps}
            isOptimistic={post.__optimistic}
            post={post}
            rootProps={{
              onClick: () => onPostClick?.(post.id),
              className: cn(
                onPostClick &&
                  'cursor-pointer transition-transform duration-200 active:scale-[0.98]',
              ),
            }}
          />
        ))}
      </div>
    </StatusContent>
  </section>
);
