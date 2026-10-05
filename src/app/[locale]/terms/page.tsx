import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { buildMetadata } from '@src/lib/seo';

import { PageTypes } from '@src/typescriptGlobals/types';

const SECTIONS = [
  {
    heading: '1. Engagement and scope',
    body: '[Proposal, scope agreement, deposit terms, to be completed.]',
  },
  {
    heading: '2. Payment',
    body: '[Invoicing schedule, payment terms, to be completed.]',
  },
  {
    heading: '3. Ownership and handover',
    body: '[Client-owned assets, IP on delivered work, offboarding process, to be completed.]',
  },
  {
    heading: '4. Ongoing care',
    body: '[Care plan terms, cancellation, transfer process, to be completed.]',
  },
];

export async function generateStaticParams() {
  return ALLOWED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Terms of service',
    description: 'The terms under which UI Forge Studio takes on and delivers project work.',
    path: '/terms',
    noIndex: true,
  });
}

export default async function TermsPage(props: PageTypes) {
  const { locale } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  return (
    <section className='container-prose py-[clamp(6.4rem,10vh,11.2rem)]'>
      <p className='meta-label'>Legal</p>
      <h1 className='font-display mt-[2rem] text-[clamp(3.6rem,5.2vw,6rem)] leading-[1.06] tracking-[-0.015em]'>
        Terms of service
      </h1>

      <p className='border-blue text-muted mt-[3.2rem] border-l-2 pl-[2rem] text-[1.5rem] leading-[1.6]'>
        <strong>Internal note (not for production):</strong> structural stub. Each section below
        must be completed with real legal content by the founder before launch. Do not publish this
        page until then.
      </p>

      <div className='mt-[4.8rem]'>
        {SECTIONS.map((section) => (
          <div key={section.heading} className='border-line border-t py-[2.4rem] first:border-t-0'>
            <h2 className='text-[2rem] font-semibold'>{section.heading}</h2>
            <p className='text-muted mt-[0.8rem] text-[1.6rem] leading-[1.6]'>{section.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
