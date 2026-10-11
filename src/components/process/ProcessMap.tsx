import React from 'react';

import { PROCESS_PHASES, PROCESS_MAP_GROUPS, PROCESS_MAP_NOTES } from '@src/content/process';

/**
 * The seven phases on one line. Desktop (md+) is a horizontal map with group
 * brackets, display numerals and a single spine; below that it becomes a
 * vertical rail so every label stays legible instead of shrinking. Vocabulary
 * matches the homepage rail (Plan & design / Build & launch / After launch).
 * Decorative: the phase ledger below carries the content. Static.
 */
const ProcessMap: React.FC<{ className?: string }> = ({ className = '' }) => {
  const phases = PROCESS_PHASES.map((phase, index) => ({
    number: String(index + 1).padStart(2, '0'),
    name: phase.name,
    note: PROCESS_MAP_NOTES[index],
  }));

  return (
    <div className={className}>
      <p className='sr-only'>
        The seven phases on one line, grouped as Plan &amp; design (Discover, Define, Design), Build
        &amp; launch (Build, Test, Launch) and After launch (Support).
      </p>

      {/* Desktop map */}
      <div
        aria-hidden='true'
        className='border-edge hidden border bg-white px-[clamp(2.4rem,4vw,4.8rem)] pt-[3.2rem] pb-[3.6rem] md:block'
      >
        <div className='grid grid-cols-7 gap-x-[1.6rem]'>
          {PROCESS_MAP_GROUPS.map((group) => (
            <div
              key={group.label}
              className='flex flex-col'
              style={{ gridColumn: `span ${group.span} / span ${group.span}` }}
            >
              <span className='meta-label text-center text-[1.1rem]'>{group.label}</span>
              <span className='border-edge mt-[0.8rem] block h-[1rem] border-t border-r border-l' />
            </div>
          ))}
        </div>

        <div className='mt-[2.8rem] grid grid-cols-7 gap-x-[1.6rem]'>
          {phases.map((phase) => (
            <div key={phase.number} className='relative'>
              <span className='font-display tnum text-blue block text-[clamp(3.2rem,4vw,5.2rem)] leading-none'>
                {phase.number}
              </span>
              <span className='bg-line ml-[0.6rem] block h-[3.2rem] w-px' />
            </div>
          ))}
        </div>

        {/* Spine */}
        <div className='relative grid grid-cols-7 gap-x-[1.6rem]'>
          <span className='bg-edge absolute top-[0.6rem] right-[1.5rem] left-[0.6rem] h-px' />
          {phases.map((phase) => (
            <span key={phase.number} className='relative block h-[1.2rem]'>
              <span className='bg-blue absolute top-0 left-0 h-[1.2rem] w-[1.2rem] rounded-full' />
            </span>
          ))}
        </div>

        <div className='mt-[1.6rem] grid grid-cols-7 gap-x-[1.6rem]'>
          {phases.map((phase) => (
            <div key={phase.number}>
              <span className='font-display block text-[clamp(1.8rem,1.8vw,2.4rem)] leading-[1.1]'>
                {phase.name}
              </span>
              <span className='text-muted mt-[0.6rem] block text-[1.2rem] leading-[1.4]'>
                {phase.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile rail */}
      <div aria-hidden='true' className='border-edge border bg-white px-[2rem] py-[2rem] md:hidden'>
        {PROCESS_MAP_GROUPS.map((group, groupIndex) => {
          const start = PROCESS_MAP_GROUPS.slice(0, groupIndex).reduce((n, g) => n + g.span, 0);
          const items = phases.slice(start, start + group.span);
          return (
            <div key={group.label} className={groupIndex === 0 ? '' : 'mt-[1.6rem]'}>
              <span className='meta-label text-[1.1rem]'>{group.label}</span>
              <ul className='border-edge mt-[0.8rem] ml-[0.6rem] border-l'>
                {items.map((phase) => (
                  <li
                    key={phase.number}
                    className='relative flex items-baseline gap-[1.4rem] py-[0.7rem] pl-[1.8rem]'
                  >
                    <span className='bg-blue absolute top-[1.2rem] left-[-0.45rem] h-[0.8rem] w-[0.8rem] rounded-full' />
                    <span className='tnum text-blue text-[1.3rem] font-semibold'>
                      {phase.number}
                    </span>
                    <span className='font-display text-[1.9rem] leading-none'>{phase.name}</span>
                    <span className='text-muted ml-auto text-right text-[1.15rem] leading-[1.3]'>
                      {phase.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessMap;
