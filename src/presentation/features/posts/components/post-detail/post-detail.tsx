import { Button } from 'lib-styleguide-simba/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'lib-styleguide-simba/shadcn/dropdown-menu';
import { IconArrowLeft, IconDotsVertical, IconPencil, IconTrash } from 'lib-styleguide-simba/icons';
import { StatusContent } from 'lib-styleguide-simba/status-content';
import { cn } from 'lib-styleguide-simba/utils';

import { Empty } from '@presentation/shared/components';
import type { IPostDetailProps } from './post-detail.interfaces';
import { PostDetailSkeleton } from './skeleton';
import './post-detail.css';

export const PostDetail = ({
  rootProps,
  post,
  isOptimistic,
  isDeleting,
  btnBackProps,
  btnEditProps,
  btnDeleteProps,
  status = {},
}: IPostDetailProps) => (
  <article
    {...rootProps}
    className={cn('post-detail-container', rootProps?.className)}
    data-is-optimistic={isOptimistic}
    data-is-deleting={isDeleting}
  >
    {btnBackProps && (
      <Button
        aria-label="Back to publications"
        className="pdc__back-btn"
        size="sm"
        type="button"
        variant="text"
        {...btnBackProps}
      >
        <IconArrowLeft className="h-4 w-4" />
        <span>Back to publications</span>
      </Button>
    )}

    <div className="pdc__card">
      <StatusContent
        {...status}
        emptyTemplate={
          <Empty
            description="The requested publication might have been deleted or does not exist."
            title="Publication not found"
          />
        }
        isEmpty={status.isEmpty}
        loadingTemplate={<PostDetailSkeleton items={1} />}
      >
        {post && (
          <>
            <header className="pdc__header">
              <div className="pdc__header-top">
                <div className="pdc__title-group">
                  <h1 className="pdc__title">{post.title}</h1>
                  <div className="pdc__meta">
                    {post.idUser !== undefined && (
                      <span className="pdc__author">Written by User #{post.idUser}</span>
                    )}
                    <span className="pdc__divider">•</span>
                    <span className="pdc__id">Publication ID: {post.id}</span>
                  </div>
                </div>

                {(btnEditProps || btnDeleteProps) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-label="Post actions"
                        className="pdc__menu-trigger"
                        disabled={isDeleting}
                        size="icon"
                        type="button"
                        variant="text"
                      >
                        <IconDotsVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="pdc__menu-content">
                      {btnEditProps && (
                        <DropdownMenuItem
                          className="pdc__menu-item"
                          disabled={isDeleting}
                          onClick={(e) => btnEditProps.onClick?.(post, e as never)}
                        >
                          <IconPencil className="h-4 w-4 shrink-0" />
                          <span>Edit publication</span>
                        </DropdownMenuItem>
                      )}
                      {btnDeleteProps && (
                        <DropdownMenuItem
                          className="pdc__menu-item pdc__menu-item--danger"
                          disabled={isDeleting}
                          onClick={(e) => btnDeleteProps.onClick?.(post.id, e as never)}
                        >
                          <IconTrash className="h-4 w-4 shrink-0" />
                          <span>{isDeleting ? 'Deleting...' : 'Delete publication'}</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </header>

            <div className="pdc__body">
              <p className="pdc__text">{post.content}</p>
            </div>
          </>
        )}
      </StatusContent>
    </div>
  </article>
);

PostDetail.Skeleton = PostDetailSkeleton;
