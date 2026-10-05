import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Eyebrow from '@src/components/ui/Eyebrow';
import StartProjectForm from '@src/components/forms/StartProjectForm';
import StudioImage from '@src/components/media/StudioImage';

import { START_PROJECT_VISUAL } from '@src/lib/assets';
import { CONTACT_EMAIL, RESPONSE_TIME } from '@src/config/site';
import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { buildMetadata, webPageSchema, breadcrumbSchema, jsonLd } from '@src/lib/seo';
import { START_INTRO } from '@src/content/start-project';

import { PageTypes } from '@src/typescriptGlobals/types';

const PAGE_TITLE = 'Start a project';
const PAGE_DESCRIPTION =
  'Tell us about your project. No jargon needed — describe your business and what you want to achieve, and we will come back with questions and a recommended approach.';

/** Expectation-setting: what happens after the form is sent. */
const NEXT_STEPS = [
  {
    label: 'We read it — properly',
    body: `Every enquiry is read by the founder and answered within ${RESPONSE_TIME}.`,
  },
  {
    label: 'A short video call',
    body: 'We suggest a time to talk it through — questions, context, and whether we are the right fit.',
  },
  {
    label: 'A written proposal',
    body: 'Recommended approach, scope, timeline and investment, in plain language.',
  },
];

export async function generateStaticParams() {
  return ALLOWED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: '/start-a-project',
  });
}

export default async function StartProjectPage(props: PageTypes) {
  const { locale } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  return (
    <>
      {/* Page header */}
      <section className='container-site pt-[clamp(6.4rem,10vh,11.2rem)] pb-[clamp(4rem,6vh,6.4rem)]'>
        <Eyebrow>{START_INTRO.eyebrow}</Eyebrow>
        <h1 className='font-display mt-[2.8rem] max-w-[16ch] text-[clamp(4rem,7vw,8.8rem)] leading-[1.03] font-normal tracking-[-0.015em]'>
          {START_INTRO.heading}
        </h1>
        <p className='text-muted mt-[3.2rem] max-w-[54ch] text-[clamp(1.7rem,2vw,2rem)] leading-[1.6]'>
          {START_INTRO.p1}
        </p>
      </section>

      {/* Split: expectation rail + form */}
      <section className='border-edge border-t'>
        <div className='container-site grid gap-[5.6rem] py-[clamp(4.8rem,8vh,8rem)] lg:grid-cols-12'>
          <aside className='self-start lg:sticky lg:top-[9.6rem] lg:col-span-4'>
            <h2 className='meta-label'>What happens next</h2>
            <ol className='mt-[1.6rem] list-none'>
              {NEXT_STEPS.map((step, index) => (
                <li
                  key={step.label}
                  className='border-line flex gap-[1.8rem] border-t py-[2rem] first:border-t-0 first:pt-[0.8rem]'
                >
                  <span className='tnum text-blue text-[1.4rem] font-semibold'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className='block text-[1.6rem] font-semibold'>{step.label}</span>
                    <span className='text-muted mt-[0.6rem] block text-[1.45rem] leading-[1.6]'>
                      {step.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <div className='border-edge mt-[2.4rem] border-t pt-[2.4rem]'>
              <p className='text-[1.5rem] leading-[1.65]'>
                {START_INTRO.emailPrefix}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className='text-ink decoration-blue hover:text-blue font-semibold underline decoration-2 underline-offset-[0.4rem]'
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className='text-muted mt-[1rem] text-[1.45rem] leading-[1.6]'>{START_INTRO.p2}</p>
            </div>

            {/* Restrained supporting schematic — brief → recommendation → proposal */}
            <figure className='border-edge mt-[2.4rem] hidden border lg:block'>
              <StudioImage
                asset={START_PROJECT_VISUAL}
                sizes='(min-width: 1024px) 30vw, 100vw'
                className='h-auto w-full'
              />
            </figure>
          </aside>

          <div className='lg:col-span-7 lg:col-start-6'>
            <StartProjectForm />
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
              path: '/start-a-project',
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
              { name: 'Start a project', path: '/start-a-project' },
            ])
          ),
        }}
      />
    </>
  );
}
