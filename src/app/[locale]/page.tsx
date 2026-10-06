import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Eyebrow from '@src/components/ui/Eyebrow';
import Cta from '@src/components/ui/Cta';
import LatestInsights from '@src/components/insights/LatestInsights';
import SelectedWork from '@src/components/work/SelectedWork';
import TestimonialsSection from '@src/components/work/TestimonialsSection';
import StudioImage from '@src/components/media/StudioImage';
import { HOMEPAGE_SIGNATURE } from '@src/lib/assets';

import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, RESPONSE_TIME } from '@src/config/site';
import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { buildMetadata, webPageSchema, jsonLd } from '@src/lib/seo';
import {
  HERO,
  STATEMENT,
  PROBLEMS,
  BUILD_FEATURED,
  BUILD_CARDS,
  PLATFORM,
  PHASES,
  WHY,
  SCOPING,
} from '@src/content/home';

import { PageTypes } from '@src/typescriptGlobals/types';

/** Credits-style studio facts under the hero. */
const STUDIO_FACTS = [
  { label: 'Model', value: 'Founder-led' },
  { label: 'Base', value: 'Australia · remote' },
  { label: 'Craft', value: 'Design + development' },
  { label: 'Response', value: `Within ${RESPONSE_TIME}` },
];

export async function generateStaticParams() {
  return ALLOWED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...buildMetadata({
      title: `Australian web design and development studio | ${SITE_NAME}`,
      description: SITE_DESCRIPTION,
      path: '/',
    }),
    title: { absolute: `Australian web design and development studio | ${SITE_NAME}` },
  };
}

export default async function HomePage(props: PageTypes) {
  const { locale } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  const capabilities: { title: string; body: string; href: string; badge?: string }[] = [
    BUILD_FEATURED,
    ...BUILD_CARDS,
  ];

  return (
    <>
      {/* Hero — editorial statement + credits ledger */}
      <section className='container-site pt-[clamp(6.4rem,10vh,11.2rem)] pb-[clamp(4.8rem,8vh,8rem)]'>
        <Eyebrow>{HERO.eyebrow}</Eyebrow>
        <h1 className='font-display mt-[3.2rem] max-w-[14ch] text-[clamp(4.6rem,8.5vw,10.4rem)] leading-[1.02] font-normal tracking-[-0.015em]'>
          Custom websites and digital products, <em className='text-blue'>designed and built</em>{' '}
          around your business.
        </h1>
        <div className='mt-[4rem] grid gap-[3.2rem] lg:grid-cols-12'>
          <p className='text-muted max-w-[52ch] text-[clamp(1.7rem,2vw,2rem)] leading-[1.6] lg:col-span-7'>
            {HERO.lead}
          </p>
          <div className='flex flex-wrap items-start gap-[1.6rem] lg:col-span-5 lg:justify-end'>
            <Cta href='/start-a-project' withArrow>
              Start a project
            </Cta>
            <Cta href='/work' variant='secondary'>
              View our work
            </Cta>
          </div>
        </div>

        {/* Signature visual — design precision + technical implementation as one system */}
        <figure className='border-edge mt-[6.4rem] border'>
          <StudioImage asset={HOMEPAGE_SIGNATURE} className='h-auto w-full' />
        </figure>

        {/* Studio facts */}
        <dl className='border-edge mt-[6.4rem] grid grid-cols-2 gap-y-[2.4rem] border-t pt-[2.4rem] md:grid-cols-4'>
          {STUDIO_FACTS.map((fact) => (
            <div key={fact.label}>
              <dt className='meta-label'>{fact.label}</dt>
              <dd className='mt-[0.8rem] text-[1.5rem] font-medium'>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Statement */}
      <section className='border-edge border-t'>
        <div className='container-site section-pad'>
          <p className='font-display max-w-[28ch] text-[clamp(2.8rem,4.2vw,4.8rem)] leading-[1.22] tracking-[-0.01em] text-pretty'>
            {STATEMENT}
          </p>
        </div>
      </section>

      {/* Problems we solve — ledger rows */}
      <section className='border-edge border-t'>
        <div className='container-site section-pad grid gap-[4rem] lg:grid-cols-12'>
          <div className='lg:col-span-4'>
            <Eyebrow index='01'>Problems we solve</Eyebrow>
            <h2 className='mt-[2rem] max-w-[12ch] text-[clamp(2.8rem,3.6vw,4rem)] leading-[1.1] font-semibold'>
              Sound familiar?
            </h2>
          </div>
          <ul className='lg:col-span-8'>
            {PROBLEMS.map((problem, index) => (
              <li
                key={problem.title}
                className={`border-line grid gap-[0.8rem] py-[2.4rem] md:grid-cols-[6rem_1fr] ${
                  index === 0 ? '' : 'border-t'
                }`}
              >
                <span className='tnum text-muted-dark text-[1.3rem] font-medium'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className='text-[1.8rem] font-semibold'>{problem.title}</h3>
                  <p className='text-muted mt-[0.6rem] max-w-[62ch] text-[1.55rem] leading-[1.6]'>
                    {problem.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What we build — numbered capability index */}
      <section className='border-edge border-t'>
        <div className='container-site section-pad'>
          <div className='grid gap-[2rem] lg:grid-cols-12'>
            <div className='lg:col-span-4'>
              <Eyebrow index='02'>What we build</Eyebrow>
            </div>
            <h2 className='max-w-[22ch] text-[clamp(2.8rem,3.6vw,4rem)] leading-[1.1] font-semibold lg:col-span-8'>
              Built for the way your business works
            </h2>
          </div>

          <div className='mt-[5.6rem]'>
            {capabilities.map((item, index) => (
              <article
                key={item.title}
                className='border-edge grid gap-[1.2rem] border-t py-[3.2rem] md:grid-cols-12 md:gap-[2rem]'
              >
                <span className='tnum text-muted-dark text-[1.3rem] font-medium md:col-span-1'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className='md:col-span-4'>
                  <h3 className='text-[clamp(2rem,2.4vw,2.6rem)] leading-[1.2] font-semibold'>
                    {item.title}
                  </h3>
                  {item.badge && (
                    <p className='text-blue mt-[1rem] text-[1.25rem] font-semibold tracking-[0.12em] uppercase'>
                      {item.badge}
                    </p>
                  )}
                </div>
                <p className='text-muted max-w-[64ch] text-[1.55rem] leading-[1.65] md:col-span-7'>
                  {item.body}
                  <Link
                    href={item.href}
                    className='text-ink decoration-blue hover:text-blue mt-[1.2rem] block w-fit font-semibold underline decoration-2 underline-offset-[0.5rem]'
                  >
                    Explore this service →
                  </Link>
                </p>
              </article>
            ))}
          </div>

          {/* Platform matrix — hairline cell grid, facts not logos */}
          <div className='bg-edge mt-[5.6rem] grid grid-cols-2 gap-[1px] border border-[color:var(--color-edge)] md:grid-cols-4'>
            {[
              'Next.js',
              'React + React Native',
              'Shopify + Hydrogen',
              'WordPress',
              'Webflow',
              'HubSpot CMS',
              'Performance + SEO',
              'Accessibility',
            ].map((platform) => (
              <div key={platform} className='bg-paper px-[2rem] py-[1.8rem]'>
                <span className='text-[1.45rem] font-medium'>{platform}</span>
              </div>
            ))}
          </div>

          <p className='mt-[3.2rem]'>
            <Link
              href='/services'
              className='text-ink hover:text-blue text-[1.5rem] font-semibold underline decoration-[color:var(--color-blue)] decoration-2 underline-offset-[0.6rem]'
            >
              Explore services →
            </Link>
          </p>
        </div>
      </section>

      {/* The right platform */}
      <section className='border-edge border-t'>
        <div className='container-site section-pad grid gap-[4rem] lg:grid-cols-12'>
          <div className='lg:col-span-5'>
            <Eyebrow index='03'>{PLATFORM.eyebrow}</Eyebrow>
            <h2 className='font-display mt-[2rem] max-w-[16ch] text-[clamp(3rem,4.4vw,5.2rem)] leading-[1.08] font-normal'>
              {PLATFORM.heading}
            </h2>
          </div>
          <div className='lg:col-span-6 lg:col-start-7'>
            <p className='text-muted text-[1.6rem] leading-[1.7]'>{PLATFORM.body}</p>
            <ol className='mt-[4rem] flex list-none flex-col'>
              {PLATFORM.steps.map((step, index) => (
                <li
                  key={step}
                  className='border-line flex gap-[2rem] border-t py-[2rem] first:border-t-0 first:pt-0'
                >
                  <span className='tnum text-blue text-[1.4rem] font-semibold'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className='text-[1.6rem] leading-[1.6]'>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Selected work — real projects, proof after value */}
      <SelectedWork eyebrowIndex='04' />

      {/* How we work — dark ledger */}
      <section className='bg-ink text-white'>
        <div className='container-site section-pad'>
          <div className='grid gap-[2rem] lg:grid-cols-12'>
            <div className='lg:col-span-4'>
              <Eyebrow index='05' onDark>
                How we work
              </Eyebrow>
            </div>
            <h2 className='max-w-[24ch] text-[clamp(2.8rem,3.6vw,4rem)] leading-[1.12] font-semibold text-white lg:col-span-8'>
              A clear process, from first conversation to ongoing support
            </h2>
          </div>

          <ol className='mt-[5.6rem] grid list-none gap-x-[3.2rem] md:grid-cols-2 lg:grid-cols-4'>
            {PHASES.map((phase, index) => (
              <li key={phase.name} className='border-t border-white/15 py-[2rem]'>
                <p className='tnum text-blue-soft text-[1.3rem] font-medium'>
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className='mt-[1rem] text-[1.7rem] font-semibold text-white'>{phase.name}</h3>
                <p className='text-muted-dark mt-[0.8rem] text-[1.45rem] leading-[1.55]'>
                  {phase.body}
                </p>
              </li>
            ))}
          </ol>

          <p className='mt-[3.2rem]'>
            <Link
              href='/process'
              className='hover:text-blue-soft text-[1.5rem] font-semibold text-white underline decoration-[color:var(--color-blue-soft)] decoration-2 underline-offset-[0.6rem]'
            >
              See the full process →
            </Link>
          </p>
        </div>
      </section>

      {/* Why UI Forge Studio */}
      <section className='border-edge border-t'>
        <div className='container-site section-pad grid gap-[4rem] lg:grid-cols-12'>
          <div className='lg:col-span-5'>
            <Eyebrow index='06'>{WHY.eyebrow}</Eyebrow>
            <h2 className='font-display mt-[2rem] max-w-[14ch] text-[clamp(3rem,4.4vw,5.2rem)] leading-[1.08] font-normal'>
              {WHY.heading}
            </h2>
            <p className='text-muted mt-[2.4rem] max-w-[48ch] text-[1.6rem] leading-[1.7]'>
              {WHY.body}{' '}
              <Link
                href='/about'
                className='text-ink hover:text-blue font-semibold underline decoration-[color:var(--color-blue)] decoration-2 underline-offset-[0.4rem]'
              >
                More about the studio →
              </Link>
            </p>
          </div>
          <ul className='lg:col-span-6 lg:col-start-7'>
            {WHY.points.map((point, index) => (
              <li
                key={point.title}
                className={`border-line py-[2.4rem] ${index === 0 ? '' : 'border-t'}`}
              >
                <h3 className='text-[1.7rem] font-semibold'>{point.title}</h3>
                <p className='text-muted mt-[0.6rem] text-[1.5rem] leading-[1.6]'>{point.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Verified client feedback — renders only when real testimonials exist */}
      <TestimonialsSection />

      {/* Scoping and investment */}
      <section className='border-edge border-t'>
        <div className='container-site section-pad grid gap-[3.2rem] lg:grid-cols-12'>
          <div className='lg:col-span-4'>
            <Eyebrow index='07'>{SCOPING.eyebrow}</Eyebrow>
          </div>
          <div className='lg:col-span-8'>
            <h2 className='max-w-[26ch] text-[clamp(2.8rem,3.6vw,4rem)] leading-[1.12] font-semibold'>
              {SCOPING.heading}
            </h2>
            <p className='text-muted mt-[2.4rem] max-w-[68ch] text-[1.6rem] leading-[1.7]'>
              {SCOPING.body}
            </p>
            <p className='mt-[2.4rem]'>
              <Link
                href={SCOPING.link.href}
                className='text-ink hover:text-blue text-[1.5rem] font-semibold underline decoration-[color:var(--color-blue)] decoration-2 underline-offset-[0.6rem]'
              >
                {SCOPING.link.label}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Latest insights */}
      <LatestInsights />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            webPageSchema({
              title: `${SITE_NAME} — ${SITE_TAGLINE}`,
              description: SITE_DESCRIPTION,
              path: '/',
            })
          ),
        }}
      />
    </>
  );
}
