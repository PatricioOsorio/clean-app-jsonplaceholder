import { cn } from 'styleguide/utils';

import type { IPostDetailProps } from './PostDetail.interfaces';

import { PostDetailEmpty } from './Empty/Empty';
import { PostDetailSkeleton } from './Skeleton/Skeleton';
import './PostDetail.css';

export const PostDetail = ({ rootProps, post, isLoading, isEmpty, onBack }: IPostDetailProps) => {
  const renderContent = () => {
    if (isLoading) {
      return <PostDetailSkeleton items={1} />;
    }

    if (isEmpty || !post) {
      return <PostDetailEmpty />;
    }

    return (
      <>
        <header className="pdc__header">
          <h1 className="pdc__title">{post.title}</h1>
          <div className="pdc__meta">
            {post.idUser !== undefined && (
              <span className="pdc__author">Written by User #{post.idUser}</span>
            )}
            <span className="pdc__divider">•</span>
            <span className="pdc__id">Publication ID: {post.id}</span>
          </div>
        </header>

        <div className="pdc__body">
          <p className="pdc__text">{post.content}</p>
        </div>
      </>
    );
  };

  return (
    <article {...rootProps} className={cn('post-detail-container', rootProps?.className)}>
      {onBack && (
        <button className="pdc__back-button" onClick={onBack}>
          <span className="pdc__back-arrow">←</span> Back to publications
        </button>
      )}

      <div className="pdc__card">{renderContent()}</div>
    </article>
  );
};

PostDetail.Skeleton = PostDetailSkeleton;
PostDetail.Empty = PostDetailEmpty;
