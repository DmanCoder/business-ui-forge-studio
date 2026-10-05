import React from 'react';
import Link from 'next/link';

import Eyebrow from '@src/components/ui/Eyebrow';
import InsightCard from '@src/components/insights/InsightCard';
import { getPublishedArticles } from '@src/lib/insights';

/** Latest insights ledger on the home page — hidden until articles exist. */
const LatestInsights = async () => {
  const articles = await getPublishedArticles();
  if (articles.length === 0) return null;

  const latest = articles.slice(0, 3);

  return (
    <section className='border-edge border-t'>
      <div className='container-site section-pad'>
        <div className='flex flex-wrap items-end justify-between gap-[2rem]'>
          <div>
            <Eyebrow index='07'>Insights</Eyebrow>
            <h2 className='mt-[2rem] text-[clamp(2.8rem,3.6vw,4rem)] leading-[1.1] font-semibold'>
              Plain-language guidance
            </h2>
          </div>
          <Link
            href='/insights'
            className='text-ink decoration-blue hover:text-blue pb-[0.6rem] text-[1.5rem] font-semibold underline decoration-2 underline-offset-[0.6rem]'
          >
            All insights →
          </Link>
        </div>
        <div className='mt-[3.2rem]'>
          {latest.map((article, index) => (
            <InsightCard
              key={article.slug}
              article={article}
              index={String(index + 1).padStart(2, '0')}
              first={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestInsights;
