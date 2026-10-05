// -------------- STUDIO IMAGE --------------
// One place that encodes the project's next/image conventions for the static
// asset system: intrinsic width/height from the manifest (CLS-safe), SVGs
// served `unoptimized`, and an explicit `sizes`. No animation — no zoom,
// crossfade or hover scale is ever added here.

import Image from 'next/image';
import type { StudioAsset } from '@src/lib/assets';
import { isVector } from '@src/lib/assets';

type StudioImageProps = {
  asset: StudioAsset;
  /** Responsive sizes hint. Defaults to the full-bleed convention. */
  sizes?: string;
  /** Only true for genuine above-the-fold hero art. */
  priority?: boolean;
  className?: string;
};

const DEFAULT_SIZES = '(min-width: 1280px) 1200px, 100vw';

export default function StudioImage({
  asset,
  sizes = DEFAULT_SIZES,
  priority = false,
  className,
}: StudioImageProps) {
  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      priority={priority}
      unoptimized={isVector(asset)}
      className={className}
    />
  );
}
