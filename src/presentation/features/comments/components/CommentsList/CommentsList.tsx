import { cn } from 'lib-styleguide-simba/utils';

import type { ICommentsListProps } from './CommentsList.interfaces';
import { Comment } from '@presentation/features/comments/components';
import { Empty, Error, StatusContent } from '@presentation/shared/components';
import './CommentsList.css';

export const CommentsList = ({ comments, rootProps, status = {} }: ICommentsListProps) => (
  <section {...rootProps} className={cn('comments-list-container', rootProps?.className)}>
    <h2 className="clc__title">Comments</h2>

    <StatusContent
      {...status}
      emptyTemplate={
        status.emptyTemplate ?? (
          <Empty description="No comments available for this post." title="No Comments" />
        )
      }
      errorTemplate={
        status.errorTemplate ?? (
          <Error description={status.errorDescription} title={status.errorTitle} />
        )
      }
      isEmpty={status.isEmpty || comments.length === 0}
      loadingTemplate={status.loadingTemplate ?? <Comment.Skeleton items={3} />}
    >
      <div className="clc__list">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </StatusContent>
  </section>
);
