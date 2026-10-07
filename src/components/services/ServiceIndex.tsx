import React from 'react';
import Link from 'next/link';

import Eyebrow from '@src/components/ui/Eyebrow';
import { SERVICE_CATEGORIES, SERVICES_INDEX_PROMPT } from '@src/content/services';

/**
 * Services index: a ledger of seven service rows, each a real anchor to its
 * service page with a one-line descriptor so the difference between services
 * is clear before clicking. Desktop: section label in the left 3 columns, a
 * 2-column row grid in the remaining 9 — rows 01–06 fill three lines, 07 pairs
 * with a small "not sure?" prompt so the final line is never half empty.
 * Mobile: one stacked ledger. Hairlines only; instant hover/focus states.
 */
const ServiceIndex: React.FC = () => (
  <nav aria-labelledby='service-index-heading' className='border-edge border-t'>
    <div className='container-site grid gap-[2.4rem] py-[clamp(4rem,6vh,6.4rem)] lg:grid-cols-12 lg:gap-[3.2rem]'>
      <div className='lg:col-span-3'>
        <Eyebrow>Service index</Eyebrow>
        <h2
          id='service-index-heading'
          className='mt-[1.6rem] max-w-[14ch] text-[clamp(2.2rem,2.8vw,3rem)] leading-[1.15] font-semibold'
        >
          Seven services. One point of contact.
        </h2>
        <p className='text-muted mt-[1.2rem] max-w-[30ch] text-[1.45rem] leading-[1.6]'>
          Each page explains who the service is for, what it can include and how the work runs.
        </p>
      </div>

      <ol className='list-none lg:col-span-9 lg:grid lg:grid-cols-2 lg:gap-x-[3.2rem]'>
        {SERVICE_CATEGORIES.map((category, index) => (
          <li key={category.href} className='border-edge border-t'>
            <Link
              href={category.href}
              className='group grid min-h-[12.4rem] grid-cols-[4rem_1fr_auto] gap-x-[1.2rem] gap-y-[0.6rem] py-[2rem] lg:py-[2.4rem]'
            >
              <span className='tnum text-blue pt-[0.3rem] text-[1.3rem] font-semibold'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className='group-hover:text-blue group-focus-visible:text-blue text-[1.9rem] leading-[1.25] font-semibold'>
                {category.name}
              </span>
              <span
                aria-hidden='true'
                className='text-muted-dark group-hover:text-blue group-focus-visible:text-blue pt-[0.2rem] text-[1.8rem] leading-none'
              >
                →
              </span>
              <span className='text-muted col-start-2 col-end-4 max-w-[42ch] text-[1.45rem] leading-[1.6]'>
                {category.descriptor}
              </span>
            </Link>
          </li>
        ))}

        {/* Final cell: balances the 07 row on desktop, closes the ledger on mobile */}
        <li className='border-edge border-t border-b lg:border-b-0'>
          <Link
            href={SERVICES_INDEX_PROMPT.cta.href}
            className='group grid min-h-[12.4rem] grid-cols-[4rem_1fr_auto] gap-x-[1.2rem] gap-y-[0.6rem] py-[2rem] lg:py-[2.4rem]'
          >
            <span aria-hidden='true' className='text-blue pt-[0.3rem] text-[1.3rem] font-semibold'>
              ?
            </span>
            <span className='group-hover:text-blue group-focus-visible:text-blue text-[1.9rem] leading-[1.25] font-semibold'>
              {SERVICES_INDEX_PROMPT.heading}
            </span>
            <span
              aria-hidden='true'
              className='text-muted-dark group-hover:text-blue group-focus-visible:text-blue pt-[0.2rem] text-[1.8rem] leading-none'
            >
              →
            </span>
            <span className='text-muted col-start-2 col-end-4 max-w-[42ch] text-[1.45rem] leading-[1.6]'>
              {SERVICES_INDEX_PROMPT.body} {SERVICES_INDEX_PROMPT.cta.label}.
            </span>
          </Link>
        </li>
      </ol>
    </div>
  </nav>
);

export default ServiceIndex;
