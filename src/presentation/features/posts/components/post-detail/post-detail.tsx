import { Button } from 'lib-styleguide-simba/button';
import { cn } from 'lib-styleguide-simba/utils';

import type { IPostDetailProps } from './post-detail.interfaces';

import { Empty, StatusContent } from '@presentation/shared/components';
import { PostDetailSkeleton } from './skeleton/skeleton';
import './post-detail.css';

export const PostDetail = ({
  rootProps,
  post,
  isOptimistic,
  isDeleting,
  onBack,
  onEdit,
  onDelete,
  status = {},
}: IPostDetailProps) => (
  <article
    {...rootProps}
    className={cn(
      'post-detail-container',
      { 'optimistic-deleting': isOptimistic },
      rootProps?.className,
    )}
  >
    {onBack && (
      <button className="pdc__back-button" onClick={onBack}>
        <span className="pdc__back-arrow">←</span> Back to publications
      </button>
    )}

    <div className="pdc__card">
      <StatusContent
        {...status}
        emptyTemplate={
          status.emptyTemplate ?? (
            <Empty
              description="The requested publication might have been deleted or does not exist."
              title="Publication not found"
            />
          )
        }
        isEmpty={status.isEmpty || !post}
        loadingTemplate={status.loadingTemplate ?? <PostDetailSkeleton items={1} />}
      >
        {post && (
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

            <div className="pdc__actions">
              {onEdit && (
                <Button
                  aria-label="Edit post"
                  disabled={isDeleting}
                  size="sm"
                  type="button"
                  variant="outline"
                  onClick={(e) => onEdit(post, e)}
                >
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  aria-label="Delete post"
                  disabled={isDeleting}
                  size="sm"
                  type="button"
                  variant="destructive"
                  onClick={(e) => onDelete(post.id, e)}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              )}
            </div>
          </>
        )}
      </StatusContent>
    </div>
  </article>
);

PostDetail.Skeleton = PostDetailSkeleton;
