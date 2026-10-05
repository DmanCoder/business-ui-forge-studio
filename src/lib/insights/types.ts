// -------------- INSIGHTS — CONTENT TYPES --------------
// Portable block structure for article bodies. Inline links and bold inside
// text strings use [label](href) and **bold** markdown-style syntax and are
// parsed at render time (see components/insights/InsightBlocks.tsx).

export type InsightBlock =
  | { t: 'p'; x: string }
  | { t: 'h2'; x: string }
  | { t: 'h3'; x: string }
  | { t: 'ul'; x: string[] }
  | { t: 'quote'; x: string }
  | { t: 'callout'; title: string; x: string }
  | { t: 'table'; headers: string[]; rows: string[][] }
  | { t: 'code'; x: string }
  | { t: 'img'; src?: string | null; alt?: string; caption?: string };

export type InsightCta = {
  title: string;
  text: string;
  label: string;
  href: string;
};

/** An article as authored — reading time is computed, not stored. */
export type InsightArticleSource = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  /** ISO publish date, e.g. '2026-06-30'. */
  date: string;
  /** ISO date of the last significant update, if any. */
  updated?: string;
  /** Drafts (false) must never render anywhere. */
  published: boolean;
  blocks: InsightBlock[];
  cta?: InsightCta;
};

/** An article as consumed by pages: source data + computed reading time. */
export type InsightArticle = InsightArticleSource & {
  /** Computed reading time: ceil(words / 225), minimum 1. */
  readMins: number;
};

export type InsightCategory = {
  name: string;
  slug: string;
  count: number;
};
