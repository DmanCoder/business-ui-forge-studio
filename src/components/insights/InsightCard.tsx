import React from 'react';
import Link from 'next/link';

import { formatInsightDate } from '@src/lib/insights';
import type { InsightArticle } from '@src/lib/insights/types';

type InsightCardProps = {
  article: InsightArticle;
  /** Ledger index, e.g. "02". */
  index?: string;
  /** Suppress the top hairline on the first row of a list. */
  first?: boolean;
  /**
   * Two-column ledger cell (Insights index): metadata row on top, title,
   * two-line excerpt. The wide 12-column row remains the default elsewhere.
   */
  compact?: boolean;
};

/**
 * Editorial list row for an insights article: category + date rail,
 * headline, excerpt, reading time. Text only — no placeholder image panels.
 */
const InsightCard: React.FC<InsightCardProps> = ({
  article,
  index,
  first = false,
  compact = false,
}) => {
  const href = `/insights/${article.slug}`;
  const meta = (
    <>
      {index && <span className='tnum text-muted-dark text-[1.3rem] font-medium'>{index}</span>}
      <span className='meta-label text-blue'>{article.category}</span>
      <span className='tnum text-muted-dark text-[1.3rem]'>
        {formatInsightDate(article.date)} · {article.readMins} min read
      </span>
    </>
  );

  if (compact) {
    return (
      <article className='border-edge border-t'>
        <Link href={href} className='group block py-[2.8rem]'>
          <div className='flex flex-wrap items-baseline gap-x-[1.6rem] gap-y-[0.4rem]'>{meta}</div>
          <h3 className='mt-[1.4rem] max-w-[26ch] text-[clamp(2rem,2.4vw,2.6rem)] leading-[1.2] font-semibold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[0.6rem]'>
            {article.title}
          </h3>
          <p className='text-muted mt-[1rem] line-clamp-3 max-w-[52ch] text-[1.5rem] leading-[1.6]'>
            {article.excerpt}
          </p>
          <p className='text-ink mt-[1.4rem] text-[1.4rem] font-semibold'>
            Read the article<span className='sr-only'>: {article.title}</span>{' '}
            <span aria-hidden='true'>→</span>
          </p>
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
          {meta}
        </div>
        <div className='md:col-span-9'>
          <h3 className='max-w-[30ch] text-[clamp(2rem,2.6vw,2.8rem)] leading-[1.2] font-semibold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[0.6rem]'>
            {article.title}
          </h3>
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
