import { Button } from 'lib-styleguide-simba/button';
import { cn } from 'lib-styleguide-simba/utils';

import type { IPostProps } from './Post.interfaces';

import { Empty, Error, StatusContent } from '@presentation/shared/components';
import { PostSkeleton } from './Skeleton/Skeleton';
import './Post.css';

export const Post = ({
  rootProps,
  post,
  isOptimistic,
  onEdit,
  onDelete,
  status = {},
}: IPostProps) => (
  <article
    {...rootProps}
    className={cn('post-container', { 'optimistic-working': isOptimistic }, rootProps?.className)}
  >
    <StatusContent
      {...status}
      emptyTemplate={status.emptyTemplate ?? <Empty title="No publication found" />}
      errorTemplate={
        status.errorTemplate ?? <Error description="We couldn't load this publication." />
      }
      loadingTemplate={status.loadingTemplate ?? <PostSkeleton items={1} />}
    >
      <h2 className="pc__title">{post.title}</h2>
      <p className="pc__content">{post.content}</p>

      <div className="pc__footer">
        <div className="pc__meta">
          {post.idUser !== undefined && <span className="pc__user">User ID: {post.idUser}</span>}
          <span className="pc__id">Post #{post.id}</span>
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
                onEdit(post, e);
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
                onDelete(post.id, e);
              }}
            >
              Borrar
            </Button>
          )}
        </div>
      </div>
    </StatusContent>
  </article>
);

Post.Skeleton = PostSkeleton;
