import { Button } from 'lib-styleguide-simba/button';
import { cn } from 'lib-styleguide-simba/utils';

import type { IPostProps } from './Post.interfaces';

import { PostSkeleton } from './Skeleton/Skeleton';
import './Post.css';

export const Post = ({ rootProps, post, isOptimistic, onEdit, onDelete }: IPostProps) => (
  <article
    {...rootProps}
    className={cn('post-container', { 'optimistic-working': isOptimistic }, rootProps?.className)}
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
            aria-label="Edit post"
            size="sm"
            type="button"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(post, e);
            }}
          >
            Edit
          </Button>
        )}
        {onDelete && (
          <Button
            aria-label="Delete post"
            size="sm"
            type="button"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(post.id, e);
            }}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  </article>
);

Post.Skeleton = PostSkeleton;
