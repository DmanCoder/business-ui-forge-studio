import React from 'react';
import Link from 'next/link';

import Eyebrow from '@src/components/ui/Eyebrow';
import CaseStudyRow from '@src/components/work/CaseStudyRow';

import { getFeaturedCaseStudies, getPublishedCaseStudies } from '@src/lib/caseStudies';
import { WORK_SECTION } from '@src/content/home';

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
        <div className='grid gap-[2rem] lg:grid-cols-12'>
          <div className='lg:col-span-8'>
            <Eyebrow index={eyebrowIndex}>{WORK_SECTION.eyebrow}</Eyebrow>
            <h2 className='font-display mt-[2rem] max-w-[16ch] text-[clamp(3rem,4.4vw,5.2rem)] leading-[1.08] font-normal'>
              {demoCount > 0
                ? WORK_SECTION.demoHeading
                : realCount === 1
                  ? WORK_SECTION.heading
                  : 'Real projects, documented end to end'}
            </h2>
          </div>
          <p className='text-muted max-w-[40ch] self-end text-[1.5rem] leading-[1.6] lg:col-span-4 lg:col-start-9'>
            Every project is documented end to end — context, decisions, technical approach and
            clearly labelled outcomes.
            {demoCount > 0 && (
              <>
                {' '}
                <span className='tnum'>{String(demoCount).padStart(2, '0')}</span> demo{' '}
                {demoCount === 1 ? 'entry is' : 'entries are'} labelled as fictional.
              </>
            )}
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
            {WORK_SECTION.link.label} →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
