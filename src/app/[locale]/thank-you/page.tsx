import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Eyebrow from '@src/components/ui/Eyebrow';

import { RESPONSE_TIME } from '@src/config/site';
import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { buildMetadata } from '@src/lib/seo';

import { PageTypes } from '@src/typescriptGlobals/types';

const CHECKLIST = [
  'Two or three websites you like, and what you like about them',
  'What a successful project would change for your business',
  'Any deadlines, events or launches your project needs to meet',
  'Who will look after content, photos and updates on your side',
];

export async function generateStaticParams() {
  return ALLOWED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Enquiry received',
    description: `We reply to every enquiry within ${RESPONSE_TIME}.`,
    path: '/thank-you',
    noIndex: true,
  });
}

export default async function ThankYouPage(props: PageTypes) {
  const { locale } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  return (
    <section className='container-site py-[clamp(6.4rem,10vh,11.2rem)]'>
      <div className='grid gap-[4.8rem] lg:grid-cols-12'>
        <div className='lg:col-span-7'>
          <Eyebrow>Enquiry received</Eyebrow>
          <h1 className='font-display mt-[2.8rem] max-w-[14ch] text-[clamp(3.8rem,6.4vw,8rem)] leading-[1.05] tracking-[-0.015em]'>
            Thanks. Your enquiry is <em className='text-blue'>with us</em>.
          </h1>
          <p className='text-muted mt-[3.2rem] max-w-[54ch] text-[clamp(1.7rem,2vw,2rem)] leading-[1.65]'>
            We reply to every enquiry within {RESPONSE_TIME}, usually with a few questions and a
            suggested next step: a short discovery conversation about your business and goals.
          </p>
          <p className='mt-[3.2rem]'>
            <Link
              href='/'
              className='text-ink decoration-blue hover:text-blue text-[1.5rem] font-semibold underline decoration-2 underline-offset-[0.6rem]'
            >
              ← Back to home
            </Link>
          </p>
        </div>

        <div className='self-start lg:col-span-4 lg:col-start-9'>
          <h2 className='meta-label'>Worth thinking about before we talk</h2>
          <ul className='mt-[1.2rem]'>
            {CHECKLIST.map((item, index) => (
              <li
                key={item}
                className='border-line flex items-baseline gap-[1.4rem] border-t py-[1.6rem] first:border-t-0'
              >
                <span className='tnum text-blue text-[1.3rem] font-medium'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className='text-[1.55rem] leading-[1.6]'>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
