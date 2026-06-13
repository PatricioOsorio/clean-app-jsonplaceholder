import { Link } from 'react-router-dom';

import './HomePage.css';

export const HomePage = () => {
  return (
    <section className="home-page-container">
      <div className="hpc__grid-bg"></div>

      <div className="hpc__content">
        <div className="hpc__title-wrapper">
          <p className="hpc__system-tag">[ System // Sandbox ]</p>
          <h1 className="hpc__title">
            CLEAN ARCHITECTURE
            <br />
            <span className="hpc__title-highlight">BLUEPRINT.</span>
          </h1>
        </div>

        <p className="hpc__description">
          Implementación purista. Dominio agnóstico. Infraestructura enchufable. Presentación
          reactiva.
        </p>

        <Link className="hpc__cta-button" to="/posts">
          <span className="hpc__cta-border"></span>[ INICIAR_SISTEMA ]
        </Link>
      </div>
    </section>
  );
};
