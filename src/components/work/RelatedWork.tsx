import React from 'react';
import Link from 'next/link';

import { caseStudyStatusLabel } from '@src/lib/caseStudies';
import type { CaseStudy } from '@src/lib/caseStudies';

type RelatedWorkProps = {
  studies: CaseStudy[];
};

/**
 * Compact hairline ledger of related case studies for the bottom of a
 * case-study page. Renders nothing when there is no real related work.
 */
const RelatedWork: React.FC<RelatedWorkProps> = ({ studies }) => {
  if (studies.length === 0) return null;

  return (
    <section className='border-edge border-t'>
      <div className='container-site section-pad'>
        <p className='meta-label'>More work</p>
        <ul className='mt-[2.4rem]'>
          {studies.map((study) => (
            <li key={study.slug} className='border-line border-b first:border-t'>
              <Link
                href={`/work/${study.slug}`}
                className='group flex items-baseline justify-between gap-[2.4rem] py-[2.4rem]'
              >
                <span>
                  <span className='block text-[1.9rem] leading-[1.3] font-semibold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[0.6rem]'>
                    {study.title}
                  </span>
                  <span className='text-muted mt-[0.6rem] block text-[1.4rem]'>
                    {study.projectType} · {caseStudyStatusLabel(study.status)}
                    {study.isDemo && study.demoLabel && <> · {study.demoLabel}</>}
                  </span>
                </span>
                <span aria-hidden='true' className='text-blue text-[1.8rem]'>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RelatedWork;
