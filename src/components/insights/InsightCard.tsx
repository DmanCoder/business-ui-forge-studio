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
};

/**
 * Editorial list row for an insights article: category + date rail,
 * headline, excerpt, reading time. Text only — no placeholder image panels.
 */
const InsightCard: React.FC<InsightCardProps> = ({ article, index, first = false }) => (
  <article className={`border-edge ${first ? '' : 'border-t'}`}>
    <Link
      href={`/insights/${article.slug}`}
      className='group grid gap-[1.2rem] py-[2.8rem] md:grid-cols-12 md:gap-[2rem]'
    >
      <div className='flex items-baseline gap-[1.6rem] md:col-span-3 md:flex-col md:gap-[0.8rem]'>
        {index && <span className='tnum text-muted-dark text-[1.3rem] font-medium'>{index}</span>}
        <span className='meta-label text-blue'>{article.category}</span>
        <span className='tnum text-muted-dark text-[1.3rem]'>
          {formatInsightDate(article.date)}
        </span>
      </div>
      <div className='md:col-span-9'>
        <h3 className='max-w-[30ch] text-[clamp(2rem,2.6vw,2.8rem)] leading-[1.2] font-semibold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[0.6rem]'>
          {article.title}
        </h3>
        <p className='text-muted mt-[1rem] max-w-[68ch] text-[1.5rem] leading-[1.6]'>
          {article.excerpt}
        </p>
        <p className='tnum text-muted-dark mt-[1.4rem] text-[1.3rem]'>
          {article.readMins} min read <span aria-hidden='true'>·</span> Read the article{' '}
          <span aria-hidden='true'>→</span>
        </p>
      </div>
    </Link>
  </article>
);

export default InsightCard;
