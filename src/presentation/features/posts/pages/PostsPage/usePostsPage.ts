import { useNavigate } from 'react-router';

import { formatError } from '@presentation/utils';
import { useDeletePost, usePosts } from '../../hooks';
import type { IPostVM } from '../../models/post';

export const usePostsPage = () => {
  const navigate = useNavigate();

  const { data: posts, isLoading, isError, error } = usePosts();
  const isEmpty = !isLoading && !isError && !posts?.length;
  const { errorTitle, errorMessage } = formatError(error);

  const { mutate: deletePost } = useDeletePost();

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  const handleEdit = (post: IPostVM) => {
    navigate(`/posts/edit/${post.id}`);
  };

  const handleDelete = (postId: number) => {
    deletePost(postId);
  };

  // constants
  const TITLE = 'SYSTEM POSTS';
  const SUBTITLE = 'Data fetched via TanStack Query + Clean Architecture Use Cases.';

  return {
    // props
    posts,
    isLoading,
    isError,
    errorTitle,
    errorMessage,
    isEmpty,

    // constants
    TITLE,
    SUBTITLE,

    // handlers
    handlePostClick,
    handleEdit,
    handleDelete,
  };
};
