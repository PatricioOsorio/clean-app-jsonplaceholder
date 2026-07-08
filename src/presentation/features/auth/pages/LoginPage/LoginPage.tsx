import { LoginForm } from '@presentation/features/auth/components';
import { BorderGlow } from '@presentation/shared/components/BorderGlow';
import { useLoginPage } from './useLoginPage';
import './LoginPage.css';
import { SideRays } from '@presentation/shared/components/SideRays';

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
        speed={2.5}
        rayColor1="#5617da"
        rayColor2="#4985c3"
        intensity={2}
        spread={2}
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
        glowColor="40 80 80"
        borderRadius={28}
        glowRadius={40}
        glowIntensity={1}
        coneSpread={25}
        colors={['#c084fc', '#f472b6', '#38bdf8']}
        fillOpacity={0.3}
        backgroundColor="hsl(var(--card))"
        className="lpc__border-glow"
      >
        <section className="lpc__inner">
          <header className="lpc__header">
            <span className="lpc__eyebrow">Secure sign-in</span>
            <h1 className="lpc__title">Welcome back</h1>
            <p className="lpc__subtitle">Sign in to continue</p>
          </header>

          <LoginForm
            Input={Input}
            btnLoginProps={btnLoginProps}
            btnRegisterProps={btnRegisterProps}
            btnForgotPasswordProps={btnForgotPasswordProps}
          />
        </section>
      </BorderGlow>
    </article>
  );
};
