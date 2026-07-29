import { cn } from 'lib-styleguide-simba/utils';

import type { IFooterProps } from './footer.interfaces';

import './footer.css';

export const Footer = ({ rootProps }: IFooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer {...rootProps} className={cn('footer-container', rootProps?.className)}>
      <div className="fc__wrapper">
        <div className="fc__brand">
          <span className="fc__logo">◈</span>
          <span className="fc__title">CleanApp</span>
        </div>
        <p className="fc__copyright">
          &copy; {currentYear} CleanApp. Built with Clean Architecture.
        </p>
        <div className="fc__links">
          <a
            className="fc__link"
            href="https://jsonplaceholder.typicode.com/"
            rel="noreferrer"
            target="_blank"
          >
            JSONPlaceholder API
          </a>
          <span className="fc__separator">•</span>
          <a className="fc__link" href="https://react.dev" rel="noreferrer" target="_blank">
            React 19
          </a>
        </div>
      </div>
    </footer>
  );
};
