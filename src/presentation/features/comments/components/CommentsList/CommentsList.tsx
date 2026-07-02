import { cn } from 'lib-styleguide-simba/utils';

import type { ICommentsListProps } from './CommentsList.interfaces';
import { Comment } from '@presentation/features/comments/components';
import { Empty } from '@presentation/shared/components';
import { Error } from '@presentation/shared/components';
import './CommentsList.css';

export const CommentsList = ({
  comments,

  isLoading,
  loadingTemplate,

  isEmpty,
  emptyTemplate,

  isError,
  errorTitle,
  errorDescription,
  errorTemplate,

  rootProps,
}: ICommentsListProps) => {
  const renderContent = () => {
    if (isLoading) {
      return loadingTemplate ?? <Comment.Skeleton items={3} />;
    }

    if (isError) {
      return errorTemplate ?? <Error description={errorDescription} title={errorTitle} />;
    }

    if (isEmpty || comments.length === 0) {
      return (
        emptyTemplate ?? (
          <Empty description="No comments available for this post." title="No Comments" />
        )
      );
    }

    return (
      <div className="clc__list">
        {comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>
    );
  };
  return (
    <section {...rootProps} className={cn('comments-list-container', rootProps?.className)}>
      <h2 className="clc__title">Comments</h2>
      {renderContent()}
    </section>
  );
};
