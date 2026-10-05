import React from 'react';
import Link from 'next/link';

import Eyebrow from '@src/components/ui/Eyebrow';
import CaseStudyRow from '@src/components/work/CaseStudyRow';

import { getFeaturedCaseStudies, getPublishedCaseStudies } from '@src/lib/caseStudies';

type SelectedWorkProps = {
  /** Ledger index for the section eyebrow, e.g. '04'. */
  eyebrowIndex?: string;
};

/**
 * Homepage selected-work section: featured case studies as full-width
 * editorial rows. Renders nothing when no real featured project exists —
 * proof is never faked (server component; async by design).
 */
const SelectedWork = async ({ eyebrowIndex }: SelectedWorkProps) => {
  const [featured, published] = await Promise.all([
    getFeaturedCaseStudies(),
    getPublishedCaseStudies(),
  ]);

  if (featured.length === 0) return null;

  // While demo mode is on the row set includes labelled fictional concepts,
  // so the heading and counter never claim everything shown is real work.
  const demoCount = published.filter((study) => study.isDemo).length;
  const realCount = published.length - demoCount;

  return (
    <section className='border-edge border-t'>
      <div className='container-site pt-[clamp(5.6rem,9vh,9.6rem)]'>
        <div className='flex flex-wrap items-end justify-between gap-[2rem]'>
          <div>
            <Eyebrow index={eyebrowIndex}>Selected work</Eyebrow>
            <h2 className='font-display mt-[2rem] max-w-[16ch] text-[clamp(3rem,4.4vw,5.2rem)] leading-[1.08] font-normal'>
              {demoCount > 0
                ? 'How we document projects, end to end'
                : 'Real projects, documented end to end'}
            </h2>
          </div>
          <p className='tnum text-muted-dark pb-[1rem] text-[1.3rem] font-medium'>
            Index · {String(realCount).padStart(3, '0')} published
            {demoCount > 0 && <> · {String(demoCount).padStart(3, '0')} demo</>}
          </p>
        </div>
      </div>

      <div className='mt-[4.8rem] pb-[clamp(4.8rem,8vh,8rem)]'>
        {featured.map((study, index) => (
          <CaseStudyRow
            key={study.slug}
            study={study}
            index={String(index + 1).padStart(2, '0')}
            headingLevel='h3'
          />
        ))}

        <div className='container-site border-edge border-t pt-[3.2rem]'>
          <Link
            href='/work'
            className='text-ink hover:text-blue text-[1.5rem] font-semibold underline decoration-[color:var(--color-blue)] decoration-2 underline-offset-[0.6rem]'
          >
            View all work →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
