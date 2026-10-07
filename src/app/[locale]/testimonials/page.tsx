import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Eyebrow from '@src/components/ui/Eyebrow';
import Cta from '@src/components/ui/Cta';
import TestimonialQuote from '@src/components/work/TestimonialQuote';
import DemoNotice from '@src/components/work/DemoNotice';

import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { buildMetadata, webPageSchema, breadcrumbSchema, jsonLd } from '@src/lib/seo';
import {
  getTestimonialsPageTestimonials,
  shouldPublishTestimonialsPage,
  shouldIndexTestimonialsPage,
} from '@src/lib/caseStudies';

import { PageTypes } from '@src/typescriptGlobals/types';

const PAGE_TITLE = 'Client Testimonials | UI Forge Studio';
const PAGE_DESCRIPTION =
  'Client feedback on working with UI Forge Studio — collected with permission and published only when verified.';
const PAGE_PATH = '/testimonials';

/**
 * Conditional testimonials route. It exists in two honest states only:
 *   - Real: the verified-testimonial threshold is met — indexable, in sitemap.
 *   - Demo preview: demo mode is on — labelled sample quotes, noindexed,
 *     never in the sitemap.
 * In every other state the route 404s (and emits no static params).
 */
export async function generateStaticParams() {
  if (!(await shouldPublishTestimonialsPage())) return [];
  return ALLOWED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
    // Indexable only on real verified content — a demo-preview page never is.
    noIndex: !(await shouldIndexTestimonialsPage()),
  });
}

export default async function TestimonialsPage(props: PageTypes) {
  const { locale } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  const [publishable, indexable, testimonials] = await Promise.all([
    shouldPublishTestimonialsPage(),
    shouldIndexTestimonialsPage(),
    getTestimonialsPageTestimonials(),
  ]);

  if (!publishable || testimonials.length === 0) notFound();

  const hasDemo = testimonials.some((testimonial) => testimonial.isDemo);
  const [featured, ...rest] = testimonials;

  return (
    <>
      {/* Page header */}
      <section className='container-site pt-[clamp(6.4rem,10vh,11.2rem)] pb-[clamp(4rem,6vh,6.4rem)]'>
        <nav aria-label='Breadcrumb' className='text-muted text-[1.4rem]'>
          <Link href='/' className='hover:text-ink hover:underline'>
            Home
          </Link>
          <span aria-hidden='true'> / </span>
          <span aria-current='page'>Testimonials</span>
        </nav>
        <div className='mt-[3.2rem]'>
          <Eyebrow>{hasDemo ? 'Sample feedback' : 'Client feedback'}</Eyebrow>
          <h1 className='font-display mt-[2.8rem] max-w-[18ch] text-[clamp(4rem,7vw,8.8rem)] leading-[1.03] font-normal tracking-[-0.015em]'>
            {hasDemo ? 'Previewing the testimonial format' : 'What clients say about the work'}
          </h1>
        </div>
        {hasDemo && (
          <DemoNotice className='mt-[4rem]'>
            The feedback below is sample content used to preview the testimonial layout. It will be
            replaced with approved client feedback.
          </DemoNotice>
        )}
      </section>

      {/* Featured statement quote */}
      <section className='border-edge border-t'>
        <div className='container-site section-pad'>
          <TestimonialQuote testimonial={featured} size='lg' />
        </div>
      </section>

      {/* Supporting quotes — hairline-ruled editorial grid */}
      {rest.length > 0 && (
        <section className='border-edge border-t'>
          <div className='container-site section-pad grid gap-x-[4rem] gap-y-[4.8rem] md:grid-cols-2'>
            {rest.map((testimonial) => (
              <div key={testimonial.id} className='border-edge border-t pt-[2.8rem]'>
                <TestimonialQuote testimonial={testimonial} size='md' />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How feedback is published — the honesty policy stays visible */}
      <section className='border-edge border-t'>
        <div className='container-site grid gap-[2.4rem] py-[clamp(4rem,6vh,6.4rem)] lg:grid-cols-12'>
          <div className='lg:col-span-4'>
            <Eyebrow>How feedback is published</Eyebrow>
          </div>
          <p className='text-muted max-w-[64ch] text-[1.6rem] leading-[1.7] lg:col-span-8'>
            Real testimonials only appear here once the exact wording, attribution and placement
            have been approved by the client. Nothing is paraphrased, invented, or shown without
            permission{hasDemo ? ' — which is why the quotes above are labelled as samples' : ''}.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className='border-edge border-t'>
        <div className='container-site py-[clamp(4.8rem,7vh,7.2rem)]'>
          <p className='meta-label text-blue'>Start a project</p>
          <h2 className='mt-[1.6rem] max-w-[24ch] text-[clamp(2.4rem,3.2vw,3.6rem)] leading-[1.15] font-semibold'>
            The best reference is the work itself
          </h2>
          <p className='text-muted mt-[1.6rem] max-w-[54ch] text-[1.6rem] leading-[1.7]'>
            Read the case studies to see how projects are run, then tell us where your business is
            heading.
          </p>
          <div className='mt-[2.8rem] flex flex-wrap items-center gap-[2.4rem]'>
            <Cta href='/start-a-project' withArrow>
              Start a project
            </Cta>
            <Link
              href='/work'
              className='text-ink hover:text-blue text-[1.5rem] font-semibold underline decoration-[color:var(--color-blue)] decoration-2 underline-offset-[0.6rem]'
            >
              View the work →
            </Link>
          </div>
        </div>
      </section>

      {/* Structured data only when the page is real, indexable content. Never
          Review or AggregateRating schema — sample quotes are not reviews. */}
      {indexable && (
        <>
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
                  { name: 'Testimonials', path: PAGE_PATH },
                ])
              ),
            }}
          />
        </>
      )}
    </>
  );
}
