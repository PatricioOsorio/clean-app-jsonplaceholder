import { useNavigate, useSearchParams } from 'react-router';

import { formatError } from '@presentation/utils';
import { useDeletePost, usePosts } from '../../hooks';
import type { IPostVM } from '../../models/post';
import { useMemo, type ComponentProps } from 'react';
import type { IGetPostsParams, PostEntity } from '@domain/post';
import { usePermission } from '@presentation/features/auth/hooks';
import type { Post } from '@presentation/features/posts/components';

const DEFAULT_PARAMS: IGetPostsParams = {
  page: 1,
  limit: 6,
  sort: 'title',
  sortOrder: 'asc',
};

export const usePostsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { hasPermission } = usePermission();

  const canEdit = hasPermission('posts:update');
  const canDelete = hasPermission('posts:delete');

  const page = useMemo(
    () => Number(searchParams.get('page') ?? DEFAULT_PARAMS.page),
    [searchParams],
  );

  const limit = useMemo(
    () => Number(searchParams.get('limit') ?? DEFAULT_PARAMS.limit),
    [searchParams],
  );

  const sort = useMemo(
    () => (searchParams.get('sort') ?? DEFAULT_PARAMS.sort) as keyof PostEntity,
    [searchParams],
  );

  const sortOrder = useMemo(
    () =>
      (searchParams.get('sortOrder') ?? DEFAULT_PARAMS.sortOrder) as IGetPostsParams['sortOrder'],
    [searchParams],
  );

  const { data: postsData, isLoading, isError, error } = usePosts({ page, limit, sort, sortOrder });

  const posts = postsData?.data ?? [];
  const totalPosts = postsData?.total ?? 0;

  const totalPages = useMemo(() => Math.ceil(totalPosts / limit), [totalPosts, limit]);

  const isEmpty = !isLoading && !isError && !posts?.length;
  const { errorTitle, errorMessage } = formatError(error);

  const { mutate: deletePost } = useDeletePost();

  // ! Paginator
  const handlePageChange = (newPage: number) => {
    setSearchParams((prevParams) => {
      const updatedParams = new URLSearchParams(prevParams);
      updatedParams.set('page', newPage.toString());
      return updatedParams;
    });
  };

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  const handleEdit = (post: IPostVM) => {
    navigate(`/posts/edit/${post.id}`);
  };

  const handleDelete = (postId: number) => {
    deletePost(postId);
  };

  // components
  const btnEditProps: ComponentProps<typeof Post>['btnEditProps'] = canEdit
    ? { onClick: handleEdit }
    : undefined;

  const btnDeleteProps: ComponentProps<typeof Post>['btnDeleteProps'] = canDelete
    ? { onClick: handleDelete }
    : undefined;

  return {
    // props
    posts,
    isLoading,
    isError,
    errorTitle,
    errorMessage,
    isEmpty,

    // paginator
    page,
    totalPages,
    handlePageChange,

    // components
    btnEditProps,
    btnDeleteProps,

    // handlers
    handlePostClick,
  };
};
