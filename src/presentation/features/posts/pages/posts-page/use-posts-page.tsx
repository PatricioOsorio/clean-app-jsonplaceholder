import { useMemo, type ComponentProps } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import type { IGetPostsParams, PostEntity } from '@domain/post';
import { formatError } from '@presentation/utils';
import { usePermission } from '@presentation/features/auth/hooks';
import { PaginationCustom } from '@presentation/shared/components';
import { Posts, type Post } from '../../components';
import type { IPostProps } from '../../components/post/post.interfaces';
import { DEFAULT_POSTS_PARAMS, useDeletePost, usePosts } from '../../hooks';
import type { IPostVM } from '../../models/post';

export const usePostsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { hasPermission } = usePermission();

  const canEdit = hasPermission(['posts:update', 'posts:delete']);

  const params = useMemo(
    () => ({
      page: Number(searchParams.get('page') ?? DEFAULT_POSTS_PARAMS.page),
      limit: Number(searchParams.get('limit') ?? DEFAULT_POSTS_PARAMS.limit),
      sort: (searchParams.get('sort') ?? DEFAULT_POSTS_PARAMS.sort) as keyof PostEntity,
      sortOrder: (searchParams.get('sortOrder') ??
        DEFAULT_POSTS_PARAMS.sortOrder) as IGetPostsParams['sortOrder'],
    }),
    [searchParams],
  );

  const { page, limit, sort, sortOrder } = params;

  const {
    data: postsData,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    error: errorPosts,
  } = usePosts({ page, limit, sort, sortOrder });

  const posts = postsData?.data ?? [];
  const totalPosts = postsData?.total ?? 0;
  const totalPages = useMemo(() => Math.ceil(totalPosts / limit), [totalPosts, limit]);
  const isEmpty = !isLoadingPosts && !isErrorPosts && !posts?.length;

  const { errorTitle, errorMessage } = formatError(errorPosts);

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

  // components props
  const btnEditProps: ComponentProps<typeof Post>['btnEditProps'] = canEdit
    ? { onClick: handleEdit }
    : undefined;

  const btnDeleteProps: ComponentProps<typeof Post>['btnDeleteProps'] = canEdit
    ? { onClick: handleDelete }
    : undefined;

  const postItems: IPostProps[] = useMemo(
    () =>
      posts.map((post) => ({
        post,
        isOptimistic: post.__optimistic,
        btnEditProps,
        btnDeleteProps,
        rootProps: {
          onClick: () => handlePostClick(post.id),
        },
      })),
    [posts, btnEditProps, btnDeleteProps],
  );

  const postsProps: ComponentProps<typeof Posts> = {
    items: postItems,
    status: {
      isLoading: isLoadingPosts,
      isError: isErrorPosts,
      errorTitle,
      errorDescription: errorMessage,
      isEmpty,
    },
  };

  const paginationProps: ComponentProps<typeof PaginationCustom> = {
    page,
    totalPages,
    siblingCount: 2,
    onPageChange: handlePageChange,
  };

  return {
    totalPosts,
    postsProps,
    paginationProps,
  };
};
