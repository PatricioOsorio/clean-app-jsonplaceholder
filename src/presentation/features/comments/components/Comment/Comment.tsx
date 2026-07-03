import { cn } from 'lib-styleguide-simba/utils';

import type { ICommentProps } from './Comment.interfaces';

import { Empty, Error, StatusContent } from '@presentation/shared/components';
import { CommentSkeleton } from './Skeleton/Skeleton';
import { getInitials } from '@presentation/utils';
import './Comment.css';

export const Comment = ({ rootProps, comment, status = {} }: ICommentProps) => (
  <div
    {...rootProps}
    className={cn(
      'comment-container',
      { 'optimistic-working': comment.__isOptimistic },
      rootProps?.className,
    )}
  >
    <StatusContent
      {...status}
      emptyTemplate={
        status.emptyTemplate ?? (
          <Empty description="Be the first to share your thoughts!" title="No comment found" />
        )
      }
      errorTemplate={status.errorTemplate ?? <Error description="We couldn't load this comment." />}
      loadingTemplate={status.loadingTemplate ?? <CommentSkeleton items={1} />}
    >
      <div className="cc__wrapper">
        {/* Left Thread line visual anchor */}
        <div aria-hidden="true" className="cc__thread-line" />

        <div className="cc__main-content">
          <div className="cc__header">
            <div
              aria-hidden="true"
              className="cc__avatar bg-primary/10 text-primary border-primary/20 shadow-xs"
            >
              {getInitials(comment.name)}
            </div>

            <div className="cc__meta">
              <h3 className="cc__author">{comment.name}</h3>
              <span className="cc__email">{comment.email}</span>
            </div>

            <div className="cc__top-actions">
              {comment.id !== undefined && (
                <span
                  className="cc__id"
                  title={`Comment ID: ${comment.id}, Post ID: ${comment.idPost}`}
                >
                  #{comment.id}
                </span>
              )}
            </div>
          </div>

          <div className="cc__body">
            <p className="cc__text">{comment.body}</p>
          </div>
        </div>
      </div>
    </StatusContent>
  </div>
);

Comment.Skeleton = CommentSkeleton;
