import { cn } from 'styleguide/utils';

import type { ICommentProps } from './Comment.interfaces';

import { Empty, Error } from '@presentation/shared/components';
import { CommentSkeleton } from './Skeleton/Skeleton';
import './Comment.css';
import { getInitials } from '@presentation/utils';

export const Comment = ({
  rootProps,
  id,
  idPost,
  name,
  email,
  body,
  __isOptimistic,
  isLoading,
  isError,
  isEmpty,
  loadingTemplate,
  emptyTemplate,
  errorTemplate,
}: ICommentProps) => {
  const renderContent = () => {
    if (isLoading) {
      return loadingTemplate ?? <CommentSkeleton items={1} />;
    }

    if (isError) {
      return errorTemplate ?? <Error description="We couldn't load this comment." />;
    }

    if (isEmpty) {
      return (
        emptyTemplate ?? (
          <Empty title="No comment found" description="Be the first to share your thoughts!" />
        )
      );
    }

    const initials = getInitials(name);

    return (
      <div className="cc__wrapper">
        {/* Left Thread line visual anchor */}
        <div className="cc__thread-line" aria-hidden="true" />

        <div className="cc__main-content">
          <div className="cc__header">
            <div
              className="cc__avatar bg-primary/10 text-primary border-primary/20 shadow-xs"
              aria-hidden="true"
            >
              {initials}
            </div>

            <div className="cc__meta">
              <h3 className="cc__author">{name}</h3>
              <span className="cc__email">{email}</span>
            </div>

            <div className="cc__top-actions">
              {id !== undefined && (
                <span className="cc__id" title={`Comment ID: ${id}, Post ID: ${idPost}`}>
                  #{id}
                </span>
              )}
            </div>
          </div>

          <div className="cc__body">
            <p className="cc__text">{body}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      {...rootProps}
      className={cn(
        'comment-container',
        { 'optimistic-working': __isOptimistic },
        rootProps?.className,
      )}
    >
      {renderContent()}
    </div>
  );
};

Comment.Skeleton = CommentSkeleton;
