import React from 'react';

import { INSIGHT_ART_SIZES, type InsightArt } from '@src/lib/insights/types';

type InsightCoverProps = {
  art: InsightArt;
  /**
   * `card` — the cover cropped to 16:9 (index cards, related reading, prev/next).
   * `hero` — the 5:2 wide crop from the md breakpoint, the 3:2 cover below it.
   */
  variant?: 'card' | 'hero';
  /** True only for the article hero, which is the page's LCP image. */
  priority?: boolean;
  className?: string;
};

/**
 * The article artwork, as plain `<img>`/`<picture>` elements. The files are
 * static SVGs (next/image would serve them `unoptimized` anyway) and the
 * aspect ratio is fixed in CSS so the box is reserved before the file loads.
 * No zoom, no crossfade, no hover scale — the no-animation mandate applies.
 */
const InsightCover: React.FC<InsightCoverProps> = ({
  art,
  variant = 'card',
  priority = false,
  className = '',
}) => {
  const frame = `border-edge bg-paper block w-full border object-cover ${className}`;

  if (variant === 'hero') {
    return (
      <picture>
        <source
          media='(min-width: 768px)'
          srcSet={art.wide}
          width={INSIGHT_ART_SIZES.wide.width}
          height={INSIGHT_ART_SIZES.wide.height}
        />
        <img
          src={art.cover}
          alt={art.alt}
          width={INSIGHT_ART_SIZES.cover.width}
          height={INSIGHT_ART_SIZES.cover.height}
          fetchPriority={priority ? 'high' : undefined}
          loading={priority ? 'eager' : 'lazy'}
          decoding='async'
          className={`${frame} aspect-[3/2] h-auto md:aspect-[5/2]`}
        />
      </picture>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={art.cover}
      alt={art.alt}
      width={INSIGHT_ART_SIZES.cover.width}
      height={INSIGHT_ART_SIZES.cover.height}
      fetchPriority={priority ? 'high' : undefined}
      loading={priority ? 'eager' : 'lazy'}
      decoding='async'
      className={`${frame} aspect-video h-auto`}
    />
  );
};

export default InsightCover;
