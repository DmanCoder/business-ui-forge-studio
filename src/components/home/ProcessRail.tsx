import React from 'react';
import Link from 'next/link';

import Eyebrow from '@src/components/ui/Eyebrow';
import { PROCESS } from '@src/content/home';

type ProcessRailProps = {
  /** Ledger index for the section eyebrow, e.g. '05'. */
  eyebrowIndex?: string;
};

const GROUP_LABEL =
  'text-blue-soft text-[1.15rem] font-semibold tracking-[0.16em] uppercase md:absolute md:top-[2.4rem] md:left-0';

/**
 * Home "How we work" section: ONE ordered list of seven stages, so reading
 * and tab order run 01–07. Stages 01–06 sit in two labelled groups (Plan &
 * design, Build & launch): three columns on desktop, two on tablet, a single
 * vertical timeline on mobile (number column left, content right, one
 * continuous hairline rail). Stage 07 (Support) closes the sequence as a
 * deliberate full-width band with the process link. Dark band, hairlines
 * only, no gradients or shadows, instant hover/focus states.
 */
const ProcessRail: React.FC<ProcessRailProps> = ({ eyebrowIndex }) => {
  const stages = PROCESS.groups.flatMap((group) =>
    group.stages.map((stage, index) => ({
      ...stage,
      groupLabel: index === 0 ? group.label : null,
    }))
  );

  return (
    <section className='bg-ink text-white' aria-labelledby='how-we-work-heading'>
      <div className='container-site section-pad'>
        {/* Intro row: label left, heading + support copy in the content column */}
        <div className='grid gap-[2rem] lg:grid-cols-12'>
          <div className='lg:col-span-3'>
            <Eyebrow index={eyebrowIndex} onDark>
              {PROCESS.eyebrow}
            </Eyebrow>
          </div>
          <div className='lg:col-span-8'>
            <h2
              id='how-we-work-heading'
              className='max-w-[22ch] text-[clamp(2.8rem,3.6vw,4rem)] leading-[1.12] font-semibold text-white'
            >
              {PROCESS.heading}
            </h2>
            <p className='text-edge mt-[2rem] max-w-[58ch] text-[1.6rem] leading-[1.7]'>
              {PROCESS.body}
            </p>
          </div>
        </div>

        {/* Primary process rail + support band — one <ol>, seven <li> */}
        <ol className='mt-[5.6rem] list-none md:grid md:grid-cols-2 md:gap-x-[3.2rem] lg:grid-cols-3'>
          {stages.map((stage, index) => {
            const number = String(index + 1).padStart(2, '0');
            const startsGroup = stage.groupLabel !== null;
            const endsDesktopRow = (index + 1) % 3 === 0;

            return (
              <li
                key={stage.name}
                className='relative grid grid-cols-[4.8rem_1fr] gap-x-[1.6rem] border-t border-white/15 py-[2.4rem] md:block md:min-h-[20rem] md:pt-[5.6rem] md:pb-[2.8rem]'
              >
                {startsGroup && (
                  <p className={`${GROUP_LABEL} col-span-2 mb-[1.6rem] md:mb-0`}>
                    {stage.groupLabel}
                  </p>
                )}
                <span className='tnum text-blue-soft text-[1.4rem] font-semibold'>{number}</span>
                <div className='md:mt-[1.2rem]'>
                  <h3 className='text-[1.9rem] leading-[1.25] font-semibold text-white'>
                    {stage.name}
                  </h3>
                  <p className='text-edge mt-[0.8rem] max-w-[34ch] text-[1.5rem] leading-[1.6]'>
                    {stage.body}
                  </p>
                </div>
                {/* Desktop-only connector between stages in a row — presentation only */}
                {!endsDesktopRow && (
                  <span
                    aria-hidden='true'
                    className='text-blue-soft absolute top-[5.6rem] right-[-2.3rem] hidden text-[1.4rem] lg:block'
                  >
                    →
                  </span>
                )}
              </li>
            );
          })}

          {/* 07 — Support: full-width closing band, never a leftover cell */}
          <li className='grid grid-cols-[4.8rem_1fr] gap-x-[1.6rem] gap-y-[2rem] border-t border-b border-white/15 py-[2.8rem] md:col-span-2 md:mt-[2.4rem] md:grid-cols-12 md:gap-x-[3.2rem] md:py-[3.6rem] lg:col-span-3'>
            <div className='md:col-span-3'>
              <span className='tnum text-blue-soft text-[1.4rem] font-semibold'>07</span>
              <p className='text-blue-soft mt-[0.8rem] hidden text-[1.15rem] font-semibold tracking-[0.16em] uppercase md:block'>
                {PROCESS.support.label}
              </p>
            </div>
            <div className='md:col-span-5'>
              <p className='text-blue-soft mb-[1.2rem] text-[1.15rem] font-semibold tracking-[0.16em] uppercase md:hidden'>
                {PROCESS.support.label}
              </p>
              <h3 className='text-[1.9rem] leading-[1.25] font-semibold text-white'>
                {PROCESS.support.name}
              </h3>
              <p className='text-edge mt-[0.8rem] max-w-[52ch] text-[1.5rem] leading-[1.6]'>
                {PROCESS.support.body}
              </p>
            </div>
            <p className='col-span-2 md:col-span-4 md:self-end md:justify-self-end md:text-right'>
              <Link
                href={PROCESS.support.link.href}
                className='decoration-blue-soft hover:text-blue-soft inline-block text-[1.5rem] leading-[1.5] font-semibold text-white underline decoration-2 underline-offset-[0.6rem]'
              >
                {PROCESS.support.link.label}&nbsp;→
              </Link>
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default ProcessRail;
