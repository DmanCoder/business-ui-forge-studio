import React from 'react';
import type { Metadata } from 'next';

import Cta from '@src/components/ui/Cta';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

/** Global 404. Plain server component — no params, no pathname. */
const NotFound: React.FC = () => (
  <section className='container-site py-[clamp(6.4rem,10vh,11.2rem)]'>
    <p className='meta-label'>Error · 404</p>

    <p className='font-display tnum mt-[2.4rem] text-[clamp(9.6rem,18vw,20rem)] leading-[0.9] tracking-[-0.02em]'>
      4<span className='text-blue italic'>0</span>4
    </p>

    <h1 className='mt-[3.2rem] max-w-[24ch] text-[clamp(2.6rem,3.6vw,4rem)] leading-[1.12] font-semibold tracking-[-0.02em]'>
      This page hasn&apos;t been forged yet
    </h1>

    <p className='text-muted mt-[2rem] max-w-[48ch] text-[1.7rem] leading-[1.6]'>
      The page you are after does not exist or has moved. These will get you back on track:
    </p>

    <div className='mt-[4rem] flex flex-wrap gap-[1.2rem]'>
      <Cta href='/'>Home</Cta>
      <Cta href='/services' variant='secondary'>
        Services
      </Cta>
      <Cta href='/insights' variant='secondary'>
        Insights
      </Cta>
      <Cta href='/start-a-project' variant='secondary'>
        Start a project
      </Cta>
    </div>
  </section>
);

export default NotFound;
