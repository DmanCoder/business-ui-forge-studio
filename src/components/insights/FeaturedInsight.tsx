import React from 'react';
import Link from 'next/link';

import { formatInsightDate } from '@src/lib/insights';
import type { InsightArticle } from '@src/lib/insights/types';

type FeaturedInsightProps = {
  article: InsightArticle;
};

/**
 * Lead story for page 1 of the insights listing: full editorial scale,
 * typographic — the newest article presented like a front-page splash.
 */
const FeaturedInsight: React.FC<FeaturedInsightProps> = ({ article }) => (
  <article className='border-edge border-t'>
    <Link href={`/insights/${article.slug}`} className='group block py-[4rem]'>
      <div className='flex flex-wrap items-baseline gap-x-[2rem] gap-y-[0.6rem]'>
        <span className='meta-label text-blue'>Latest · {article.category}</span>
        <span className='tnum text-muted-dark text-[1.3rem]'>
          {formatInsightDate(article.date)} · {article.readMins} min read
        </span>
      </div>
      <h2 className='font-display mt-[2.4rem] max-w-[20ch] text-[clamp(3.2rem,5.4vw,6.4rem)] leading-[1.06] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[1rem]'>
        {article.title}
      </h2>
      <p className='text-muted mt-[2.4rem] max-w-[62ch] text-[clamp(1.6rem,1.9vw,1.9rem)] leading-[1.6]'>
        {article.excerpt}
      </p>
      <p className='text-ink mt-[2.4rem] text-[1.5rem] font-semibold'>
        Read the article <span aria-hidden='true'>→</span>
      </p>
    </Link>
  </article>
);

export default FeaturedInsight;
