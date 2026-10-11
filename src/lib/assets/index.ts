// -------------- STUDIO ASSET MANIFEST --------------
// Typed registry for the static files the site still ships as files: the
// logo masters (for structured data, email and third parties) and the
// rasterised Open Graph covers for insights articles.
//
// Every in-page graphic (hero specimen, service diagrams, platform decision,
// process map, studio artefacts, case-study figures) is now an HTML/CSS
// component under src/components, rendered from the live design tokens, so
// it no longer lives here. Case-study screenshots stay colocated with their
// content in src/lib/caseStudies/* (the `CaseStudyMedia` pattern).
//
// Every asset is STATIC. No animation anywhere in the set.

export type StudioAssetCategory = 'brand' | 'insight';

export type StudioAsset = {
  /** Public path under /static, or absolute URL. */
  src: string;
  alt: string;
  /** Intrinsic dimensions. */
  width: number;
  height: number;
  category: StudioAssetCategory;
};

// --- Brand -----------------------------------------------------------------

// Logo master files. The header and footer render the lockup inline via
// src/components/brand/Logo.tsx; these files exist for structured data,
// email, social and any third party that needs a URL to the artwork.

const logoLockup = (variant: string, surface: string): StudioAsset => ({
  src: `/static/brand/logo/ui-forge-horizontal-${variant}.svg`,
  width: 383,
  height: 100,
  category: 'brand',
  alt: `UI Forge Studio logo (${variant} version, for ${surface}).`,
});

/** Ink wordmark with the cobalt bar — the default on paper and white. */
export const LOGO_PRIMARY = logoLockup('primary', 'light surfaces');
export const LOGO_INK = logoLockup('ink', 'single-colour light surfaces');
export const LOGO_COBALT = logoLockup('cobalt', 'single-colour accent use');
export const LOGO_WHITE = logoLockup('white', 'ink and dark surfaces');

/** Square mark alone — the source every favicon is carved from. */
export const LOGO_MARK: StudioAsset = {
  src: '/static/brand/logo/ui-forge-mark.svg',
  width: 100,
  height: 100,
  category: 'brand',
  alt: 'UI Forge Studio mark: a forge frame with a cobalt bar.',
};

// --- Insight Open Graph covers (keyed by article slug) ---------------------
// 1200×630 PNGs rasterised by scripts/generate-static-assets.mjs — social
// platforms do not render SVG og:image. On-page article figures are HTML
// (components/insights/InsightFigure.tsx), not images.

export const INSIGHT_OG_IMAGES: Record<string, string> = {
  'what-affects-the-cost-of-a-website': '/static/insights/website-cost-og.png',
  'website-ownership-and-hosting-explained': '/static/insights/ownership-hosting-og.png',
  'custom-website-wordpress-or-webflow': '/static/insights/platform-comparison-og.png',
};

/** Open Graph image path for an article slug, if one exists. */
export const insightOgImageFor = (slug: string): string | undefined => INSIGHT_OG_IMAGES[slug];

/** True for vector assets that must be served with next/image `unoptimized`. */
export const isVector = (asset: Pick<StudioAsset, 'src'>): boolean => asset.src.endsWith('.svg');
