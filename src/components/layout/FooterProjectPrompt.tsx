'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import Cta from '@src/components/ui/Cta';

import { CTA_ITEM, RESPONSE_TIME } from '@src/config/site';
import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';

const EXACT_PATHS_WITH_OWN_CLOSING = new Set([
  '/about',
  '/process',
  '/services',
  '/start-a-project',
  '/testimonials',
  '/thank-you',
]);

const normalizePath = (pathname: string) => {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length > 0 && ALLOWED_LOCALES.includes(parts[0])) parts.shift();
  return `/${parts.join('/')}`;
};

/**
 * Large global project prompt. Pages with their own final project action omit
 * this block so the footer does not repeat the same conversion moment twice.
 */
const FooterProjectPrompt: React.FC = () => {
  const current = normalizePath(usePathname() ?? '/');
  const hasOwnClosing =
    EXACT_PATHS_WITH_OWN_CLOSING.has(current) ||
    current.startsWith('/services/') ||
    current.startsWith('/work/');

  if (hasOwnClosing) return null;

  return (
    <div className='container-site border-b border-white/12 py-[clamp(4.8rem,7vh,7.2rem)]'>
      <div className='grid items-end gap-[3.2rem] lg:grid-cols-12'>
        <div className='lg:col-span-7'>
          <p className='meta-label text-muted-dark'>Project enquiries</p>
          <p className='font-display mt-[1.8rem] max-w-[20ch] text-[clamp(3rem,4.6vw,5.2rem)] leading-[1.06] text-white'>
            Bring the business problem. We will help shape the{' '}
            <span className='text-blue-soft italic'>right brief</span>.
          </p>
        </div>
        <div className='flex flex-col items-start gap-[1.8rem] lg:col-span-4 lg:col-start-9'>
          <p className='text-muted-dark max-w-[38ch] text-[1.5rem] leading-[1.65]'>
            Every enquiry is read by the founder and answered within {RESPONSE_TIME}.
          </p>
          <Cta href={CTA_ITEM.href} onDark withArrow>
            Tell us about the project
          </Cta>
        </div>
      </div>
    </div>
  );
};

export default FooterProjectPrompt;
