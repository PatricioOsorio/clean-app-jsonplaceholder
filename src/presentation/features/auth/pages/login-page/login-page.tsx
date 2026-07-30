import { Link } from 'react-router';
import { Button } from 'lib-styleguide-simba/button';
import { IconArrowLeft, IconShieldCheck } from 'lib-styleguide-simba/icons';

import { LoginForm } from '@presentation/features/auth/components';
import { BorderGlow } from '@presentation/shared/components/border-glow';
import { SideRays } from '@presentation/shared/components/side-rays';
import { useLoginPage } from './use-login-page';
import './login-page.css';

export const LoginPage = () => {
  const {
    // props
    btnRegisterProps,
    btnLoginProps,
    btnForgotPasswordProps,

    // form
    Input,
  } = useLoginPage();

  return (
    <article className="login-page-container">
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
        className="lpc__background"
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
        className="lpc__border-glow"
      >
        <section className="lpc__content">
          <Button
            asChild
            variant="text"
            size="icon-sm"
            className="lpc__back"
            aria-label="Back to home"
          >
            <Link to="/">
              <IconArrowLeft />
            </Link>
          </Button>

          <header className="lpc__header">
            <span className="lpc__logo" aria-hidden="true">
              <IconShieldCheck />
            </span>
            <h1 className="lpc__title">Welcome back</h1>
            <p className="lpc__subtitle">Enter your credentials to access your account.</p>
          </header>

          <LoginForm
            Input={Input}
            btnLoginProps={btnLoginProps}
            btnRegisterProps={btnRegisterProps}
            btnForgotPasswordProps={btnForgotPasswordProps}
          />
        </section>
      </BorderGlow>

      <div className="circle-glow circle-glow-1" />
      <div className="circle-glow circle-glow-2" />
    </article>
  );
};
