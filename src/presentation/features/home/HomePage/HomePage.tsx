import { Link } from 'react-router';

import './HomePage.css';

export const HomePage = () => {
  return (
    <section className="home-page-container">
      <div className="hpc__grid-bg"></div>

      <div className="hpc__content">
        <div className="hpc__title-wrapper">
          <p className="hpc__system-tag">Sandbox de aprendizaje</p>
          <h1 className="hpc__title">
            Clean Architecture
            <br />
            <span className="hpc__title-highlight">en la práctica.</span>
          </h1>
        </div>

        <p className="hpc__description">
          Dominio agnóstico. Infraestructura enchufable. Presentación reactiva. Una app real
          construida capa por capa.
        </p>

        <Link className="hpc__cta-button" to="/posts">
          Explorar posts
        </Link>
      </div>
    </section>
  );
};
