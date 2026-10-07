import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import DemoBadge from '@src/components/work/DemoBadge';

import { caseStudyStatusLabel } from '@src/lib/caseStudies';
import type { CaseStudy } from '@src/lib/caseStudies';

type CaseStudyRowProps = {
  study: CaseStudy;
  /** Ledger index, e.g. '01'. */
  index: string;
  /** Heading level for the project title (h2 on /work, h3 on the homepage). */
  headingLevel?: 'h2' | 'h3';
  /** First row can suppress its top hairline when the section provides one. */
  first?: boolean;
  /** Give the media next/image priority (above-the-fold rows). */
  priority?: boolean;
};

/**
 * Full-width editorial case-study row: ledger index, title and summary,
 * credits metadata, then the project media. Used by the Work index and the
 * homepage selected-work section. Static hover states only.
 */
const CaseStudyRow: React.FC<CaseStudyRowProps> = ({
  study,
  index,
  headingLevel = 'h2',
  first = false,
  priority = false,
}) => {
  const Heading = headingLevel;
  const href = `/work/${study.slug}`;

  const credits: { label: string; value: string }[] = [
    { label: 'Type', value: study.projectType },
    { label: 'Status', value: study.statusNote ?? caseStudyStatusLabel(study.status) },
    ...(study.platforms?.length ? [{ label: 'Platform', value: study.platforms.join(', ') }] : []),
    ...(study.year ? [{ label: 'Year', value: study.year }] : []),
  ];

  return (
    <article className={first ? '' : 'border-edge border-t'}>
      <Link href={href} className='group container-site block py-[4.8rem]'>
        <div className='grid gap-[2.4rem] lg:grid-cols-12'>
          <span className='tnum text-muted-dark text-[1.3rem] font-medium lg:col-span-1'>
            {index}
          </span>
          <div className='lg:col-span-6'>
            <p className='meta-label text-blue flex flex-wrap items-center gap-[1.2rem]'>
              <span>{caseStudyStatusLabel(study.status)}</span>
              {study.isDemo && study.demoLabel && <DemoBadge label={study.demoLabel} />}
            </p>
            <Heading className='mt-[1.2rem] text-[clamp(2.4rem,3.4vw,3.8rem)] leading-[1.1] font-semibold group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[0.8rem]'>
              {study.title}
            </Heading>
            <p className='text-muted mt-[1.2rem] max-w-[58ch] text-[1.55rem] leading-[1.6]'>
              {study.summary}
            </p>
            <p className='text-ink mt-[2rem] text-[1.45rem] font-semibold'>
              View the {study.isDemo ? 'demo' : ''} case study
              <span className='sr-only'>: {study.title}</span> <span aria-hidden='true'>→</span>
            </p>
          </div>
          <dl className='flex flex-col gap-[1.2rem] lg:col-span-4 lg:col-start-9'>
            {credits.map((credit) => (
              <div
                key={credit.label}
                className='border-line flex justify-between gap-[1.6rem] border-b pb-[1rem]'
              >
                <dt className='meta-label'>{credit.label}</dt>
                <dd className='text-right text-[1.4rem] font-medium'>{credit.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        {study.heroMedia && (
          <div className='mt-[3.2rem]'>
            <Image
              src={study.heroMedia.src}
              alt={study.heroMedia.alt}
              width={study.heroMedia.width}
              height={study.heroMedia.height}
              sizes='(min-width: 1280px) 1200px, 100vw'
              priority={priority}
              unoptimized={study.heroMedia.src.endsWith('.svg')}
              className='h-auto w-full border border-[color:var(--color-line)]'
            />
          </div>
        )}
      </Link>
    </article>
  );
};

export default CaseStudyRow;
