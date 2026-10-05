'use client';
import React from 'react';
import Image from 'next/image';

import BodyCopyRenderer from '@src/components/Shared/BodyCopyRenderer';

import { NextImagePropTypes } from './NextImage.types';

/**
 * NextImage — responsive, sharp, and efficient
 *
 * - Uses Next.js `loader` to generate proper srcset variants.
 * - Default `sizes` tuned for mobile/tablet/desktop:
 *   mobile: 100vw, tablet: 80vw, desktop: fixed 1024px render area.
 * - Discrete width steps to control number of generated variants.
 *
 * Tip: Align `PROD_WIDTHS` with `images.deviceSizes` in next.config.js.
 */

// Discrete widths to keep variants under control (2× DPR friendly)

/**
 * Mobile-first sizes:
 * - default (≤500px): 100vw
 * - ≥501px (small tablet / large mobile landscape): 90vw
 * - ≥769px (tablet): 80vw
 * - ≥1025px (desktop): fixed ~1024px area
 */
const DEFAULT_SIZES =
  '100vw, (min-width: 501px) 90vw, (min-width: 769px) 80vw, (min-width: 1025px) 1024px';

const NextImage: React.FC<NextImagePropTypes> = ({
  src,
  alt = '',
  children,
  className = '',
  aspectRatio,
  priority = false,
  objectFit = 'cover',
  title,
  caption,
  width = 1024, // logical render width for aspect-ratio mode
  childrenClassName = '',
  sizes,
  quality = 60,
  imgREF,
}) => {
  const computedHeight = Math.round(width / (aspectRatio || 1));
  // If consumer didn’t pass sizes, use our mobile/tablet/desktop defaults
  const resolvedSizes = sizes || DEFAULT_SIZES;

  // When aspectRatio is provided, we use fixed width/height (best CLS);
  // otherwise fill container with objectFit.
  const imageProps = aspectRatio
    ? { width, height: computedHeight, priority, title }
    : { fill: true, style: { objectFit }, priority, title };

  return (
    <figure ref={imgREF} className={`relative ${className}`}>
      {src && (
        <Image
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          className='!static'
          sizes={resolvedSizes}
          quality={quality}
          {...imageProps}
        />
      )}

      {children && (
        <div
          className={`absolute transform ${
            childrenClassName || 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
          }`}
        >
          {children}
        </div>
      )}

      {caption && (
        <figcaption className='mt-[1.6rem] text-center text-[1.4rem] leading-[1.8rem] italic 2xl:mx-[3rem]'>
          {typeof caption === 'object' ? (
            <BodyCopyRenderer bodyCopy={caption} className='font-light' />
          ) : (
            caption
          )}
        </figcaption>
      )}
    </figure>
  );
};

export default NextImage;
