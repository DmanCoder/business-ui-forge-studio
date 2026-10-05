import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Cta from '@src/components/ui/Cta';
import InsightCard from '@src/components/insights/InsightCard';
import InsightBlocks from '@src/components/insights/InsightBlocks';
import TableOfContents from '@src/components/insights/TableOfContents';
import ShareThisArticle from '@src/components/Shared/ShareThisArticle';
import StudioImage from '@src/components/media/StudioImage';

import { insightCoverFor } from '@src/lib/assets';
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
} from '@src/lib/insights';

import { PageTypes } from '@src/typescriptGlobals/types';

const CREDIBILITY_LINE =
  'The person who writes these articles is the same person who designs and builds every UI Forge Studio project, so the advice comes from real build experience rather than theory.';

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

  const cover = insightCoverFor(article.slug);
  return {
    ...buildMetadata({
      title: article.seoTitle,
      description: article.metaDescription,
      path: `/insights/${article.slug}`,
      ogType: 'article',
      ogImage: cover ? absoluteUrl(cover.ogImage) : undefined,
    }),
    title: { absolute: article.seoTitle },
  };
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
  const cover = insightCoverFor(article.slug);

  return (
    <>
      {/* Editorial article header */}
      <header className='container-site pt-[clamp(4.8rem,8vh,8rem)]'>
        <nav aria-label='Breadcrumb' className='text-muted text-[1.4rem]'>
          <Link href='/' className='hover:text-ink hover:underline'>
            Home
          </Link>
          <span aria-hidden='true'> / </span>
          <Link href='/insights' className='hover:text-ink hover:underline'>
            Insights
          </Link>
        </nav>

        <div className='mt-[3.2rem] max-w-[96rem]'>
          <p className='flex flex-wrap items-baseline gap-x-[2rem] gap-y-[0.6rem]'>
            <span className='meta-label text-blue'>{article.category}</span>
            <span className='tnum text-muted-dark text-[1.35rem]'>
              {formatInsightDate(article.date)}
              {article.updated && <> · Updated {formatInsightDate(article.updated)}</>}
              {' · '}
              {article.readMins} min read
            </span>
          </p>
          <h1 className='font-display mt-[2.4rem] max-w-[22ch] text-[clamp(3.2rem,5.6vw,6.4rem)] leading-[1.06] tracking-[-0.015em]'>
            {article.title}
          </h1>
          <p className='border-edge mt-[3.2rem] flex flex-wrap items-baseline gap-x-[1.2rem] gap-y-[0.4rem] border-b pb-[2.4rem]'>
            <span className='text-[1.5rem] font-semibold'>{AUTHOR_NAME}</span>
            <span className='text-muted text-[1.35rem]'>
              Founder — designer and developer, UI Forge Studio
            </span>
          </p>
        </div>
      </header>

      {/* Editorial cover — original diagram artwork for the article */}
      {cover && (
        <figure className='container-site mt-[clamp(3.2rem,5vh,4.8rem)]'>
          <div className='border-edge border'>
            <StudioImage
              asset={cover.hero}
              priority
              sizes='(min-width: 1280px) 1200px, 100vw'
              className='h-auto w-full'
            />
          </div>
        </figure>
      )}

      <article className='container-prose pt-[1.6rem] pb-[clamp(4.8rem,8vh,8rem)]'>
        {headings.length >= 3 && <TableOfContents items={headings} />}

        <InsightBlocks blocks={article.blocks} />

        {/* Article CTA — flat, hairline-framed */}
        {article.cta && (
          <aside className='border-edge my-[5.6rem] border-t border-b py-[3.2rem]'>
            <p className='meta-label text-blue'>Next step</p>
            <h2 className='mt-[1.2rem] text-[2.2rem] leading-[1.25] font-semibold'>
              {article.cta.title}
            </h2>
            <p className='text-muted mt-[1.2rem] max-w-[58ch] text-[1.55rem] leading-[1.65]'>
              {article.cta.text}
            </p>
            <Cta
              href={normalizeInsightHref(article.cta.href)}
              size='sm'
              withArrow
              className='mt-[2.4rem]'
            >
              {article.cta.label}
            </Cta>
          </aside>
        )}

        {/* Share */}
        <ShareThisArticle
          className='mt-[4.8rem]'
          post={{ slug: article.slug, title: article.title }}
        />

        {/* Author footer */}
        <footer className='border-edge mt-[5.6rem] border-t pt-[3.2rem]'>
          <p className='meta-label'>Written by</p>
          <p className='mt-[1rem] text-[1.6rem] font-semibold'>
            {AUTHOR_NAME} · Founder, UI Forge Studio
          </p>
          <p className='text-muted mt-[1rem] max-w-[62ch] text-[1.5rem] leading-[1.65]'>
            {CREDIBILITY_LINE}
          </p>
          <p className='mt-[1.6rem]'>
            <Link
              href='/about'
              className='text-ink decoration-blue hover:text-blue text-[1.5rem] font-semibold underline decoration-2 underline-offset-[0.5rem]'
            >
              More about the studio →
            </Link>
          </p>
        </footer>

        {/* Prev / next */}
        {(adjacent.newer || adjacent.older) && (
          <nav
            aria-label='More articles'
            className='border-edge mt-[4.8rem] grid gap-[2.4rem] border-t pt-[2.4rem] sm:grid-cols-2'
          >
            {adjacent.newer ? (
              <Link href={`/insights/${adjacent.newer.slug}`} className='group py-[0.8rem]'>
                <span className='meta-label block'>← Newer article</span>
                <span className='mt-[0.8rem] block text-[1.55rem] leading-[1.4] font-semibold group-hover:underline group-hover:underline-offset-[0.4rem]'>
                  {adjacent.newer.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden='true' />
            )}
            {adjacent.older ? (
              <Link
                href={`/insights/${adjacent.older.slug}`}
                className='group py-[0.8rem] sm:text-right'
              >
                <span className='meta-label block'>Older article →</span>
                <span className='mt-[0.8rem] block text-[1.55rem] leading-[1.4] font-semibold group-hover:underline group-hover:underline-offset-[0.4rem]'>
                  {adjacent.older.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden='true' />
            )}
          </nav>
        )}
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className='border-edge border-t'>
          <div className='container-site section-pad'>
            <p className='meta-label'>Related articles</p>
            <div className='mt-[2.4rem]'>
              {related.map((relatedArticle, index) => (
                <InsightCard
                  key={relatedArticle.slug}
                  article={relatedArticle}
                  index={String(index + 1).padStart(2, '0')}
                  first={index === 0}
                />
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
              image: cover ? absoluteUrl(cover.ogImage) : undefined,
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
