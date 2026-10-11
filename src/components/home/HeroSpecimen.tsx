import React from 'react';

import { BrowserFrame, FauxCta } from '@src/components/graphics/Frame';
import SystemCrop from '@src/components/graphics/SystemCrop';

/** Three ledger rows inside the design panel — the shape of a project. */
const DESIGN_ROWS = [
  { index: '01', name: 'Discover', note: 'Goals · scope' },
  { index: '02', name: 'Design', note: 'Layouts · system' },
  { index: '03', name: 'Build', note: 'Next.js · launch' },
];

/**
 * Homepage hero specimen — "Design → Build" as one system. The left/top panel
 * is a designed page fragment set in the site's real type with the real CTA
 * look; the right/bottom panel is the system that produced it (SystemCrop).
 * Rendered from live tokens, so what it prints is true of this site.
 *
 * Decorative: the whole figure is aria-hidden and the description lives in an
 * sr-only paragraph outside it. Every CTA inside is a non-interactive span.
 * Static — no transitions, no motion.
 */
const HeroSpecimen: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={className}>
    <p className='sr-only'>
      A specimen of the studio&rsquo;s system: a designed page fragment set in the site&rsquo;s own
      typefaces beside the type scale, colour palette and tokens it is built from — design and
      development as one system.
    </p>

    <figure
      aria-hidden='true'
      className='grid gap-[1.6rem] md:grid-cols-[3fr_2fr] md:items-start md:gap-[2rem] xl:grid-cols-1 xl:gap-0'
    >
      {/* 01 · Design */}
      <BrowserFrame>
        <div className='px-[1.8rem] py-[1.6rem] md:px-[2rem] md:py-[1.8rem]'>
          <p className='meta-label text-blue'>01 · Design</p>
          <p className='font-display mt-[1rem] text-[clamp(2.4rem,2.2vw,3rem)] leading-[1.05] tracking-[-0.01em]'>
            Clear site.
            <br />
            Real work.
          </p>
          <p className='text-muted mt-[1rem] text-[1.3rem] leading-[1.5]'>
            One page, one job, one next step.
          </p>
          <p className='mt-[1.4rem] flex flex-wrap gap-[0.8rem]'>
            <FauxCta>Start a project</FauxCta>
            <FauxCta secondary>View work</FauxCta>
          </p>
          <ul className='mt-[1.8rem]'>
            {DESIGN_ROWS.map((row) => (
              <li
                key={row.index}
                className='border-line flex items-baseline gap-[1.2rem] border-t py-[0.7rem] text-[1.2rem]'
              >
                <span className='tnum text-blue font-semibold'>{row.index}</span>
                <span className='font-semibold'>{row.name}</span>
                <span className='text-muted ml-auto'>{row.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </BrowserFrame>

      {/* Seam — stacked layouts only */}
      <div className='flex items-center gap-[1.2rem] md:hidden xl:flex xl:py-[1.2rem]'>
        <span className='bg-edge h-px flex-1' />
        <span className='meta-label text-muted-dark'>Same hands</span>
        <span className='bg-edge h-px flex-1' />
      </div>

      {/* 02 · Build */}
      <SystemCrop label='02 · Build' compact ruler />
    </figure>

    <p className='meta-label mt-[1.4rem] text-[1.1rem]'>
      Designed and built by the same person · Next.js · zero animation
    </p>
  </div>
);

export default HeroSpecimen;
