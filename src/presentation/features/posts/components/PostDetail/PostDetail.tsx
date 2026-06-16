import { Button } from 'styleguide/button';
import { cn } from 'styleguide/utils';

import type { IPostDetailProps } from './PostDetail.interfaces';

import { Empty, Error } from '@presentation/shared/components';
import { PostDetailSkeleton } from './Skeleton/Skeleton';
import './PostDetail.css';

export const PostDetail = ({
  rootProps,
  post,
  isLoading,
  isError,
  isEmpty,
  isOptimistic,
  loadingTemplate,
  emptyTemplate,
  errorTemplate,
  errorTitle,
  errorDescription,
  onBack,
  onEdit,
  onDelete,
  isDeleting,
}: IPostDetailProps) => {
  const renderContent = () => {
    if (isLoading) {
      return loadingTemplate ?? <PostDetailSkeleton items={1} />;
    }

    if (isError) {
      return errorTemplate ?? <Error description={errorDescription} title={errorTitle} />;
    }

    if (isEmpty || !post) {
      return (
        emptyTemplate ?? (
          <Empty
            description="The requested publication might have been deleted or does not exist."
            title="Publication not found"
          />
        )
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

        <div className="pdc__actions">
          {onEdit && (
            <Button
              aria-label="Editar publicación"
              disabled={isDeleting}
              size="sm"
              type="button"
              variant="outline"
              onClick={(e) => onEdit(post, e)}
            >
              Editar
            </Button>
          )}
          {onDelete && (
            <Button
              aria-label="Borrar publicación"
              disabled={isDeleting}
              size="sm"
              type="button"
              variant="destructive"
              onClick={(e) => onDelete(post.id, e)}
            >
              {isDeleting ? 'Borrando...' : 'Borrar'}
            </Button>
          )}
        </div>
      </>
    );
  };

  return (
    <article
      {...rootProps}
      className={cn(
        'post-detail-container',
        { 'optimistic-container': isOptimistic },
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

PostDetail.Skeleton = PostDetailSkeleton;
