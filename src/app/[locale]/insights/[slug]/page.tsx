import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Cta from '@src/components/ui/Cta';
import InsightCard from '@src/components/insights/InsightCard';
import InsightCover from '@src/components/insights/InsightCover';
import InsightBlocks from '@src/components/insights/InsightBlocks';
import TableOfContents from '@src/components/insights/TableOfContents';
import ShareArticle from '@src/components/insights/ShareArticle';

import { insightOgImageFor } from '@src/lib/assets';
import { AUTHOR_NAME } from '@src/config/site';
import { ALLOWED_LOCALES } from '@src/typescriptGlobals/constants';
import { buildMetadata, articleSchema, breadcrumbSchema, jsonLd, absoluteUrl } from '@src/lib/seo';
import {
  getPublishedArticles,
  getArticleBySlug,
  getRelatedArticles,
  getAdjacent,
  formatInsightDate,
  normalizeInsightHref,
  extractH2s,
  slugify,
} from '@src/lib/insights';

import { PageTypes } from '@src/typescriptGlobals/types';

const CREDIBILITY_LINE =
  'The person who writes these articles is the same person who designs and builds every UI Forge Studio project, so the advice comes from real build experience rather than theory.';

const inlineLink =
  'text-ink decoration-blue hover:text-blue text-[1.5rem] font-semibold underline decoration-2 underline-offset-[0.5rem]';

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return ALLOWED_LOCALES.flatMap((locale) =>
    articles.map((article) => ({ locale, slug: article.slug }))
  );
}

export async function generateMetadata(props: PageTypes): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const ogImage = insightOgImageFor(article.slug);
  return buildMetadata({
    title: article.seoTitle,
    description: article.metaDescription,
    path: `/insights/${article.slug}`,
    ogType: 'article',
    ogImage: ogImage ? absoluteUrl(ogImage) : undefined,
  });
}

export default async function InsightArticlePage(props: PageTypes) {
  const { locale, slug } = await props.params;
  if (!ALLOWED_LOCALES.includes(locale)) notFound();

  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const [related, adjacent] = await Promise.all([
    getRelatedArticles(article, 3),
    getAdjacent(article),
  ]);
  const headings = extractH2s(article.blocks);
  const hasToc = headings.length >= 3;
  const ogImage = insightOgImageFor(article.slug);
  const categoryHref = `/insights/categories/${slugify(article.category)}`;

  return (
    <>
      {/* Editorial article header */}
      <header className='container-site pt-[clamp(4rem,7vh,7.2rem)]'>
        <nav aria-label='Breadcrumb' className='text-muted text-[1.4rem]'>
          <Link href='/' className='hover:text-ink hover:underline'>
            Home
          </Link>
          <span aria-hidden='true'> / </span>
          <Link href='/insights' className='hover:text-ink hover:underline'>
            Insights
          </Link>
          <span aria-hidden='true'> / </span>
          <Link href={categoryHref} className='hover:text-ink hover:underline'>
            {article.category}
          </Link>
        </nav>

        <div className='mt-[3.2rem] grid gap-[3.2rem] lg:grid-cols-12 lg:gap-x-[4.8rem]'>
          <div className='lg:col-span-9'>
            <p className='flex flex-wrap items-baseline gap-x-[2rem] gap-y-[0.6rem]'>
              <Link href={categoryHref} className='meta-label text-blue hover:underline'>
                {article.category}
              </Link>
              <span className='tnum text-muted-dark text-[1.35rem]'>
                <time dateTime={article.date}>{formatInsightDate(article.date)}</time>
                {article.updated && (
                  <>
                    {' · '}Updated{' '}
                    <time dateTime={article.updated}>{formatInsightDate(article.updated)}</time>
                  </>
                )}
                {' · '}
                {article.readMins} min read
              </span>
            </p>
            <h1 className='font-display mt-[2.4rem] max-w-[18ch] text-[clamp(3.4rem,5.8vw,7.2rem)] leading-[1.04] tracking-[-0.015em]'>
              {article.title}
            </h1>
            <p className='text-muted mt-[2.4rem] max-w-[56ch] text-[clamp(1.7rem,2vw,2rem)] leading-[1.55]'>
              {article.excerpt}
            </p>
          </div>

          {/* Byline + topics rail */}
          <aside className='border-line flex flex-col justify-end gap-[1.6rem] border-t pt-[1.6rem] lg:col-span-3 lg:border-t-0 lg:pt-0'>
            <div>
              <p className='meta-label'>Written by</p>
              <p className='mt-[0.6rem] text-[1.5rem] font-semibold'>{AUTHOR_NAME}</p>
              <p className='text-muted text-[1.35rem] leading-[1.5]'>
                Founder — designer and developer, UI Forge Studio
              </p>
            </div>
            {article.tags && article.tags.length > 0 && (
              <div>
                <p className='meta-label'>Topics</p>
                <ul className='mt-[0.8rem] flex flex-wrap gap-[0.6rem]'>
                  {article.tags.map((tag) => (
                    <li key={tag}>
                      <Link
                        href={`/insights?topic=${slugify(tag)}`}
                        className='border-line text-muted hover:border-ink hover:text-ink inline-flex min-h-[3.2rem] items-center border px-[1rem] text-[1.25rem] font-medium'
                      >
                        {tag}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {/* Lead media */}
        {article.art && (
          <figure className='mt-[clamp(3.2rem,5vh,4.8rem)] block'>
            <InsightCover art={article.art} variant='hero' priority />
          </figure>
        )}
      </header>

      {/* Reading layout: sticky contents rail + measured column */}
      <div className='container-site grid gap-x-[4.8rem] pt-[clamp(3.2rem,5vh,4.8rem)] pb-[clamp(4.8rem,8vh,8rem)] lg:grid-cols-12'>
        {hasToc && (
          <aside className='hidden lg:col-span-3 lg:block'>
            <div className='sticky top-[8.8rem]'>
              <TableOfContents items={headings} variant='sidebar' />
            </div>
          </aside>
        )}

        <article
          className={`w-full max-w-[72rem] ${hasToc ? 'lg:col-span-8 lg:col-start-5' : 'lg:col-span-8 lg:col-start-3'}`}
        >
          {/* Short answer — the article's conclusion for readers who skim */}
          {article.summary && (
            <aside
              aria-label='Short answer'
              className='border-edge border-t-blue border border-t-2 bg-white p-[clamp(2rem,3vw,3.2rem)]'
            >
              <p className='meta-label text-blue'>Short answer</p>
              <p className='font-display mt-[1.2rem] text-[clamp(2.1rem,2.6vw,2.6rem)] leading-[1.35]'>
                {article.summary}
              </p>
            </aside>
          )}

          {hasToc && (
            <div className='mt-[3.2rem] lg:hidden'>
              <TableOfContents items={headings} variant='inline' />
            </div>
          )}

          <div className='mt-[1.6rem]'>
            <InsightBlocks blocks={article.blocks} />
          </div>

          {/* Next step — the one commercial move this article leads to */}
          {article.cta && (
            <aside className='bg-ink mt-[6.4rem] p-[clamp(2.4rem,4vw,4rem)] text-white'>
              <p className='meta-label text-blue-soft'>Next step</p>
              <h2 className='font-display mt-[1.2rem] max-w-[22ch] text-[clamp(2.6rem,3.4vw,3.6rem)] leading-[1.15] text-white'>
                {article.cta.title}
              </h2>
              <p className='text-muted-dark mt-[1.6rem] max-w-[56ch] text-[1.55rem] leading-[1.65]'>
                {article.cta.text}
              </p>
              <Cta
                href={normalizeInsightHref(article.cta.href)}
                size='sm'
                withArrow
                onDark
                className='mt-[2.4rem]'
              >
                {article.cta.label}
              </Cta>
            </aside>
          )}

          {/* Related service + share */}
          <div className='border-edge mt-[4.8rem] grid gap-[3.2rem] border-t pt-[3.2rem] md:grid-cols-2'>
            {article.relatedService && (
              <div>
                <p className='meta-label'>Related service</p>
                <p className='text-muted mt-[1rem] max-w-[40ch] text-[1.5rem] leading-[1.65]'>
                  {article.relatedService.note}
                </p>
                <p className='mt-[1.2rem]'>
                  <Link
                    href={normalizeInsightHref(article.relatedService.href)}
                    className={inlineLink}
                  >
                    {article.relatedService.label} →
                  </Link>
                </p>
              </div>
            )}
            <ShareArticle slug={article.slug} title={article.title} />
          </div>

          {/* Author footer */}
          <footer className='border-edge mt-[4.8rem] grid gap-[1.6rem] border-t pt-[3.2rem] md:grid-cols-12'>
            <div className='md:col-span-4'>
              <p className='meta-label'>Written by</p>
              <p className='mt-[1rem] text-[1.6rem] font-semibold'>{AUTHOR_NAME}</p>
              <p className='text-muted text-[1.4rem]'>Founder, UI Forge Studio</p>
            </div>
            <div className='md:col-span-8'>
              <p className='text-muted max-w-[56ch] text-[1.5rem] leading-[1.65]'>
                {CREDIBILITY_LINE}
              </p>
              <p className='mt-[1.6rem]'>
                <Link href='/about' className={inlineLink}>
                  More about the studio →
                </Link>
              </p>
            </div>
          </footer>

          {/* Newer / older */}
          {(adjacent.newer || adjacent.older) && (
            <nav
              aria-label='More articles'
              className='border-edge mt-[4.8rem] grid gap-[2.4rem] border-t pt-[2.4rem] sm:grid-cols-2'
            >
              {adjacent.newer ? (
                <Link
                  href={`/insights/${adjacent.newer.slug}`}
                  className='group flex gap-[1.6rem] py-[0.8rem]'
                >
                  {adjacent.newer.art && (
                    <span className='w-[9.6rem] shrink-0'>
                      <InsightCover art={adjacent.newer.art} />
                    </span>
                  )}
                  <span>
                    <span className='meta-label block'>← Newer article</span>
                    <span className='mt-[0.8rem] block text-[1.55rem] leading-[1.4] font-semibold group-hover:underline group-hover:underline-offset-[0.4rem]'>
                      {adjacent.newer.title}
                    </span>
                  </span>
                </Link>
              ) : (
                <span aria-hidden='true' />
              )}
              {adjacent.older ? (
                <Link
                  href={`/insights/${adjacent.older.slug}`}
                  className='group flex gap-[1.6rem] py-[0.8rem] sm:flex-row-reverse sm:text-right'
                >
                  {adjacent.older.art && (
                    <span className='w-[9.6rem] shrink-0'>
                      <InsightCover art={adjacent.older.art} />
                    </span>
                  )}
                  <span>
                    <span className='meta-label block'>Older article →</span>
                    <span className='mt-[0.8rem] block text-[1.55rem] leading-[1.4] font-semibold group-hover:underline group-hover:underline-offset-[0.4rem]'>
                      {adjacent.older.title}
                    </span>
                  </span>
                </Link>
              ) : (
                <span aria-hidden='true' />
              )}
            </nav>
          )}
        </article>
      </div>

      {/* Related reading */}
      {related.length > 0 && (
        <section className='border-edge border-t' aria-labelledby='related-reading-heading'>
          <div className='container-site section-pad'>
            <div className='flex flex-wrap items-end justify-between gap-[1.6rem]'>
              <h2
                id='related-reading-heading'
                className='font-display max-w-[18ch] text-[clamp(2.8rem,3.6vw,4rem)] leading-[1.1]'
              >
                <span className='meta-label mb-[1.2rem] block'>Related reading</span>
                Keep going while the questions are fresh
              </h2>
              <Link href='/insights' className={inlineLink}>
                All insights →
              </Link>
            </div>
            <div
              className={`mt-[3.2rem] grid gap-x-[3.2rem] gap-y-[4.8rem] ${
                related.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {related.map((relatedArticle) => (
                <InsightCard key={relatedArticle.slug} article={relatedArticle} variant='cover' />
              ))}
            </div>
          </div>
        </section>
      )}

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            articleSchema({
              title: article.title,
              description: article.metaDescription,
              path: `/insights/${article.slug}`,
              datePublished: article.date,
              dateModified: article.updated,
              image: ogImage ? absoluteUrl(ogImage) : undefined,
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
              { name: article.title, path: `/insights/${article.slug}` },
            ])
          ),
        }}
      />
    </>
  );
}
