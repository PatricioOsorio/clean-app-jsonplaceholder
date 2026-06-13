import { cn } from 'styleguide/utils';

import type { IPostProps } from './Post.interfaces';

import { Empty } from '@presentation/shared/components/Empty';
import { Error } from '@presentation/shared/components/Error';
import { PostSkeleton } from './Skeleton/Skeleton';
import './Post.css';

export const Post = ({
  rootProps,
  id,
  title,
  content,
  idUser,
  isLoading,
  isError,
  isEmpty,
  loadingTemplate,
  emptyTemplate,
  errorTemplate,
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
          {idUser !== undefined && <span className="pc__user">User ID: {idUser}</span>}
          <span className="pc__id">Post #{id}</span>
        </div>
      </>
    );
  };

  return (
    <article {...rootProps} className={cn('post-container', rootProps?.className)}>
      {renderContent()}
    </article>
  );
};

Post.Skeleton = PostSkeleton;
