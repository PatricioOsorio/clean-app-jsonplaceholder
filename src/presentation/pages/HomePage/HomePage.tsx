import { useDependencies } from '@presentation/context/dependencies.context';
import './HomePage.css';

export const HomePage = () => {
  const { } = useDependencies();
  return (
    <section className="home-page">
      <h1 className="hp__title">HomePage</h1>
      <p>lorem ipsum dolor sit amet</p>
    </section>
  );
};
