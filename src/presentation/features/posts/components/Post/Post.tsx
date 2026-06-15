import { Button } from 'styleguide/button';
import { cn } from 'styleguide/utils';

import type { IPostProps } from './Post.interfaces';

import { Empty, Error } from '@presentation/shared/components';
import { PostSkeleton } from './Skeleton/Skeleton';
import './Post.css';

export const Post = ({
  rootProps,
  id,
  title,
  content,
  idUser,
  isOptimistic,
  isLoading,
  isError,
  isEmpty,
  loadingTemplate,
  emptyTemplate,
  errorTemplate,
  onEdit,
  onDelete,
}: IPostProps) => {
  const renderContent = () => {
    if (isLoading) {
      return loadingTemplate ?? <PostSkeleton items={1} />;
    }

    if (isError) {
      return errorTemplate ?? <Error description="We couldn't load this publication." />;
    }

    if (isEmpty) {
      return emptyTemplate ?? <Empty title="No publication found" />;
    }

    return (
      <>
        <h2 className="pc__title">{title}</h2>
        <p className="pc__content">{content}</p>

        <div className="pc__footer">
          <div className="pc__meta">
            {idUser !== undefined && <span className="pc__user">User ID: {idUser}</span>}
            <span className="pc__id">Post #{id}</span>
          </div>

          <div className="pc__actions">
            {onEdit && (
              <Button
                aria-label="Editar publicación"
                size="sm"
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit({ id, title, content, idUser }, e);
                }}
              >
                Editar
              </Button>
            )}
            {onDelete && (
              <Button
                aria-label="Borrar publicación"
                size="sm"
                type="button"
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id, e);
                }}
              >
                Borrar
              </Button>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <article
      {...rootProps}
      className={cn(
        'post-container',
        { 'optimistic-container': isOptimistic },
        rootProps?.className,
      )}
    >
      {renderContent()}
    </article>
  );
};

Post.Skeleton = PostSkeleton;
