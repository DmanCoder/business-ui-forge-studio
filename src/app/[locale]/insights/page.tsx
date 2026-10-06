import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Eyebrow from '@src/components/ui/Eyebrow';
import InsightCard from '@src/components/insights/InsightCard';
import FeaturedInsight from '@src/components/insights/FeaturedInsight';

import { SITE_NAME } from '@src/config/site';
import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { buildMetadata, webPageSchema, breadcrumbSchema, jsonLd } from '@src/lib/seo';
import { getPublishedArticles, getCategories, PAGE_SIZE } from '@src/lib/insights';

import { PageTypes } from '@src/typescriptGlobals/types';

const INTRO =
  'Practical, plain-language guidance on websites, e-commerce and digital products — written for business owners making decisions, not for developers.';

const EMPTY_STATE = 'The first articles are being written now and will be published here soon.';

/** ?page=N → page number, or null when the param is invalid. */
const parsePageParam = (value: string | string[] | undefined): number | null => {
  if (value === undefined) return 1;
  if (Array.isArray(value) || !/^[0-9]+$/.test(value)) return null;

  const page = parseInt(value, 10);
  return page >= 1 ? page : null;
};

/** Page 1 lives at /insights — never /insights?page=1. */
const pageHref = (page: number) => (page === 1 ? '/insights' : `/insights?page=${page}`);

/** Pager pattern: 1, last, current±1, with ellipses between gaps. */
const buildPagerItems = (current: number, total: number): (number | 'ellipsis')[] => {
  const items: (number | 'ellipsis')[] = [];

  for (let page = 1; page <= total; page++) {
    if (page === 1 || page === total || Math.abs(page - current) <= 1) {
      items.push(page);
    } else if (items[items.length - 1] !== 'ellipsis') {
      items.push('ellipsis');
    }
  }

  return items;
};

const pagerLink =
  'tnum min-w-[3.6rem] py-[0.8rem] text-center text-[1.45rem] font-semibold text-muted hover:text-ink hover:underline hover:underline-offset-[0.6rem]';

export async function generateStaticParams() {
  return ALLOWED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(props: PageTypes): Promise<Metadata> {
  const searchParams = (await props.searchParams) ?? {};
  const page = parsePageParam(searchParams.page) ?? 1;

  const metadata = buildMetadata({
    title: 'Website design and digital product insights',
    description: INTRO,
    path: page > 1 ? `/insights?page=${page}` : '/insights',
  });

  if (page > 1) {
    return { ...metadata, title: { absolute: `Insights — Page ${page} | ${SITE_NAME}` } };
  }

  return metadata;
}

export default async function InsightsPage(props: PageTypes) {
  const { locale } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  const searchParams = (await props.searchParams) ?? {};
  const page = parsePageParam(searchParams.page);
  if (page === null) notFound();

  const articles = await getPublishedArticles();
  const categories = await getCategories();

  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  if (page > totalPages) notFound();

  const pageItems = articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const featured = page === 1 ? (pageItems[0] ?? null) : null;
  const gridItems = page === 1 ? pageItems.slice(1) : pageItems;

  return (
    <>
      {/* Masthead */}
      <section className='container-site pt-[clamp(6.4rem,10vh,11.2rem)] pb-[clamp(4rem,6vh,6.4rem)]'>
        <div className='grid gap-[3.2rem] lg:grid-cols-12'>
          <div className='lg:col-span-8'>
            <Eyebrow>Insights</Eyebrow>
            <h1 className='font-display mt-[2.8rem] text-[clamp(4.6rem,8vw,9.6rem)] leading-[1.0] tracking-[-0.015em]'>
              Insights
            </h1>
            <p className='text-muted mt-[2.8rem] max-w-[58ch] text-[clamp(1.6rem,1.9vw,1.9rem)] leading-[1.6]'>
              {INTRO}
            </p>
          </div>

          {/* Category index */}
          {categories.length > 0 && (
            <nav
              aria-label='Categories'
              className='self-end lg:col-span-3 lg:col-start-10 lg:text-right'
            >
              <p className='meta-label mb-[1.2rem]'>Browse by topic</p>
              <ul className='flex flex-col gap-[0.4rem]'>
                <li>
                  <span aria-current='page' className='text-ink text-[1.45rem] font-semibold'>
                    All articles{' '}
                    <span className='tnum text-muted-dark font-normal'>
                      ({articles.length.toString().padStart(2, '0')})
                    </span>
                  </span>
                </li>
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/insights/categories/${category.slug}`}
                      className='text-muted hover:text-ink text-[1.45rem] font-medium hover:underline hover:underline-offset-[0.4rem]'
                    >
                      {category.name}{' '}
                      <span className='tnum text-muted-dark'>
                        ({category.count.toString().padStart(2, '0')})
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>

      <section className='container-site pb-[clamp(6.4rem,10vh,11.2rem)]'>
        {articles.length === 0 && (
          <p className='text-muted border-edge border-t pt-[3.2rem] text-[1.65rem] leading-[1.65]'>
            {EMPTY_STATE}
          </p>
        )}

        {featured && <FeaturedInsight article={featured} />}

        {gridItems.length > 0 && (
          <div>
            {gridItems.map((article, index) => (
              <InsightCard
                key={article.slug}
                article={article}
                index={String((page - 1) * PAGE_SIZE + index + (featured ? 2 : 1)).padStart(2, '0')}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav
            aria-label='Pagination'
            className='border-edge mt-[4.8rem] flex flex-wrap items-center justify-between gap-[1.2rem] border-t pt-[2.4rem]'
          >
            {page > 1 ? (
              <Link href={pageHref(page - 1)} className={pagerLink}>
                ← Previous
              </Link>
            ) : (
              <span
                aria-disabled='true'
                className='tnum text-edge py-[0.8rem] text-[1.45rem] font-semibold'
              >
                ← Previous
              </span>
            )}

            <span className='flex items-center gap-[0.4rem]'>
              {buildPagerItems(page, totalPages).map((item, index) =>
                item === 'ellipsis' ? (
                  <span key={`ellipsis-${index}`} className='text-muted px-[0.6rem] text-[1.45rem]'>
                    …
                  </span>
                ) : item === page ? (
                  <span
                    key={item}
                    aria-current='page'
                    className='tnum text-ink decoration-blue min-w-[3.6rem] py-[0.8rem] text-center text-[1.45rem] font-semibold underline decoration-2 underline-offset-[0.6rem]'
                  >
                    {item}
                  </span>
                ) : (
                  <Link key={item} href={pageHref(item)} className={pagerLink}>
                    {item}
                  </Link>
                )
              )}
            </span>

            {page < totalPages ? (
              <Link href={pageHref(page + 1)} className={pagerLink}>
                Next →
              </Link>
            ) : (
              <span
                aria-disabled='true'
                className='tnum text-edge py-[0.8rem] text-[1.45rem] font-semibold'
              >
                Next →
              </span>
            )}
          </nav>
        )}
      </section>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            webPageSchema({
              title: `Insights — ${SITE_NAME}`,
              description: INTRO,
              path: page > 1 ? `/insights?page=${page}` : '/insights',
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
