import React from 'react';
import Image from 'next/image';

import type { CaseStudyMedia } from '@src/lib/caseStudies/types';

type CaseStudyMediaFigureProps = {
  media: CaseStudyMedia;
  /** next/image priority for above-the-fold hero media. */
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * A single piece of real project media with an optional caption. No zoom,
 * no crossfade, no device mockup chrome — a plain, well-cropped figure.
 */
const CaseStudyMediaFigure: React.FC<CaseStudyMediaFigureProps> = ({
  media,
  priority = false,
  sizes = '(min-width: 1280px) 1200px, 100vw',
  className = '',
}) => (
  <figure className={className}>
    <Image
      src={media.src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      sizes={sizes}
      priority={priority}
      unoptimized={media.src.endsWith('.svg')}
      className='h-auto w-full border border-[color:var(--color-line)]'
    />
    {media.caption && (
      <figcaption className='text-muted mt-[1.2rem] text-[1.35rem] leading-[1.5]'>
        {media.caption}
      </figcaption>
    )}
  </figure>
);

export default CaseStudyMediaFigure;
