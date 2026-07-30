import { Badge } from 'lib-styleguide-simba/badge';

import {
  FeaturedPosts,
  HomeCtaBanner,
  HomeGallery,
  HomeMetricsStrip,
  type IFeaturedPostVM,
  type IHomeGalleryItemVM,
  type IHomeMetricItemVM,
} from '../components';
import './home-page.css';

export const HomePage = () => {
  const metricsData: IHomeMetricItemVM[] = [
    { label: 'Posts', count: '100', iconName: 'posts' },
    { label: 'Comments', count: '500', iconName: 'comments' },
    { label: 'Albums', count: '100', iconName: 'albums' },
    { label: 'Photos', count: '5,000', iconName: 'photos' },
    { label: 'Users', count: '10', iconName: 'users' },
    { label: 'Todos', count: '200', iconName: 'todos' },
  ];

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

  return (
    <div className="home-page-container">
      {/* Header Section */}
      <header className="hpc__header">
        <div className="hpc__header-text">
          <h1 className="hpc__title">Explore</h1>
          <p className="hpc__subtitle">
            Discover the latest JSONPlaceholder updates and featured REST resources.
          </p>
        </div>

        <div className="hpc__header-actions">
          <Badge className="hpc__status-pill">
            <span className="hpc__status-dot bg-emerald-500" />
            <span>REST API Connected</span>
          </Badge>
          <Badge variant="outline" className="hpc__arch-pill">
            Clean Architecture v3.0
          </Badge>
        </div>
      </header>

      {/* Metrics Bar Component */}
      <HomeMetricsStrip metrics={metricsData} />

      {/* Main Grid Component Section */}
      <div className="hpc__main-grid">
        <FeaturedPosts posts={featuredPostsData} />
        <HomeGallery items={galleryItemsData} />
      </div>

      {/* Bottom CTA Banner Component */}
      <HomeCtaBanner {...ctaBannerData} />
    </div>
  );
};
