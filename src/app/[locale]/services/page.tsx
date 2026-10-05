import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Eyebrow from '@src/components/ui/Eyebrow';
import Cta from '@src/components/ui/Cta';
import StudioImage from '@src/components/media/StudioImage';

import { SERVICE_ASSETS } from '@src/lib/assets';
import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { buildMetadata, webPageSchema, breadcrumbSchema, jsonLd } from '@src/lib/seo';
import {
  SERVICES_HEADING,
  SERVICES_INTRO,
  SERVICE_CATEGORIES,
  SERVICES_CTA_CARD,
} from '@src/content/services';

import { PageTypes } from '@src/typescriptGlobals/types';

const PAGE_TITLE = 'Services';
const PAGE_DESCRIPTION =
  'Services organised around what your business needs — describe your situation and we will recommend the right approach.';
const PAGE_PATH = '/services';

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

export default async function ServicesPage(props: PageTypes) {
  const { locale } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  return (
    <>
      {/* Page header */}
      <section className='container-site pt-[clamp(6.4rem,10vh,11.2rem)] pb-[clamp(4.8rem,8vh,8rem)]'>
        <Eyebrow>Services</Eyebrow>
        <h1 className='font-display mt-[2.8rem] max-w-[16ch] text-[clamp(4rem,7vw,8.8rem)] leading-[1.03] font-normal tracking-[-0.015em]'>
          {SERVICES_HEADING}
        </h1>
        <p className='text-muted mt-[3.2rem] max-w-[56ch] text-[clamp(1.7rem,2vw,2rem)] leading-[1.6]'>
          {SERVICES_INTRO}
        </p>
      </section>

      {/* Service index — table of contents */}
      <nav aria-label='Service index' className='border-edge border-t'>
        <ol className='container-site grid list-none grid-cols-2 gap-x-[3.2rem] py-[2.4rem] md:grid-cols-3 lg:grid-cols-6'>
          {SERVICE_CATEGORIES.map((category, index) => (
            <li key={category.name}>
              <a
                href={`#service-${index + 1}`}
                className='text-muted hover:text-ink flex items-baseline gap-[1rem] py-[0.8rem] text-[1.35rem] font-medium hover:underline hover:underline-offset-[0.4rem]'
              >
                <span className='tnum text-blue'>{String(index + 1).padStart(2, '0')}</span>
                {category.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Service ledger */}
      <section>
        {SERVICE_CATEGORIES.map((category, index) => (
          <article key={category.name} id={`service-${index + 1}`} className='border-edge border-t'>
            <div className='container-site grid gap-[3.2rem] py-[clamp(4.8rem,8vh,7.2rem)] lg:grid-cols-12'>
              {/* Rail: numeral + name */}
              <div className='lg:col-span-4'>
                <p className='font-display tnum text-blue text-[clamp(4.8rem,6vw,7.2rem)] leading-none'>
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className='mt-[1.6rem] max-w-[14ch] text-[clamp(2.4rem,3.2vw,3.6rem)] leading-[1.1] font-semibold'>
                  {category.name}
                </h2>
                {category.tag && (
                  <p className='text-blue mt-[1.4rem] text-[1.25rem] font-semibold tracking-[0.12em] uppercase'>
                    {category.tag}
                  </p>
                )}
              </div>

              {/* Content: positioning + note + deliverables */}
              <div className='lg:col-span-8'>
                <p className='max-w-[62ch] text-[clamp(1.7rem,2vw,2rem)] leading-[1.6]'>
                  {category.description}
                </p>
                {category.note && (
                  <p className='text-muted border-edge mt-[2.4rem] max-w-[62ch] border-l-2 pl-[2rem] text-[1.5rem] leading-[1.7]'>
                    {category.note}
                  </p>
                )}
                <h3 className='meta-label mt-[3.6rem]'>Deliverables</h3>
                <ul className='mt-[1.2rem]'>
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={item}
                      className={`border-line flex items-baseline gap-[1.6rem] py-[1.3rem] ${
                        itemIndex === 0 ? '' : 'border-t'
                      }`}
                    >
                      <span className='tnum text-muted-dark text-[1.2rem]'>
                        {String(index + 1).padStart(2, '0')}.{itemIndex + 1}
                      </span>
                      <span className='text-[1.55rem] font-medium'>{item}</span>
                    </li>
                  ))}
                </ul>
                {SERVICE_ASSETS[category.name] && (
                  <figure className='border-edge mt-[3.6rem] border'>
                    <StudioImage
                      asset={SERVICE_ASSETS[category.name]}
                      sizes='(min-width: 1024px) 62vw, 100vw'
                      className='h-auto w-full'
                    />
                  </figure>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Not sure where your project fits? */}
      <section className='border-edge border-t'>
        <div className='container-site section-pad grid items-end gap-[3.2rem] lg:grid-cols-12'>
          <div className='lg:col-span-8'>
            <h2 className='font-display max-w-[20ch] text-[clamp(2.8rem,4.2vw,4.8rem)] leading-[1.12]'>
              {SERVICES_CTA_CARD.heading}
            </h2>
            <p className='text-muted mt-[1.6rem] max-w-[52ch] text-[1.6rem] leading-[1.6]'>
              {SERVICES_CTA_CARD.body}
            </p>
          </div>
          <div className='lg:col-span-4 lg:justify-self-end'>
            <Cta href={SERVICES_CTA_CARD.cta.href} withArrow>
              {SERVICES_CTA_CARD.cta.label}
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
              { name: 'Services', path: PAGE_PATH },
            ])
          ),
        }}
      />
    </>
  );
}
