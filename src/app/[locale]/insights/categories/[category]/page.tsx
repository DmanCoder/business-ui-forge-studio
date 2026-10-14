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
  getCategoryBySlug,
  getTopics,
  getReadBuckets,
  PAGE_SIZE,
} from '@src/lib/insights';
import { DEFAULT_STATE } from '@src/lib/insights/discovery';

type CategoryPageProps = {
  params: Promise<{ locale: string; category: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return ALLOWED_LOCALES.flatMap((locale) =>
    categories.map((category) => ({ locale, category: category.slug }))
  );
}

export async function generateMetadata(props: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await props.params;
  const category = await getCategoryBySlug(categorySlug);
  if (!category) notFound();

  return buildMetadata({
    title: `${category.name} Insights | ${SITE_NAME}`,
    description: `Articles in ${category.name} — practical, plain-language guidance on websites, e-commerce and digital products.`,
    path: `/insights/categories/${category.slug}`,
    noIndex: true,
    followOnNoIndex: true,
  });
}

/**
 * A category landing: the same explorer as /insights with the category
 * preselected. Any further interaction continues on /insights, which owns
 * the query-string state.
 */
export default async function InsightsCategoryPage(props: CategoryPageProps) {
  const { locale, category: categorySlug } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  const category = await getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const [articles, categories, topics, readBuckets] = await Promise.all([
    getInsightSummaries(),
    getCategories(),
    getTopics(),
    getReadBuckets(),
  ]);

  return (
    <>
      {/* Masthead — compact, matching /insights */}
      <section className='container-site pt-[clamp(4rem,6vh,5.6rem)] pb-[2.4rem]'>
        <div className='grid gap-[1.6rem] lg:grid-cols-12 lg:items-end lg:gap-x-[4.8rem]'>
          <div className='lg:col-span-7'>
            <Eyebrow>Insights · Topic</Eyebrow>
            <h1 className='font-display mt-[1.6rem] max-w-[22ch] text-[clamp(3.4rem,4.6vw,5.8rem)] leading-[1.04] tracking-[-0.015em]'>
              {category.name}
            </h1>
          </div>
          <p className='tnum text-muted text-[1.5rem] lg:col-span-5 lg:pb-[0.6rem]'>
            {String(category.count).padStart(2, '0')}{' '}
            {category.count === 1 ? 'article' : 'articles'} in this topic
          </p>
        </div>
      </section>

      <section className='container-site pb-[clamp(5.6rem,8vh,8rem)]' aria-label='Articles'>
        <InsightsExplorer
          articles={articles}
          categories={categories}
          topics={topics}
          readBuckets={readBuckets}
          initial={{ ...DEFAULT_STATE, category: category.slug }}
          pageSize={PAGE_SIZE}
        />
      </section>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            webPageSchema({
              title: `${category.name} — Insights — ${SITE_NAME}`,
              description: `Articles in ${category.name} — practical, plain-language guidance on websites, e-commerce and digital products.`,
              path: `/insights/categories/${category.slug}`,
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
              { name: category.name, path: `/insights/categories/${category.slug}` },
            ])
          ),
        }}
      />
    </>
  );
}
