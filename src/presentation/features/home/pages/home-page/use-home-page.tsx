import { DEFAULT_POSTS_PARAMS, usePosts } from '@presentation/features/posts/hooks';
import { useMemo, type ComponentProps } from 'react';
import type {
  FeaturedPosts,
  HomeGallery,
  IFeaturedPostVM,
  IHomeGalleryItemVM,
  IHomeMetricItemProps,
} from '../../components';
import { useComments } from '@presentation/features/comments/hooks';
import { ENV } from '@infrastructure/utils';
import { useTodos } from '@presentation/features/todos/hooks';
import { useAlbums } from '@presentation/features/albums/hooks';
import { usePhotos } from '@presentation/features/photos/hooks';
import { useUsers } from '@presentation/features/users/hooks';
import { FeaturedPostMapper, HomeGalleryMapper } from '@presentation/features/home/models';

export const useHomePage = () => {
  const {
    data: postsData,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = usePosts(DEFAULT_POSTS_PARAMS);

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useComments();

  const { data: todosData, isLoading: isTodosLoading, isError: isTodosError } = useTodos();
  const { data: albumsData, isLoading: isAlbumsLoading, isError: isAlbumsError } = useAlbums();
  const { data: photosData, isLoading: isPhotosLoading, isError: isPhotosError } = usePhotos();
  const { data: usersData, isLoading: isUsersLoading, isError: isUsersError } = useUsers();

  const { total: totalPosts, data: posts } = postsData || { total: 0, data: [] };
  const { total: totalComments } = commentsData || { total: 0 };
  const { total: totalTodos } = todosData || { total: 0 };
  const { total: totalAlbums } = albumsData || { total: 0 };
  const { total: totalPhotos, data: photos } = photosData || { total: 0, data: [] };
  const { total: totalUsers } = usersData || { total: 0 };

  const metricsData: IHomeMetricItemProps[] = useMemo(
    () => [
      {
        metric: { label: 'Posts', count: totalPosts, iconName: 'posts' },
        status: { isLoading: isPostsLoading, isError: isPostsError },
      },
      {
        metric: { label: 'Comments', count: totalComments, iconName: 'comments' },
        status: { isLoading: isCommentsLoading, isError: isCommentsError },
      },
      {
        metric: { label: 'Albums', count: totalAlbums, iconName: 'albums' },
        status: { isLoading: isAlbumsLoading, isError: isAlbumsError },
      },
      {
        metric: { label: 'Photos', count: totalPhotos, iconName: 'photos' },
        status: { isLoading: isPhotosLoading, isError: isPhotosError },
      },
      {
        metric: { label: 'Users', count: totalUsers, iconName: 'users' },
        status: { isLoading: isUsersLoading, isError: isUsersError },
      },
      {
        metric: { label: 'Todos', count: totalTodos, iconName: 'todos' },
        status: { isLoading: isTodosLoading, isError: isTodosError },
      },
    ],
    [
      isPostsLoading,
      isPostsError,
      totalPosts,
      isCommentsLoading,
      isCommentsError,
      totalComments,
      isAlbumsLoading,
      isAlbumsError,
      totalAlbums,
      isPhotosLoading,
      isPhotosError,
      totalPhotos,
      isUsersLoading,
      isUsersError,
      totalUsers,
      isTodosLoading,
      isTodosError,
      totalTodos,
    ],
  );

  const featuredPosts: IFeaturedPostVM[] = useMemo(
    () => (posts ? FeaturedPostMapper.toVMs(posts.slice(0, 4)) : []),
    [posts],
  );

  const featuredPostsProps: ComponentProps<typeof FeaturedPosts> = {
    posts: featuredPosts,
    status: {
      isLoading: isPostsLoading,
      isError: isPostsError,
      isEmpty: featuredPosts.length === 0,
    },
  };

  const galleryItems = useMemo(
    () => (photos ? HomeGalleryMapper.toVMs(photos.slice(0, 4)) : []),
    [photos],
  );

  const homeGalleryProps: ComponentProps<typeof HomeGallery> = {
    items: galleryItems,
    status: {
      isLoading: isPhotosLoading,
      isError: isPhotosError,
      isEmpty: galleryItems.length === 0,
    },
  };

  const ctaBannerData = {
    title: 'Unlock Your Personal Dashboard',
    subtitle:
      'Sign up to access personalized todos, detailed analytics, and full customization options for your workflow.',
    buttonText: 'Create Free Account',
    buttonHref: '/auth/login',
  };

  const DATA_SOURCE = ENV.VITE_DATA_SOURCE;

  return {
    DATA_SOURCE,
    // data

    metricsData,
    featuredPostsProps,
    homeGalleryProps,
    ctaBannerData,
  };
};
