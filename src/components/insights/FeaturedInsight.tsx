import React from 'react';
import Link from 'next/link';

import InsightCover from '@src/components/insights/InsightCover';
import { formatInsightDate } from '@src/lib/insights';
import type { InsightSummary } from '@src/lib/insights/types';

type FeaturedInsightProps = {
  article: InsightSummary;
};

/**
 * Lead story for the default view of the insights listing: the cover at
 * editorial scale on the left, the headline and standfirst on the right.
 * Only the newest article in the unfiltered, newest-first view earns this.
 */
const FeaturedInsight: React.FC<FeaturedInsightProps> = ({ article }) => (
  <article>
    <Link
      href={`/insights/${article.slug}`}
      className='group grid gap-[2.4rem] lg:grid-cols-12 lg:gap-x-[4.8rem]'
    >
      {article.art && (
        <div className='lg:col-span-7'>
          <InsightCover art={article.art} priority />
        </div>
      )}
      <div
        className={`flex flex-col justify-end ${article.art ? 'lg:col-span-5' : 'lg:col-span-10'}`}
      >
        <p className='flex flex-wrap items-baseline gap-x-[1.6rem] gap-y-[0.6rem]'>
          <span className='meta-label text-blue'>Latest · {article.category}</span>
          <span className='tnum text-muted-dark text-[1.3rem]'>
            {formatInsightDate(article.date)} · {article.readMins} min read
          </span>
        </p>
        <h2 className='font-display mt-[2rem] max-w-[18ch] text-[clamp(3.2rem,4.4vw,5.6rem)] leading-[1.04] tracking-[-0.01em] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[0.8rem]'>
          {article.title}
        </h2>
        <p className='text-muted mt-[2rem] max-w-[46ch] text-[clamp(1.6rem,1.8vw,1.8rem)] leading-[1.6]'>
          {article.excerpt}
        </p>
        {article.tags.length > 0 && (
          <ul aria-label='Topics' className='mt-[2rem] flex flex-wrap gap-[0.8rem]'>
            {article.tags.map((tag) => (
              <li
                key={tag}
                className='border-line text-muted border px-[1rem] py-[0.4rem] text-[1.25rem] font-medium'
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        <p className='text-ink mt-[2.4rem] text-[1.5rem] font-semibold'>
          Read the article<span className='sr-only'>: {article.title}</span>{' '}
          <span aria-hidden='true'>→</span>
        </p>
      </div>
    </Link>
  </article>
);

export default FeaturedInsight;
