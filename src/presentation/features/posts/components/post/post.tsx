import { Button } from 'lib-styleguide-simba/button';
import { cn } from 'lib-styleguide-simba/utils';
import { Avatar, AvatarFallback } from 'lib-styleguide-simba/shadcn/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'lib-styleguide-simba/shadcn/dropdown-menu';
import { IconDotsVertical, IconMessageCircle } from 'lib-styleguide-simba/icons';

import type { IPostProps } from './post.interfaces';

import { PostSkeleton } from './skeleton/skeleton';
import './post.css';

export const Post = ({
  rootProps,
  post,
  isOptimistic,
  commentsCount,
  btnEditProps,
  btnDeleteProps,
}: IPostProps) => {
  return (
    <article
      {...rootProps}
      className={cn('post-container', rootProps?.className)}
      data-is-optimistic={isOptimistic}
    >
      <div className="pc__cover" data-variant={post.id % 6}>
        <span className="pc__cover-glow" />
      </div>

      <div className="pc__body">
        <div className="pc__header">
          <Avatar size="sm">
            <AvatarFallback>U{post.idUser}</AvatarFallback>
          </Avatar>

          <div className="pc__byline">
            <span className="pc__user">@user-{post.idUser}</span>
            <span className="pc__id">Post #{post.id}</span>
          </div>

          {(btnEditProps || btnDeleteProps) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Post actions"
                  className="pc__menu-trigger"
                  size="icon"
                  type="button"
                  variant="text"
                  onClick={(e) => e.stopPropagation()}
                >
                  <IconDotsVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                {btnEditProps && (
                  <DropdownMenuItem onClick={(e) => btnEditProps?.onClick?.(post, e as never)}>
                    Edit
                  </DropdownMenuItem>
                )}
                {btnDeleteProps && (
                  <DropdownMenuItem onClick={(e) => btnDeleteProps?.onClick?.(post.id, e as never)}>
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <h2 className="pc__title">{post.title}</h2>
        <p className="pc__content">{post.content}</p>
      </div>

      <div className="pc__footer">
        <div className="pc__stats">
          <span className="pc__stat">
            <IconMessageCircle size={16} />
            {commentsCount ?? 0}
          </span>
        </div>
      </div>
    </article>
  );
};

Post.Skeleton = PostSkeleton;
