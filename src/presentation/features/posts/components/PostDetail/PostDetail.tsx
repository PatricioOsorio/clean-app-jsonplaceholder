import { cn } from 'styleguide/utils';

import type { IPostDetailProps } from './PostDetail.interfaces';

import './PostDetail.css';

export const PostDetail = ({ rootProps, post, isLoading, isEmpty, onBack }: IPostDetailProps) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="pdc__skeleton-container">
          <div className="pdc__skeleton-title" />
          <div className="pdc__skeleton-meta" />
          <div className="pdc__skeleton-line pdc__skeleton-line--full" />
          <div className="pdc__skeleton-line pdc__skeleton-line--full" />
          <div className="pdc__skeleton-line pdc__skeleton-line--partial" />
        </div>
      );
    }

    if (isEmpty || !post) {
      return (
        <div className="pdc__empty">
          <h3 className="pdc__empty-title">Publication not found</h3>
          <p className="pdc__empty-desc">
            The requested publication might have been deleted or does not exist.
          </p>
        </div>
      );
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
    <article
      {...rootProps}
      className={cn(
        'post-detail-container',
        isLoading && 'post-detail-container--loading',
        isEmpty && 'post-detail-container--empty',
        rootProps?.className,
      )}
    >
      {onBack && (
        <button className="pdc__back-button" onClick={onBack}>
          <span className="pdc__back-arrow">←</span> Back to publications
        </button>
      )}

      <div className="pdc__card">{renderContent()}</div>
    </article>
  );
};
