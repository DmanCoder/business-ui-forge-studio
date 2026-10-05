import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Eyebrow from '@src/components/ui/Eyebrow';
import Cta from '@src/components/ui/Cta';
import StudioImage from '@src/components/media/StudioImage';

import { PROCESS_MAP } from '@src/lib/assets';
import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { buildMetadata, webPageSchema, breadcrumbSchema, jsonLd } from '@src/lib/seo';
import {
  PROCESS_HEADING,
  PROCESS_INTRO,
  PROCESS_PHASES,
  PROCESS_CLOSING,
} from '@src/content/process';

import { PageTypes } from '@src/typescriptGlobals/types';

const PAGE_TITLE = 'Process';
const PAGE_DESCRIPTION =
  'Seven phases, explained in plain language — at every stage you know what we are working on, what we need from you and what comes next.';
const PAGE_PATH = '/process';

export async function generateStaticParams() {
  return ALLOWED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  });
}

export default async function ProcessPage(props: PageTypes) {
  const { locale } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  return (
    <>
      {/* Page header */}
      <section className='container-site pt-[clamp(6.4rem,10vh,11.2rem)] pb-[clamp(4.8rem,8vh,8rem)]'>
        <Eyebrow>Process</Eyebrow>
        <h1 className='font-display mt-[2.8rem] max-w-[16ch] text-[clamp(4rem,7vw,8.8rem)] leading-[1.03] font-normal tracking-[-0.015em]'>
          {PROCESS_HEADING}
        </h1>
        <div className='mt-[3.2rem] grid gap-[2.4rem] lg:grid-cols-12'>
          <p className='text-muted max-w-[56ch] text-[clamp(1.7rem,2vw,2rem)] leading-[1.6] lg:col-span-7'>
            {PROCESS_INTRO}
          </p>
          <p className='tnum text-muted-dark self-end text-[1.3rem] font-medium lg:col-span-4 lg:col-start-9 lg:text-right'>
            07 phases · one accountable point of contact
          </p>
        </div>
      </section>

      {/* Process map — one schematic overview of all seven phases */}
      <section className='border-edge border-t'>
        <figure className='container-site section-pad'>
          <div className='border-edge border'>
            <StudioImage
              asset={PROCESS_MAP}
              sizes='(min-width: 1280px) 1200px, 100vw'
              className='h-auto w-full'
            />
          </div>
          <figcaption className='meta-label mt-[1.6rem]'>
            The seven phases at a glance — design, development and care as one line.
          </figcaption>
        </figure>
      </section>

      {/* The seven phases — editorial ledger */}
      <section>
        {PROCESS_PHASES.map((phase, index) => (
          <article key={phase.name} className='border-edge border-t'>
            <div className='container-site grid gap-[2.4rem] py-[clamp(4rem,7vh,6.4rem)] lg:grid-cols-12'>
              <div className='flex items-start gap-[2.4rem] lg:col-span-5'>
                <span className='font-display tnum text-blue text-[clamp(5.6rem,8vw,9.6rem)] leading-[0.9]'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className='pt-[0.8rem] text-[clamp(2.4rem,3.2vw,3.6rem)] leading-[1.08] font-semibold'>
                  {phase.name}
                </h2>
              </div>
              <div className='lg:col-span-6 lg:col-start-7'>
                <p className='max-w-[60ch] text-[1.65rem] leading-[1.7]'>{phase.description}</p>
                <dl className='border-line mt-[2.4rem] max-w-[60ch] border-t pt-[1.6rem]'>
                  <dt className='meta-label'>You get</dt>
                  <dd className='text-muted mt-[0.8rem] text-[1.55rem] leading-[1.6]'>
                    {phase.deliverable}
                  </dd>
                </dl>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Closing */}
      <section className='border-edge border-t'>
        <div className='container-site section-pad grid items-end gap-[3.2rem] lg:grid-cols-12'>
          <div className='lg:col-span-8'>
            <h2 className='font-display max-w-[16ch] text-[clamp(2.8rem,4.2vw,4.8rem)] leading-[1.12]'>
              {PROCESS_CLOSING.heading}
            </h2>
            <p className='text-muted mt-[1.6rem] max-w-[48ch] text-[1.6rem] leading-[1.6]'>
              {PROCESS_CLOSING.body}
            </p>
          </div>
          <div className='lg:col-span-4 lg:justify-self-end'>
            <Cta href={PROCESS_CLOSING.cta.href} withArrow>
              {PROCESS_CLOSING.cta.label}
            </Cta>
          </div>
        </div>
      </section>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            webPageSchema({
              title: PAGE_TITLE,
              description: PAGE_DESCRIPTION,
              path: PAGE_PATH,
            })
          ),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Process', path: PAGE_PATH },
            ])
          ),
        }}
      />
    </>
  );
}
