'use client';

import React from 'react';
import Script from 'next/script';

export type RecaptchaPropTypes = {
  className?: string;
  onChange: (_token: string) => void;
  error?: string;
};

declare global {
  interface Window {
    grecaptcha?: any;
    __recaptchaReadyPromise?: Promise<void>;
    __recaptchaReadyResolve?: () => void;
    __recaptchaOnLoad?: () => void;
  }
}

/** Set up the shared reCAPTCHA globals (ready promise + script onload hook). */
const ensureRecaptchaGlobals = () => {
  if (!window.__recaptchaReadyPromise) {
    // one global "ready" promise for first load + client navs
    window.__recaptchaReadyPromise = new Promise<void>((resolve) => {
      window.__recaptchaReadyResolve = resolve;
    });
  }

  // called when the script tag finishes loading
  window.__recaptchaOnLoad = () => {
    if (window.grecaptcha?.ready) {
      window.grecaptcha.ready(() => window.__recaptchaReadyResolve?.());
    } else {
      window.__recaptchaReadyResolve?.();
    }
  };
};

const Recaptcha: React.FC<RecaptchaPropTypes> = ({ className = '', onChange, error }) => {
  const elRef = React.useRef<HTMLDivElement>(null);
  const [widgetId, setWidgetId] = React.useState<number | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    ensureRecaptchaGlobals();

    async function mount() {
      await window.__recaptchaReadyPromise;
      if (cancelled || !elRef.current || !window.grecaptcha) return;

      // if already rendered (e.g., navigating back), just reset
      if (typeof widgetId === 'number') {
        window.grecaptcha.reset(widgetId);
        return;
      }

      const id = window.grecaptcha.render(elRef.current, {
        sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        callback: (token: string) => onChange(token),
        'error-callback': () => onChange(''),
        'expired-callback': () => onChange(''),
      });
      setWidgetId(id);
    }

    mount();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='mb-[1.6rem]'>
      <Script
        src='https://www.google.com/recaptcha/api.js?onload=__recaptchaOnLoad&render=explicit'
        strategy='afterInteractive'
      />
      <div ref={elRef} className={className} />
      {error && <small className='mb-[-0.8rem] text-[1.3rem] text-[red]'>{error}</small>}
    </div>
  );
};

export default Recaptcha;
