import React from 'react';
import Link from 'next/link';

import InsightCover from '@src/components/insights/InsightCover';
import Highlight from '@src/components/insights/Highlight';
import { formatInsightDate } from '@src/lib/insights';
import type { SearchMatch } from '@src/lib/insights/discovery';
import type { InsightArt } from '@src/lib/insights/types';

/** The fields a card needs — satisfied by both InsightArticle and InsightSummary. */
export type InsightCardArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMins: number;
  art?: InsightArt;
};

type InsightCardProps = {
  article: InsightCardArticle;
  /** Ledger index, e.g. "02". */
  index?: string;
  /** Suppress the top hairline on the first row of a list. */
  first?: boolean;
  /**
   * `row` (default) — the wide 12-column ledger row used on the home page.
   * `cover` — artwork on top, then meta, title and excerpt: the index grid,
   * related reading and every other place the covers belong.
   * `wide` — artwork beside the text: the single-result state of the index.
   */
  variant?: 'row' | 'cover' | 'wide';
  /** The newest article in the default listing: a "Latest" tag, a larger title. */
  lead?: boolean;
  /** Search context (cover variants): the terms and the best non-title match. */
  terms?: string[];
  match?: SearchMatch | null;
  priority?: boolean;
  /** Heading level for the title. */
  headingLevel?: 'h2' | 'h3';
};

const MATCH_LABEL: Record<SearchMatch['field'], string> = {
  title: 'Title',
  topic: 'Topic',
  category: 'Category',
  heading: 'Section',
  summary: 'Short answer',
  excerpt: 'Summary',
};

const InsightCard: React.FC<InsightCardProps> = ({
  article,
  index,
  first = false,
  variant = 'row',
  lead = false,
  terms = [],
  match = null,
  priority = false,
  headingLevel = 'h3',
}) => {
  const href = `/insights/${article.slug}`;
  const Heading = headingLevel;

  if (variant === 'cover' || variant === 'wide') {
    const wide = variant === 'wide';
    const meta = (
      <p className='flex flex-wrap items-baseline gap-x-[1.2rem] gap-y-[0.4rem]'>
        {lead && <span className='meta-label text-blue'>Latest</span>}
        <span className={`meta-label ${lead ? '' : 'text-blue'}`}>{article.category}</span>
        <span className='tnum text-muted-dark text-[1.25rem]'>
          {formatInsightDate(article.date)} · {article.readMins} min read
        </span>
      </p>
    );
    const context = match && match.field !== 'title' && match.field !== 'excerpt' && (
      <p className='border-line mt-[1.2rem] border-t pt-[1rem] text-[1.3rem] leading-[1.5]'>
        <span className='meta-label mr-[0.8rem]'>{MATCH_LABEL[match.field]}</span>
        <span className='text-ink'>
          <Highlight text={match.text} terms={terms} />
        </span>
      </p>
    );

    return (
      <article className='h-full'>
        <Link
          href={href}
          className={`group h-full ${wide ? 'grid gap-[2rem] md:grid-cols-12 md:gap-x-[3.2rem]' : 'flex flex-col'}`}
        >
          {article.art && (
            <div className={wide ? 'md:col-span-6' : ''}>
              <InsightCover art={article.art} priority={priority} />
            </div>
          )}
          <div
            className={`flex flex-col ${wide ? 'justify-center md:col-span-6' : 'flex-1 pt-[1.4rem]'}`}
          >
            {meta}
            <Heading
              className={`mt-[1rem] leading-[1.2] font-semibold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[0.5rem] ${
                wide
                  ? 'max-w-[26ch] text-[clamp(2.2rem,2.4vw,2.8rem)]'
                  : lead
                    ? 'max-w-[24ch] text-[clamp(2rem,2.1vw,2.4rem)]'
                    : 'max-w-[26ch] text-[clamp(1.9rem,1.9vw,2.1rem)]'
              }`}
            >
              <Highlight text={article.title} terms={terms} />
            </Heading>
            <p
              className={`text-muted mt-[0.8rem] text-[1.45rem] leading-[1.55] ${
                wide ? 'line-clamp-3 max-w-[52ch]' : 'line-clamp-2 max-w-[44ch]'
              }`}
            >
              <Highlight text={article.excerpt} terms={terms} />
            </p>
            {context}
            <p className='text-ink mt-auto pt-[1.2rem] text-[1.35rem] font-semibold'>
              Read the article<span className='sr-only'>: {article.title}</span>{' '}
              <span aria-hidden='true'>→</span>
            </p>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className={`border-edge ${first ? '' : 'border-t'}`}>
      <Link
        href={href}
        className='group grid gap-[1.2rem] py-[2.8rem] md:grid-cols-12 md:gap-[2rem]'
      >
        <div className='flex flex-wrap items-baseline gap-x-[1.6rem] gap-y-[0.4rem] md:col-span-3 md:flex-col md:gap-[0.8rem]'>
          {index && <span className='tnum text-muted-dark text-[1.3rem] font-medium'>{index}</span>}
          <span className='meta-label text-blue'>{article.category}</span>
          <span className='tnum text-muted-dark text-[1.3rem]'>
            {formatInsightDate(article.date)} · {article.readMins} min read
          </span>
        </div>
        <div className='md:col-span-9'>
          <Heading className='max-w-[30ch] text-[clamp(2rem,2.6vw,2.8rem)] leading-[1.2] font-semibold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[0.6rem]'>
            {article.title}
          </Heading>
          <p className='text-muted mt-[1rem] line-clamp-3 max-w-[68ch] text-[1.5rem] leading-[1.6]'>
            {article.excerpt}
          </p>
          <p className='text-ink mt-[1.4rem] text-[1.4rem] font-semibold'>
            Read the article<span className='sr-only'>: {article.title}</span>{' '}
            <span aria-hidden='true'>→</span>
          </p>
        </div>
      </Link>
    </article>
  );
};

export default InsightCard;
