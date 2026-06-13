import { cn } from 'styleguide/utils';

import type { IPostsProps } from './Posts.interfaces';

import { Post } from '../Post/Post';
import './Posts.css';

export const Posts = ({ rootProps, posts, isLoading, onPostClick, isEmpty }: IPostsProps) => {
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

        {isEmpty && <Post.Empty />}

        {!isLoading &&
          !isEmpty &&
          posts?.map((post) => (
            <Post
              key={post.id}
              content={post.content}
              id={post.id}
              idUser={post.idUser}
              rootProps={{
                onClick: onPostClick ? () => onPostClick(post.id) : undefined,
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
