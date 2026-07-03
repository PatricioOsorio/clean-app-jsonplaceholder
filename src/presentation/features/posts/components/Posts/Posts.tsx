import { cn } from 'lib-styleguide-simba/utils';

import type { IPostsProps } from './Posts.interfaces';

import { Empty, Error, StatusContent } from '@presentation/shared/components';
import { Post } from '../Post';
import './Posts.css';

export const Posts = ({ rootProps, posts, onPostClick, postProps, status = {} }: IPostsProps) => (
  <section {...rootProps} className={cn('posts-container', rootProps?.className)}>
    <div className="pc__header">
      <div className="pc__title-group">
        <h1 className="pc__title">Featured Publications</h1>
        <p className="pc__subtitle">Latest updates and insights from our community</p>
      </div>
    </div>

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
