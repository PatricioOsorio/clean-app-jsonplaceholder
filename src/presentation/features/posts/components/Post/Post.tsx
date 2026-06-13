import { cn } from 'styleguide/utils';

import type { IPostProps } from './Post.interfaces';

import './Post.css';

export const Post = ({ rootProps, id, title, content, idUser, isLoading, isEmpty }: IPostProps) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="pc__skeleton-container">
          <div className="pc__skeleton-title" />
          <div className="pc__skeleton-line pc__skeleton-line--full" />
          <div className="pc__skeleton-line pc__skeleton-line--partial" />
          <div className="pc__skeleton-footer">
            <div className="pc__skeleton-badge pc__skeleton-badge--sm" />
            <div className="pc__skeleton-badge pc__skeleton-badge--xs" />
          </div>
        </div>
      );
    }

    if (isEmpty) {
      return (
        <div className="pc__empty-state">
          <h3 className="pc__empty-title">No publications found</h3>
          <p className="pc__empty-desc">Check back later or try fetching the posts again.</p>
        </div>
      );
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
    <article
      {...rootProps}
      className={cn(
        'post-container',
        isLoading && 'post-container--loading',
        isEmpty && 'post-container--empty',
        rootProps?.className,
      )}
    >
      {renderContent()}
    </article>
  );
};
