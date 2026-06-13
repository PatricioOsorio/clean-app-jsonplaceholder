import { cn } from 'styleguide/utils';

import type { IPostProps } from './Post.interfaces';

import { PostEmpty } from './Empty/Empty';
import { PostSkeleton } from './Skeleton/Skeleton';
import './Post.css';

export const Post = ({ rootProps, id, title, content, idUser, isLoading, isEmpty }: IPostProps) => {
  const renderContent = () => {
    if (isLoading) {
      return <PostSkeleton items={1} />;
    }

    if (isEmpty) {
      return <PostEmpty />;
    }

    return (
      <>
        <h2 className="pc__title">{title}</h2>
        <p className="pc__content">{content}</p>

        <div className="pc__footer">
          {idUser !== undefined && <span className="pc__user">User ID: {idUser}</span>}
          <span className="pc__id">Post #{id}</span>
        </div>
      </>
    );
  };

  return (
    <article {...rootProps} className={cn('post-container', rootProps?.className)}>
      {renderContent()}
    </article>
  );
};

Post.Skeleton = PostSkeleton;
Post.Empty = PostEmpty;
