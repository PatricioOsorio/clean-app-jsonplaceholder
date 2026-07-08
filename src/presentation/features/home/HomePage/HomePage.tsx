import { Link } from 'react-router';

import './HomePage.css';

export const HomePage = () => {
  return (
    <section className="home-page-container">
      <div className="hpc__grid-bg"></div>

      <div className="hpc__content">
        <div className="hpc__title-wrapper">
          <p className="hpc__system-tag">Learning sandbox</p>
          <h1 className="hpc__title">
            Clean Architecture
            <br />
            <span className="hpc__title-highlight">in practice.</span>
          </h1>
        </div>

        <p className="hpc__description">
          Domain agnostic. Infrastructure pluggable. Presentation reactive. A real app built layer
          by layer.
        </p>

        <Link className="hpc__cta-button" to="/posts">
          Explore posts
        </Link>
      </div>
    </section>
  );
};
