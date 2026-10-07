// -------------- CASE STUDIES — CONTENT TYPES --------------
// Portable, CMS-ready shapes for case studies and testimonials. Narrative
// sections reuse the InsightBlock structure so the existing block renderer
// (components/insights/InsightBlocks.tsx) renders case-study prose too.
// The matching Contentful model is documented in
// docs/UI-FORGE-CASE-STUDY-CONTENTFUL.md.

import type { InsightBlock } from '@src/lib/insights/types';

export type CaseStudyStatus = 'completed' | 'in-progress' | 'internal' | 'concept';

/** Public label for each status — shown verbatim wherever status appears. */
export const CASE_STUDY_STATUS_LABELS: Record<CaseStudyStatus, string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  internal: 'Internal project',
  concept: 'Concept project',
};

export type CaseStudyMedia = {
  /** Public path (e.g. '/static/work/...') or absolute URL. */
  src: string;
  alt: string;
  caption?: string;
  /** Intrinsic dimensions for next/image. */
  width: number;
  height: number;
};

/**
 * A quantitative claim. Never rendered unless `verified` is true AND the
 * claim's basis (`context`/`source`) is stated.
 */
export type CaseStudyMetric = {
  label: string;
  value: string;
  /** What the number means and how it was measured. */
  context: string;
  /** Where the number comes from (analytics export, audit report, …). */
  source?: string;
  verified: boolean;
};

/**
 * A client testimonial. `verified` means the exact wording, attribution and
 * placement were approved by the client (workflow in
 * docs/UI-FORGE-CASE-STUDY-CONTENTFUL.md). Unverified entries never render.
 */
export type Testimonial = {
  /** Stable id used by caseStudy.testimonialId. */
  id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  companyName?: string;
  companyUrl?: string;
  /** Slug of the related case study, if any. */
  caseStudySlug?: string;
  avatar?: CaseStudyMedia;
  companyLogo?: CaseStudyMedia;
  location?: string;
  /** ISO date the quote was given. */
  date?: string;
  verified: boolean;
  /** Internal note on how approval was obtained — never rendered. */
  approvalSource?: string;
  featuredOnHome: boolean;
  featuredOrder?: number;
  displayOnTestimonialsPage?: boolean;
  /**
   * Sample content, never a real client quote. Demo testimonials must keep
   * `verified: false`, render only while demo mode is on
   * (src/config/flags.ts), and always carry a visible `demoLabel`.
   */
  isDemo?: boolean;
  /** Visible badge text, e.g. 'Sample testimonial'. Required when isDemo. */
  demoLabel?: string;
};

/** A named approach workstream — only work actually performed. */
export type CaseStudyApproachItem = {
  label: string;
  body: string;
};

/** A case study as authored. Optional sections are omitted, never left empty. */
export type CaseStudySource = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  /** One-or-two-sentence index/hero summary. */
  summary: string;
  status: CaseStudyStatus;
  /** Short factual qualifier shown next to the status, e.g. 'In production'. */
  statusNote?: string;
  clientName?: string;
  clientUrl?: string;
  /** Public live site — only when the site is verifiably live and public. */
  liveUrl?: string;
  projectType: string;
  industry?: string;
  location?: string;
  /** Only when accurate; omit for unfinished work. */
  year?: string;
  duration?: string;
  services: string[];
  platforms?: string[];
  technologies?: string[];
  heroMedia?: CaseStudyMedia;
  gallery?: CaseStudyMedia[];
  featured: boolean;
  featuredOrder?: number;
  workPageOrder?: number;
  /** The business, the engagement, the scope, why the project existed. */
  overview?: InsightBlock[];
  /** What was not working and why the project mattered. */
  challenge?: InsightBlock[];
  /** Plain-language goals, rendered as a numbered editorial list. */
  goals?: string[];
  /** Workstreams actually performed. */
  approach?: CaseStudyApproachItem[];
  /** Design and implementation story with real visuals and decisions. */
  designAndBuild?: InsightBlock[];
  /**
   * Verified qualitative outcomes. Labelled 'Outcomes' for finished work and
   * 'Current progress' for in-progress work.
   */
  outcomes?: string[];
  /**
   * "What changed" ledger: labelled, scannable outcomes (area → result).
   * Rendered in place of the plain outcomes list when present.
   */
  outcomeLedger?: { label: string; body: string }[];
  /** Quantitative claims — each rendered only when verified. */
  verifiedMetrics?: CaseStudyMetric[];
  /** Id of a verified testimonial in the testimonial source. */
  testimonialId?: string;
  /** Slugs of related published case studies. */
  relatedSlugs?: string[];
  /**
   * Fictional demo project used to preview the case-study format. Demo
   * studies exist only while demo mode is on (src/config/flags.ts), must use
   * `status: 'concept'`, set `noIndex: true`, and always carry a visible
   * `demoLabel`. Never presented as client work.
   */
  isDemo?: boolean;
  /** Visible badge text, e.g. 'Demo case study'. Required when isDemo. */
  demoLabel?: string;
  /** Unpublished studies never render, resolve, or enter the sitemap. */
  published: boolean;
  /** Set true for private/draft/concept work that must not rank. */
  noIndex?: boolean;
  /** ISO dates. */
  publishedAt?: string;
  updatedAt?: string;
};

/** A case study as consumed by pages (room for computed fields later). */
export type CaseStudy = CaseStudySource;
