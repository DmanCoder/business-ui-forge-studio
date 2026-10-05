// -------------- CASE STUDIES — DATA ACCESS --------------
// ARCHITECTURE NOTE: like src/lib/insights, these are synchronous lookups
// over local typed content, exported as async so a Contentful-backed
// implementation (content types documented in
// docs/UI-FORGE-CASE-STUDY-CONTENTFUL.md) can replace the source later
// without touching any page or component. Honesty gates live here:
// unpublished case studies and unverified testimonials never leave this
// module.
//
// SOURCE MERGE ORDER (docs/UI-FORGE-CASE-STUDY-CONTENTFUL.md):
//   1. Real Contentful content (when wired) — wins slug collisions.
//   2. Approved local/internal content (local.ts).
//   3. Demo content (demo.ts) — only while SHOW_DEMO_CONTENT=true, always
//      labelled, always noindexed, never duplicated into Contentful.

import { isDemoContentEnabled } from '@src/config/flags';
import { LOCAL_CASE_STUDIES, LOCAL_TESTIMONIALS } from './local';
import { DEMO_CASE_STUDIES, DEMO_TESTIMONIALS } from './demo';
import type { CaseStudy, CaseStudyStatus, Testimonial } from './types';
import { CASE_STUDY_STATUS_LABELS } from './types';

export { CASE_STUDY_STATUS_LABELS };
export type { CaseStudy, CaseStudyStatus, Testimonial };

/** Homepage shows at most this many featured projects. */
export const FEATURED_WORK_LIMIT = 4;

/**
 * A dedicated /testimonials page is only justified at this many verified,
 * substantive testimonials. Below it, quotes appear on the homepage and on
 * their related case studies only. (Demo mode previews the page with sample
 * quotes — see shouldPublishTestimonialsPage.)
 */
export const TESTIMONIALS_PAGE_THRESHOLD = 4;

/** Public status label, e.g. 'Internal project'. */
export const caseStudyStatusLabel = (status: CaseStudyStatus): string =>
  CASE_STUDY_STATUS_LABELS[status];

/**
 * All case-study sources in precedence order: real/approved local entries
 * first, then demo entries only while demo mode is on. Real entries win slug
 * collisions, so a demo entry can never shadow real work.
 */
const mergedSources = (): CaseStudy[] => {
  if (!isDemoContentEnabled()) return LOCAL_CASE_STUDIES;

  const realSlugs = new Set(LOCAL_CASE_STUDIES.map((study) => study.slug));
  return [...LOCAL_CASE_STUDIES, ...DEMO_CASE_STUDIES.filter((s) => !realSlugs.has(s.slug))];
};

const publishedOrdered = (): CaseStudy[] =>
  mergedSources()
    .filter((study) => study.published)
    .sort(
      (a, b) =>
        (a.workPageOrder ?? Number.MAX_SAFE_INTEGER) - (b.workPageOrder ?? Number.MAX_SAFE_INTEGER)
    );

/** Published case studies in intentional work-page order. */
export async function getPublishedCaseStudies(): Promise<CaseStudy[]> {
  return publishedOrdered();
}

/**
 * Published case studies only — unpublished slugs never resolve, and demo
 * slugs resolve only while demo mode is on (404 otherwise).
 */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  return publishedOrdered().find((study) => study.slug === slug) ?? null;
}

/** Featured projects for the homepage, in featured order, capped. */
export async function getFeaturedCaseStudies(max = FEATURED_WORK_LIMIT): Promise<CaseStudy[]> {
  return publishedOrdered()
    .filter((study) => study.featured)
    .sort(
      (a, b) =>
        (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER)
    )
    .slice(0, max);
}

/** Explicitly related studies first, then others in order, up to `max`. */
export async function getRelatedCaseStudies(study: CaseStudy, max = 2): Promise<CaseStudy[]> {
  const published = publishedOrdered().filter((other) => other.slug !== study.slug);
  const explicit = (study.relatedSlugs ?? [])
    .map((slug) => published.find((other) => other.slug === slug))
    .filter((other): other is CaseStudy => Boolean(other));
  const rest = published.filter((other) => !explicit.includes(other));

  return [...explicit, ...rest].slice(0, max);
}

/** The next study in work-page order (wrapping), or null when alone. */
export async function getNextCaseStudy(study: CaseStudy): Promise<CaseStudy | null> {
  const published = publishedOrdered();
  if (published.length < 2) return null;

  const index = published.findIndex((other) => other.slug === study.slug);
  if (index === -1) return null;

  return published[(index + 1) % published.length];
}

// -------------- TESTIMONIALS --------------

const verifiedTestimonials = (): Testimonial[] =>
  LOCAL_TESTIMONIALS.filter((testimonial) => testimonial.verified);

/**
 * Testimonials allowed to render: real client quotes must be `verified`;
 * clearly-labelled demo samples are additionally allowed only while demo
 * mode is on. `verified` is never overloaded to mean "allowed in demo mode",
 * and demo entries never satisfy the real verification rule.
 */
const publishableTestimonials = (): Testimonial[] => {
  const verified = verifiedTestimonials();
  if (!isDemoContentEnabled()) return verified;

  return [...verified, ...DEMO_TESTIMONIALS.filter((testimonial) => testimonial.isDemo)];
};

/** Every verified testimonial. Unverified entries never leave this module. */
export async function getVerifiedTestimonials(): Promise<Testimonial[]> {
  return verifiedTestimonials();
}

/** Publishable testimonials flagged for the homepage, in featured order. */
export async function getHomeTestimonials(max = 3): Promise<Testimonial[]> {
  return publishableTestimonials()
    .filter((testimonial) => testimonial.featuredOnHome)
    .sort(
      (a, b) =>
        (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER)
    )
    .slice(0, max);
}

/** Publishable testimonials for the /testimonials page, in featured order. */
export async function getTestimonialsPageTestimonials(): Promise<Testimonial[]> {
  return publishableTestimonials()
    .filter((testimonial) => testimonial.displayOnTestimonialsPage !== false)
    .sort(
      (a, b) =>
        (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER)
    );
}

/** The publishable testimonial linked to a case study, if any. */
export async function getTestimonialForCaseStudy(study: CaseStudy): Promise<Testimonial | null> {
  if (!study.testimonialId) return null;
  return (
    publishableTestimonials().find((testimonial) => testimonial.id === study.testimonialId) ?? null
  );
}

/**
 * Whether the /testimonials route may render at all. True when the real
 * verified threshold is met, or while demo mode previews the page with
 * labelled sample quotes. The route 404s when this is false.
 */
export async function shouldPublishTestimonialsPage(): Promise<boolean> {
  if (await shouldIndexTestimonialsPage()) return true;
  return isDemoContentEnabled() && DEMO_TESTIMONIALS.length > 0;
}

/**
 * The real content threshold — verified quotes only, demo mode ignored.
 * Controls whether /testimonials may be indexed and enter the sitemap; a
 * demo-only testimonials page is always noindexed and left out of the
 * sitemap.
 */
export async function shouldIndexTestimonialsPage(): Promise<boolean> {
  return (
    verifiedTestimonials().filter((testimonial) => testimonial.displayOnTestimonialsPage !== false)
      .length >= TESTIMONIALS_PAGE_THRESHOLD
  );
}
