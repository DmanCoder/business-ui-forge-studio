import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { buildMetadata } from '@src/lib/seo';

import { PageTypes } from '@src/typescriptGlobals/types';

const SECTIONS = [
  {
    heading: '1. Who we are',
    body: '[Studio legal name, ABN and contact details, to be completed.]',
  },
  {
    heading: '2. What we collect',
    body: '[Enquiry form fields, email correspondence, analytics if enabled, to be completed.]',
  },
  {
    heading: '3. How we use it',
    body: '[Responding to enquiries, scoping projects, service delivery, to be completed.]',
  },
  {
    heading: '4. Storage, access and deletion',
    body: '[Where data is stored, retention, how to request access or deletion, to be completed.]',
  },
];

export async function generateStaticParams() {
  return ALLOWED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Privacy policy',
    description: 'How UI Forge Studio collects, uses and stores your information.',
    path: '/privacy',
    noIndex: true,
  });
}

export default async function PrivacyPage(props: PageTypes) {
  const { locale } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  return (
    <section className='container-prose py-[clamp(6.4rem,10vh,11.2rem)]'>
      <p className='meta-label'>Legal</p>
      <h1 className='font-display mt-[2rem] text-[clamp(3.6rem,5.2vw,6rem)] leading-[1.06] tracking-[-0.015em]'>
        Privacy policy
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
