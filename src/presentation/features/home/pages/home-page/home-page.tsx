import { Badge } from 'lib-styleguide-simba/badge';

import { GuestGuard } from '@presentation/shared/guards';

import { FeaturedPosts, HomeCtaBanner, HomeGallery, HomeMetricsStrip } from '../../components';
import { useHomePage } from './use-home-page';
import './home-page.css';

export const HomePage = () => {
  const {
    DATA_SOURCE,
    // data
    metricsData,
    featuredPostsProps,
    homeGalleryProps,
    ctaBannerData,
  } = useHomePage();

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
            <span className="hpc__status-dot" />
            <span>Connected to {DATA_SOURCE}</span>
          </Badge>
        </div>
      </header>

      {/* Metrics Bar Component */}
      <HomeMetricsStrip metrics={metricsData} />

      {/* Main Grid Component Section */}
      <div className="hpc__main-grid">
        <FeaturedPosts {...featuredPostsProps} />
        <HomeGallery {...homeGalleryProps} />
      </div>

      {/* Bottom CTA Banner Component */}
      <GuestGuard>
        <HomeCtaBanner {...ctaBannerData} />
      </GuestGuard>
    </div>
  );
};
