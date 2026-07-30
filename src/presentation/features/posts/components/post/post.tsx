import { Button } from 'lib-styleguide-simba/button';
import { cn } from 'lib-styleguide-simba/utils';

import type { IPostProps } from './post.interfaces';

import { PostSkeleton } from './skeleton/skeleton';
import './post.css';

export const Post = ({
  rootProps,
  post,
  isOptimistic,
  btnEditProps,
  btnDeleteProps,
}: IPostProps) => (
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
        {btnEditProps && (
          <Button
            aria-label="Edit post"
            size="sm"
            type="button"
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              btnEditProps?.onClick?.(post, e);
            }}
          >
            Edit
          </Button>
        )}
        {btnDeleteProps && (
          <Button
            aria-label="Delete post"
            size="sm"
            type="button"
            severity="danger"
            onClick={(e) => {
              e.stopPropagation();
              btnDeleteProps?.onClick?.(post.id, e);
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
