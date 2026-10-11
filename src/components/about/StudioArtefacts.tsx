import React from 'react';
import Image from 'next/image';

import SystemCrop from '@src/components/graphics/SystemCrop';
import { TYPE_SCALE } from '@src/lib/designTokens';

/** Real screenshot of the current homepage — the same file the case study uses. */
const SITE_SCREENSHOT = {
  src: '/static/work/ui-forge-studio-home-desktop.png',
  width: 2880,
  height: 1800,
};

/**
 * Studio artefacts in place of a portrait: a crop of the real site, the real
 * type specimen, the modular grid and the system tokens. Every value is read
 * from the same token module as the hero and the case study. No portrait, no
 * placeholder, no motion.
 */
const StudioArtefacts: React.FC<{ className?: string }> = ({ className = '' }) => (
  <figure className={className}>
    <div className='border-edge border'>
      {/* The site — a real crop, not a wireframe */}
      <div className='border-line border-b'>
        <p className='meta-label px-[1.6rem] pt-[1.4rem]'>The site · homepage at 1440px</p>
        <div className='relative mt-[1.2rem] aspect-[3/2] overflow-hidden'>
          <Image
            src={SITE_SCREENSHOT.src}
            alt='Crop of the current UI Forge Studio homepage: the serif headline “Custom websites and digital products, designed and built around your business” beside the hero specimen.'
            width={SITE_SCREENSHOT.width}
            height={SITE_SCREENSHOT.height}
            sizes='(min-width: 1024px) 40vw, 100vw'
            className='absolute top-0 left-0 h-auto w-full'
          />
        </div>
      </div>

      {/* Type + grid */}
      <div className='border-line grid border-b sm:grid-cols-2'>
        <div className='border-line px-[1.6rem] py-[1.6rem] sm:border-r'>
          <p className='meta-label'>Type</p>
          <p className='font-display mt-[0.8rem] text-[6.4rem] leading-none'>Aa</p>
          <ul className='border-line mt-[1.2rem] border-t pt-[1rem]'>
            {TYPE_SCALE.map((row) => (
              <li
                key={row.role}
                className='flex justify-between gap-[1.2rem] py-[0.3rem] text-[1.25rem]'
              >
                <span className={row.role === 'Display' ? 'font-display text-[1.5rem]' : ''}>
                  {row.face}
                </span>
                <span className='text-muted font-mono text-[1.1rem]'>{row.role.toLowerCase()}</span>
              </li>
            ))}
          </ul>
        </div>
        <div aria-hidden='true' className='px-[1.6rem] py-[1.6rem]'>
          <p className='meta-label'>Grid · 12 columns</p>
          <div className='relative mt-[1.2rem] h-[12.8rem]'>
            <div className='absolute inset-0 grid grid-cols-12 gap-[0.4rem]'>
              {Array.from({ length: 12 }).map((_, index) => (
                <span key={index} className='bg-line/70 block h-full' />
              ))}
            </div>
            <div className='relative grid grid-cols-12 gap-[0.4rem] pt-[0.8rem]'>
              <span className='border-blue col-span-12 block h-[1.8rem] border bg-[color:var(--color-primary--light)]' />
              <span className='border-line col-span-8 mt-[0.8rem] block h-[1.8rem] border bg-white' />
              <span className='border-line col-span-4 mt-[0.8rem] block h-[1.8rem] border bg-white' />
              <span className='border-line col-span-5 mt-[0.8rem] block h-[1.8rem] border bg-white' />
              <span className='border-line col-span-7 mt-[0.8rem] block h-[1.8rem] border bg-white' />
            </div>
          </div>
        </div>
      </div>

      {/* Build tokens — the same specimen the hero and case study print */}
      <SystemCrop label='Build · tokens' className='border-0' />
    </div>
    <figcaption className='meta-label border-edge mt-[1.2rem] border-t pt-[1.2rem]'>
      Studio artefacts — the work, not a stock portrait
    </figcaption>
  </figure>
);

export default StudioArtefacts;
