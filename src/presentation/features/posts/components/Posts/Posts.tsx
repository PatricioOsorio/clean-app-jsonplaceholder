import { cn } from 'styleguide/utils';

import type { IPostsProps } from './Posts.interfaces';

import { Empty, Error } from '@presentation/shared/components';
import { Post } from '../Post';
import './Posts.css';

export const Posts = ({
  rootProps,
  posts,
  isLoading,
  isError,
  errorTitle,
  errorDescription,
  onPostClick,
  isEmpty,
}: IPostsProps) => {
  return (
    <section {...rootProps} className={cn('posts-container', rootProps?.className)}>
      <div className="pc__header">
        <div className="pc__title-group">
          <h1 className="pc__title">Featured Publications</h1>
          <p className="pc__subtitle">Latest updates and insights from our community</p>
        </div>
      </div>

      <div className="pc__grid">
        {isLoading && <Post.Skeleton items={6} />}

        {isError && (
          <Error
            description={errorDescription}
            rootProps={{ className: 'col-span-full' }}
            title={errorTitle}
          />
        )}

        {isEmpty && (
          <Empty
            description="Check back later or try fetching the posts again."
            rootProps={{ className: 'col-span-full' }}
            title="No publications found"
          />
        )}

        {!isLoading &&
          !isError &&
          !isEmpty &&
          posts?.map((post) => (
            <Post
              key={post.id}
              content={post.content}
              id={post.id}
              idUser={post.idUser}
              isOptimistic={post.__optimistic}
              rootProps={{
                onClick: () => onPostClick?.(post.id),
                className: cn(
                  onPostClick &&
                    'cursor-pointer transition-transform duration-200 active:scale-[0.98]',
                ),
              }}
              title={post.title}
            />
          ))}
      </div>
    </section>
  );
};
