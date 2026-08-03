import { DEFAULT_POSTS_PARAMS, usePosts } from '@presentation/features/posts/hooks';
import { useMemo } from 'react';
import type { IFeaturedPostVM, IHomeGalleryItemVM, IHomeMetricItemProps } from '../../components';
import { useComments } from '@presentation/features/comments/hooks';
import { ENV } from '@infrastructure/utils';

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

  const { total: totalPosts } = postsData || { total: 0 };
  const { total: totalComments } = commentsData || { total: 0 };

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
        metric: { label: 'Albums', count: '100', iconName: 'albums' },
        status: { isLoading: false, isEmpty: true, isError: true },
      },
      {
        metric: { label: 'Photos', count: '5,000', iconName: 'photos' },
        status: { isLoading: false, isEmpty: true },
      },
      {
        metric: { label: 'Users', count: '10', iconName: 'users' },
        status: { isLoading: false, isEmpty: true },
      },
      {
        metric: { label: 'Todos', count: '200', iconName: 'todos' },
        status: { isLoading: false, isEmpty: true },
      },
    ],
    [isPostsLoading, isPostsError, totalPosts],
  );

  const featuredPostsData: IFeaturedPostVM[] = [
    {
      id: 1,
      title: 'sunt aut facere repellat provident occaecati...',
      body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut...',
      user: '@user_1',
    },
    {
      id: 2,
      title: 'qui est esse',
      body: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis... voluptatem porro vel nihil molestiae',
      user: '@user_1',
    },
    {
      id: 3,
      title: 'ea molestias quasi exercitationem repellat qui',
      body: 'et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel...',
      user: '@user_2',
    },
    {
      id: 4,
      title: 'eum et est occaecati',
      body: 'ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem',
      user: '@user_2',
    },
  ];

  const galleryItemsData: IHomeGalleryItemVM[] = [
    {
      id: 1,
      title: 'accusamus beatae',
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80',
    },
    {
      id: 2,
      title: 'reprehenderit est',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80',
    },
    {
      id: 3,
      title: 'officia porro',
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80',
    },
    {
      id: 4,
      title: 'culpa odio',
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80',
    },
  ];

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
    featuredPostsData,
    galleryItemsData,
    ctaBannerData,
  };
};
