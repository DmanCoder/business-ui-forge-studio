import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Eyebrow from '@src/components/ui/Eyebrow';
import Cta from '@src/components/ui/Cta';
import StudioImage from '@src/components/media/StudioImage';

import { ABOUT_ARTEFACTS } from '@src/lib/assets';
import { AUTHOR_NAME } from '@src/config/site';
import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { buildMetadata, webPageSchema, breadcrumbSchema, jsonLd } from '@src/lib/seo';
import {
  ABOUT_HEADER,
  FOUNDER,
  BENEFITS,
  REMOTE,
  HOW_PROJECTS_RUN,
  LOCATION_CARD,
  OWNERSHIP,
  ABOUT_CTAS,
} from '@src/content/about';

import { PageTypes } from '@src/typescriptGlobals/types';

const PAGE_TITLE = 'About the founder-led studio';
const PAGE_DESCRIPTION =
  'Meet UI Forge Studio, a founder-led Australian web design and development studio where the same person shapes the strategy, interface and frontend build.';

/** Honest studio facts — no invented scale. */
const STUDIO_LEDGER = [
  { label: 'Structure', value: 'Independent, founder-led' },
  { label: 'Location', value: 'Australia · remote-first' },
  { label: 'Disciplines', value: 'Design and frontend development, same hands' },
  { label: 'Platforms', value: 'Next.js · React Native · Shopify · WordPress · Webflow · HubSpot' },
];

export async function generateStaticParams() {
  return ALLOWED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: '/about',
  });
}

export default async function AboutPage(props: PageTypes) {
  const { locale } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  return (
    <>
      {/* Header */}
      <section className='container-site pt-[clamp(6.4rem,10vh,11.2rem)] pb-[clamp(4.8rem,8vh,8rem)]'>
        <Eyebrow>{ABOUT_HEADER.eyebrow}</Eyebrow>
        <h1 className='font-display mt-[2.8rem] max-w-[18ch] text-[clamp(3.8rem,6.4vw,8rem)] leading-[1.05] font-normal tracking-[-0.015em]'>
          {ABOUT_HEADER.heading}
        </h1>
        <p className='text-muted mt-[3.2rem] max-w-[56ch] text-[clamp(1.7rem,2vw,2rem)] leading-[1.6]'>
          {ABOUT_HEADER.intro}
        </p>
      </section>

      {/* Founder's note — editorial colophon */}
      <section className='border-edge border-t'>
        <div className='container-site section-pad grid gap-[4.8rem] lg:grid-cols-12'>
          <div className='lg:col-span-6'>
            <Eyebrow index='01'>Founder&rsquo;s note</Eyebrow>
            <h2 className='mt-[2rem] text-[clamp(2.4rem,3.2vw,3.4rem)] leading-[1.15] font-semibold'>
              {FOUNDER.heading}
            </h2>
            {FOUNDER.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className='text-muted mt-[2.4rem] max-w-[58ch] text-[1.6rem] leading-[1.75]'
              >
                {paragraph}
              </p>
            ))}
            <p className='font-display mt-[3.2rem] text-[2rem] italic'>— {AUTHOR_NAME}</p>
            <p className='meta-label mt-[0.6rem]'>Designer and developer, UI Forge Studio</p>
          </div>

          {/* Studio artefacts + ledger — evidence of the work, never a fake portrait */}
          <div className='self-start lg:col-span-5 lg:col-start-8'>
            <figure className='border-edge border'>
              <StudioImage
                asset={ABOUT_ARTEFACTS}
                sizes='(min-width: 1024px) 40vw, 100vw'
                className='h-auto w-full'
              />
              <figcaption className='meta-label border-edge border-t px-[1.6rem] py-[1.2rem]'>
                Studio artefacts — the work, not a stock portrait
              </figcaption>
            </figure>
            <dl className='mt-[3.2rem]'>
              {STUDIO_LEDGER.map((fact) => (
                <div key={fact.label} className='border-edge border-t py-[2rem] last:border-b'>
                  <dt className='meta-label'>{fact.label}</dt>
                  <dd className='mt-[0.8rem] text-[1.55rem] leading-[1.55] font-medium'>
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* What that means for you */}
      <section className='border-edge border-t'>
        <div className='container-site section-pad grid gap-[4rem] lg:grid-cols-12'>
          <div className='lg:col-span-4'>
            <Eyebrow index='02'>The practical difference</Eyebrow>
            <h2 className='mt-[2rem] max-w-[14ch] text-[clamp(2.6rem,3.4vw,3.8rem)] leading-[1.12] font-semibold'>
              {BENEFITS.heading}
            </h2>
          </div>
          <ul className='lg:col-span-8'>
            {BENEFITS.items.map((item, index) => (
              <li
                key={item}
                className={`border-line grid gap-[0.8rem] py-[2rem] md:grid-cols-[6rem_1fr] ${
                  index === 0 ? '' : 'border-t'
                }`}
              >
                <span className='tnum text-blue text-[1.3rem] font-medium'>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className='max-w-[64ch] text-[1.65rem] leading-[1.6]'>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Location and ways of working */}
      <section className='border-edge border-t'>
        <div className='container-site section-pad grid gap-[4.8rem] lg:grid-cols-12'>
          <div className='lg:col-span-6'>
            <Eyebrow index='03'>{REMOTE.eyebrow}</Eyebrow>
            <h2 className='font-display mt-[2rem] max-w-[18ch] text-[clamp(2.8rem,4vw,4.6rem)] leading-[1.1]'>
              {REMOTE.heading}
            </h2>
            <p className='text-muted mt-[2.8rem] max-w-[58ch] text-[1.6rem] leading-[1.7]'>
              {REMOTE.p1}
            </p>
            <p className='text-muted mt-[2rem] max-w-[58ch] text-[1.6rem] leading-[1.7]'>
              {REMOTE.p2}
            </p>
            <p className='text-muted mt-[2rem] max-w-[58ch] text-[1.6rem] leading-[1.7]'>
              {REMOTE.p3Before}
              <Link
                href={REMOTE.p3LinkHref}
                className='text-ink decoration-blue hover:text-blue font-semibold underline decoration-2 underline-offset-[0.4rem]'
              >
                {REMOTE.p3LinkLabel}
              </Link>
              {REMOTE.p3After}
            </p>
          </div>

          <div className='self-start lg:col-span-5 lg:col-start-8'>
            <h3 className='meta-label'>{HOW_PROJECTS_RUN.heading}</h3>
            <ul className='mt-[1.2rem]'>
              {HOW_PROJECTS_RUN.items.map((item, index) => (
                <li
                  key={item}
                  className='border-line flex items-baseline gap-[1.4rem] border-t py-[1.5rem] first:border-t-0'
                >
                  <span className='tnum text-muted-dark text-[1.2rem]'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className='text-[1.55rem] leading-[1.55]'>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className='meta-label mt-[4rem]'>{LOCATION_CARD.heading}</h3>
            <p className='text-muted border-line mt-[1.2rem] border-t pt-[1.5rem] text-[1.55rem] leading-[1.65]'>
              {LOCATION_CARD.body}
            </p>
          </div>
        </div>
      </section>

      {/* Ownership — dark principle section */}
      <section className='bg-ink text-white'>
        <div className='container-site section-pad grid gap-[4rem] lg:grid-cols-12'>
          <div className='lg:col-span-4'>
            <Eyebrow index='04' onDark>
              {OWNERSHIP.eyebrow}
            </Eyebrow>
          </div>
          <div className='lg:col-span-8'>
            <h2 className='font-display max-w-[16ch] text-[clamp(3rem,4.6vw,5.4rem)] leading-[1.08] text-white'>
              {OWNERSHIP.heading}
            </h2>
            {OWNERSHIP.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className='text-muted-dark mt-[2.4rem] max-w-[64ch] text-[1.6rem] leading-[1.7]'
              >
                {paragraph}
              </p>
            ))}
            <p className='mt-[3.2rem]'>
              <Link
                href={OWNERSHIP.link.href}
                className='hover:text-blue-soft text-[1.5rem] font-semibold text-white underline decoration-[color:var(--color-blue-soft)] decoration-2 underline-offset-[0.6rem]'
              >
                {OWNERSHIP.link.label}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Page CTAs */}
      <section className='border-edge border-t'>
        <div className='container-site flex flex-wrap gap-[1.6rem] py-[clamp(4.8rem,8vh,8rem)]'>
          <Cta href={ABOUT_CTAS.primary.href} withArrow>
            {ABOUT_CTAS.primary.label}
          </Cta>
          <Cta href={ABOUT_CTAS.secondary.href} variant='secondary'>
            {ABOUT_CTAS.secondary.label}
          </Cta>
        </div>
      </section>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            webPageSchema({
              title: PAGE_TITLE,
              description: PAGE_DESCRIPTION,
              path: '/about',
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
              { name: 'About', path: '/about' },
            ])
          ),
        }}
      />
    </>
  );
}
