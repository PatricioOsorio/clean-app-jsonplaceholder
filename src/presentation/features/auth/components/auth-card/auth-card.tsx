import { Link } from 'react-router';
import { Button } from 'lib-styleguide-simba/button';
import { IconArrowLeft, IconShieldCheck } from 'lib-styleguide-simba/icons';
import { cn } from 'lib-styleguide-simba/utils';

import { BorderGlow } from '@presentation/shared/components/border-glow';
import { SideRays } from '@presentation/shared/components/side-rays';
import type { IAuthCardProps } from './auth-card.interfaces';
import './auth-card.css';

export const AuthCard = ({ title, subtitle, children, rootProps }: IAuthCardProps) => {
  return (
    <article className={cn('auth-card-container', rootProps?.className)}>
      <SideRays
        speed={0.5}
        rayColor1="#2dd4bf"
        rayColor2="#14b8a6"
        intensity={1.5}
        spread={1}
        origin="top-right"
        tilt={0}
        saturation={1.5}
        blend={0.75}
        falloff={1.6}
        opacity={0.5}
        className="acc__background"
      />

      <BorderGlow
        animated
        edgeSensitivity={30}
        glowColor="20 183 166"
        borderRadius={28}
        glowRadius={24}
        glowIntensity={1}
        coneSpread={25}
        colors={['#2dd4bf', '#5eead4', '#14b8a6']}
        fillOpacity={0.5}
        backgroundColor="hsl(var(--card))"
        className="acc__border-glow"
      >
        <section className="acc__content">
          <Button
            asChild
            variant="text"
            size="icon-sm"
            className="acc__back"
            aria-label="Back to home"
          >
            <Link to="/">
              <IconArrowLeft />
            </Link>
          </Button>

          <header className="acc__header">
            <span className="acc__logo" aria-hidden="true">
              <IconShieldCheck />
            </span>
            <h1 className="acc__title">{title}</h1>
            <p className="acc__subtitle">{subtitle}</p>
          </header>

          {children}
        </section>
      </BorderGlow>

      <div className="circle-glow circle-glow-1" />
      <div className="circle-glow circle-glow-2" />
    </article>
  );
};
