import { cn } from 'styleguide/utils';
import { Post } from '../Post';

import type { IPostsProps } from './Posts.interfaces';

import './Posts.css';

export const Posts = ({ rootProps, posts, isLoading, onPostClick }: IPostsProps) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="psc__grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <Post key={`skeleton-${i}`} id={i} isLoading={true} />
          ))}
        </div>
      );
    }

    if (!posts || posts.length === 0) {
      return (
        <div className="psc__grid">
          <Post isEmpty={true} />
        </div>
      );
    }

    return (
      <div className="psc__grid">
        {posts.map((post) => (
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
    );
  };

  return (
    <section {...rootProps} className={cn('posts-container', rootProps?.className)}>
      <div className="psc__header">
        <div className="psc__title-group">
          <h1 className="psc__title">Featured Publications</h1>
          <p className="psc__subtitle">Latest updates and insights from our community</p>
        </div>
      </div>

      {renderContent()}
    </section>
  );
};
