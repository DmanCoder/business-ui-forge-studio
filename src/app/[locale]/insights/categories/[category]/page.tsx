import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Eyebrow from '@src/components/ui/Eyebrow';
import InsightCard from '@src/components/insights/InsightCard';

import { SITE_NAME } from '@src/config/site';
import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { buildMetadata, webPageSchema, breadcrumbSchema, jsonLd } from '@src/lib/seo';
import { getPublishedArticles, getCategories, getCategoryBySlug } from '@src/lib/insights';

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
    title: `${category.name} — Insights`,
    description: `Articles in ${category.name} — practical, plain-language guidance on websites, e-commerce and digital products.`,
    path: `/insights/categories/${category.slug}`,
    noIndex: true,
    followOnNoIndex: true,
  });
}

export default async function InsightsCategoryPage(props: CategoryPageProps) {
  const { locale, category: categorySlug } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  const category = await getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const [articles, categories] = await Promise.all([getPublishedArticles(), getCategories()]);
  const categoryArticles = articles.filter((article) => article.category === category.name);

  return (
    <>
      {/* Masthead */}
      <section className='container-site pt-[clamp(6.4rem,10vh,11.2rem)] pb-[clamp(4rem,6vh,6.4rem)]'>
        <div className='grid gap-[3.2rem] lg:grid-cols-12'>
          <div className='lg:col-span-8'>
            <Eyebrow>Insights · Topic</Eyebrow>
            <h1 className='font-display mt-[2.8rem] max-w-[16ch] text-[clamp(3.8rem,6.4vw,8rem)] leading-[1.04] tracking-[-0.015em]'>
              {category.name}
            </h1>
            <p className='tnum text-muted mt-[2.4rem] text-[1.5rem]'>
              {categoryArticles.length.toString().padStart(2, '0')}{' '}
              {categoryArticles.length === 1 ? 'article' : 'articles'} in this topic
            </p>
          </div>

          {/* Category index */}
          <nav
            aria-label='Categories'
            className='self-end lg:col-span-3 lg:col-start-10 lg:text-right'
          >
            <p className='meta-label mb-[1.2rem]'>Browse by topic</p>
            <ul className='flex flex-col gap-[0.4rem]'>
              <li>
                <Link
                  href='/insights'
                  className='text-muted hover:text-ink text-[1.45rem] font-medium hover:underline hover:underline-offset-[0.4rem]'
                >
                  All articles
                </Link>
              </li>
              {categories.map((item) => (
                <li key={item.slug}>
                  {item.slug === category.slug ? (
                    <span aria-current='page' className='text-ink text-[1.45rem] font-semibold'>
                      {item.name}{' '}
                      <span className='tnum text-muted-dark font-normal'>
                        ({item.count.toString().padStart(2, '0')})
                      </span>
                    </span>
                  ) : (
                    <Link
                      href={`/insights/categories/${item.slug}`}
                      className='text-muted hover:text-ink text-[1.45rem] font-medium hover:underline hover:underline-offset-[0.4rem]'
                    >
                      {item.name}{' '}
                      <span className='tnum text-muted-dark'>
                        ({item.count.toString().padStart(2, '0')})
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className='container-site pb-[clamp(6.4rem,10vh,11.2rem)]'>
        {categoryArticles.map((article, index) => (
          <InsightCard
            key={article.slug}
            article={article}
            index={String(index + 1).padStart(2, '0')}
          />
        ))}
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
