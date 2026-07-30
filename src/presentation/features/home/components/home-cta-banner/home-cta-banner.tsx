import { Link } from 'react-router';
import { Button } from 'lib-styleguide-simba/button';
import { IconArrowRight } from 'lib-styleguide-simba/icons';
import { cn } from 'lib-styleguide-simba/utils';

import type { IHomeCtaBannerProps } from './home-cta-banner.interfaces';
import './home-cta-banner.css';

export const HomeCtaBanner = ({
  title,
  subtitle,
  buttonText,
  buttonHref,
  rootProps,
}: IHomeCtaBannerProps) => {
  return (
    <section {...rootProps} className={cn('home-cta-banner-container', rootProps?.className)}>
      <div className="hcb__cta-text-container">
        <h2 className="hcb__cta-title">{title}</h2>
        <p className="hcb__cta-subtitle">{subtitle}</p>
      </div>

      <Button asChild rounded severity="primary">
        <Link to={buttonHref}>
          <span>{buttonText}</span>
          <IconArrowRight className="h-4 w-4 shrink-0" />
        </Link>
      </Button>
    </section>
  );
};
