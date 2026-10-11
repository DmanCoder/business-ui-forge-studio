import React from 'react';

/**
 * How a platform recommendation is reached: what the client tells us → what
 * we weigh → what they receive. Illustrates the decision process; it never
 * claims a specific recommendation has been made. Real lists, so assistive
 * technology reads the same structure a sighted visitor sees. Static.
 */

const INPUTS = [
  'What your business does',
  'What is not working today',
  'Who edits content, and how often',
  'Systems the site must connect to',
  'Commerce or application needs',
  'Budget and timeline',
  'Long-term plans',
];

const CRITERIA = ['Editing control', 'Flexibility', 'Performance', 'Running cost'];

const PLATFORMS = [
  'Next.js',
  'WordPress',
  'Webflow',
  'HubSpot',
  'Shopify',
  'React Native',
  'Custom application',
];

const STAGE_LABEL = 'meta-label flex items-baseline gap-[1.2rem]';

const PlatformDecision: React.FC<{ className?: string }> = ({ className = '' }) => (
  <figure className={`border-edge border ${className}`}>
    <ol className='bg-edge grid list-none gap-px md:grid-cols-3'>
      {/* 01 — inputs */}
      <li className='bg-paper p-[2.4rem] md:p-[2.8rem]'>
        <p className={STAGE_LABEL}>
          <span className='tnum text-blue'>01</span>
          What you tell us
        </p>
        <ul className='mt-[1.6rem]'>
          {INPUTS.map((item) => (
            <li
              key={item}
              className='border-line border-t py-[0.9rem] text-[1.45rem] leading-[1.4]'
            >
              {item}
            </li>
          ))}
        </ul>
      </li>

      {/* 02 — criteria */}
      <li className='bg-paper relative p-[2.4rem] md:p-[2.8rem]'>
        <span
          aria-hidden='true'
          className='text-edge absolute top-[2.2rem] left-[-0.9rem] hidden text-[1.8rem] leading-none md:block'
        >
          →
        </span>
        <p className={STAGE_LABEL}>
          <span className='tnum text-blue'>02</span>
          What we weigh
        </p>
        <ul className='mt-[1.6rem]'>
          {CRITERIA.map((item) => (
            <li
              key={item}
              className='border-line border-t py-[0.9rem] text-[1.45rem] leading-[1.4]'
            >
              {item}
            </li>
          ))}
        </ul>
        <p className='text-muted mt-[1.6rem] max-w-[28ch] text-[1.3rem] leading-[1.55]'>
          Weighed against your workflow and plans, not against a preferred stack.
        </p>
      </li>

      {/* 03 — outcome */}
      <li className='bg-paper relative p-[2.4rem] md:p-[2.8rem]'>
        <span
          aria-hidden='true'
          className='text-edge absolute top-[2.2rem] left-[-0.9rem] hidden text-[1.8rem] leading-none md:block'
        >
          →
        </span>
        <p className={STAGE_LABEL}>
          <span className='tnum text-blue'>03</span>
          What you receive
        </p>
        <p className='border-blue mt-[1.6rem] border bg-white px-[1.6rem] py-[1.4rem] text-[1.5rem] leading-[1.45] font-semibold'>
          One recommended platform and approach, with the reasoning explained in plain language.
        </p>
        <p className='meta-label mt-[1.8rem] text-[1.1rem]'>Drawn from</p>
        <ul className='mt-[0.8rem] flex flex-wrap gap-x-[0.8rem] gap-y-[0.4rem] text-[1.3rem]'>
          {PLATFORMS.map((platform, index) => (
            <li key={platform} className='text-muted'>
              {platform}
              {index < PLATFORMS.length - 1 && <span aria-hidden='true'> ·</span>}
            </li>
          ))}
        </ul>
      </li>
    </ol>
    <figcaption className='meta-label border-edge border-t px-[2.4rem] py-[1.2rem] md:px-[2.8rem]'>
      How a recommendation is reached — the platform follows the brief, never the other way round.
    </figcaption>
  </figure>
);

export default PlatformDecision;
