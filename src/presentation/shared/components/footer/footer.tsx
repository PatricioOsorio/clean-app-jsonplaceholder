import { cn } from 'lib-styleguide-simba/utils';
import type { IFooterProps } from './footer.interfaces';
import './footer.css';

export const Footer = ({ rootProps }: IFooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer {...rootProps} className={cn('footer-container', rootProps?.className)}>
      <div className="fc__wrapper">
        <span className="fc__copyright">&copy; {currentYear} CleanApp</span>
      </div>
    </footer>
  );
};
