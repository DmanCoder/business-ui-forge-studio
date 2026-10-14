import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Eyebrow from '@src/components/ui/Eyebrow';
import InsightsExplorer from '@src/components/insights/InsightsExplorer';

import { SITE_NAME } from '@src/config/site';
import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { buildMetadata, webPageSchema, breadcrumbSchema, jsonLd } from '@src/lib/seo';
import {
  getInsightSummaries,
  getCategories,
  getTopics,
  getReadBuckets,
  PAGE_SIZE,
} from '@src/lib/insights';
import {
  applyDiscovery,
  hasActiveFilters,
  isDefaultState,
  parseDiscoveryParams,
  toSearchString,
} from '@src/lib/insights/discovery';

import { PageTypes } from '@src/typescriptGlobals/types';

const PAGE_TITLE = `Web Design & Digital Product Insights | ${SITE_NAME}`;
const PAGE_DESCRIPTION =
  'Practical guidance on websites, e-commerce, ownership, platforms and digital products for business owners making technology decisions.';
const HEADING = 'Web design and digital product insights';
const INTRO =
  'Practical, plain-language guidance on websites, e-commerce and digital products — written for business owners making decisions, not for developers.';

const EMPTY_STATE = 'The first articles are being written now and will be published here soon.';

export async function generateStaticParams() {
  return ALLOWED_LOCALES.map((locale) => ({ locale }));
}

/**
 * Only the unfiltered listing and its numbered pages are indexable. Every
 * search, category, topic, reading-time or sort variation canonicalises to
 * /insights and is noindex, follow — one listing, no duplicate pages.
 */
export async function generateMetadata(props: PageTypes): Promise<Metadata> {
  const state = parseDiscoveryParams((await props.searchParams) ?? {});
  const filtered = hasActiveFilters(state) || (state.sort !== null && state.sort !== 'newest');
  const page = filtered ? 1 : state.page;

  return buildMetadata({
    title: page > 1 ? `Insights — Page ${page} | ${SITE_NAME}` : PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: page > 1 ? `/insights?page=${page}` : '/insights',
    noIndex: filtered,
    followOnNoIndex: true,
  });
}

export default async function InsightsPage(props: PageTypes) {
  const { locale } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  const state = parseDiscoveryParams((await props.searchParams) ?? {});

  const [articles, categories, topics, readBuckets] = await Promise.all([
    getInsightSummaries(),
    getCategories(),
    getTopics(),
    getReadBuckets(),
  ]);

  // An out-of-range page of the plain listing is a 404, as before.
  const preview = applyDiscovery(articles, state, PAGE_SIZE);
  if (isDefaultState({ ...state, page: 1 }) && state.page > preview.totalPages) notFound();

  const canonicalPath =
    state.page > 1 && isDefaultState({ ...state, page: 1 })
      ? `/insights?page=${state.page}`
      : '/insights';

  return (
    <>
      {/* Masthead — compact: two-line serif headline, one supporting line */}
      <section className='container-site pt-[clamp(4rem,6vh,5.6rem)] pb-[2.4rem]'>
        <div className='grid gap-[1.6rem] lg:grid-cols-12 lg:items-end lg:gap-x-[4.8rem]'>
          <div className='lg:col-span-7'>
            <Eyebrow>Insights</Eyebrow>
            <h1 className='font-display mt-[1.6rem] max-w-[22ch] text-[clamp(3.4rem,4.6vw,5.8rem)] leading-[1.04] tracking-[-0.015em]'>
              {HEADING}
            </h1>
          </div>
          <p className='text-muted max-w-[40ch] text-[clamp(1.5rem,1.6vw,1.65rem)] leading-[1.55] lg:col-span-5 lg:pb-[0.6rem]'>
            {INTRO}
          </p>
        </div>
      </section>

      <section className='container-site pb-[clamp(5.6rem,8vh,8rem)]' aria-label='Articles'>
        {articles.length === 0 ? (
          <p className='text-muted border-edge border-t pt-[3.2rem] text-[1.65rem] leading-[1.65]'>
            {EMPTY_STATE}
          </p>
        ) : (
          <InsightsExplorer
            key={toSearchString(state)}
            articles={articles}
            categories={categories}
            topics={topics}
            readBuckets={readBuckets}
            initial={state}
            pageSize={PAGE_SIZE}
          />
        )}
      </section>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            webPageSchema({
              title: PAGE_TITLE,
              description: PAGE_DESCRIPTION,
              path: canonicalPath,
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
              { name: 'Insights', path: '/insights' },
            ])
          ),
        }}
      />
    </>
  );
}
