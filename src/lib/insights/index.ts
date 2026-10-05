// -------------- INSIGHTS — DATA ACCESS --------------
// ARCHITECTURE NOTE: these functions are currently synchronous lookups over
// LOCAL_ARTICLES, but they are exported as async so a Contentful-backed
// implementation can replace the local source later without touching any
// page or component. Local content is the development/production fallback
// until matching Contentful entries exist (see docs/CONTENTFUL-MIGRATION.md).
// Do NOT wire live Contentful queries here yet — the space still contains
// only guitar content.

import { LOCAL_ARTICLES } from './local';
import type { InsightArticle, InsightArticleSource, InsightBlock, InsightCategory } from './types';

export const PAGE_SIZE = 9;

const WORDS_PER_MINUTE = 225;

const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

/** Reading time: ceil(words / 225), minimum 1. */
export const computeReadMins = (blocks: InsightBlock[]): number => {
  let words = 0;

  for (const block of blocks) {
    switch (block.t) {
      case 'p':
      case 'h2':
      case 'h3':
      case 'quote':
      case 'code':
        words += countWords(block.x);
        break;
      case 'ul':
        words += countWords(block.x.join(' '));
        break;
      case 'callout':
        words += countWords(`${block.title} ${block.x}`);
        break;
      case 'table':
        words += countWords(
          [block.headers.join(' '), ...block.rows.map((row) => row.join(' '))].join(' ')
        );
        break;
      case 'img':
        if (block.caption) words += countWords(block.caption);
        break;
    }
  }

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};

/** '30 June 2026' (en-AU style, D Month YYYY). */
export const formatInsightDate = (iso: string): string =>
  new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));

/**
 * Shared slug rule for categories and heading anchors:
 * lowercase, '&' → 'and', everything non-alphanumeric collapses to '-'.
 */
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * The prototype content model links with '#/path' hash routes; the real site
 * uses clean paths. Normalised here so article copy stays verbatim in data.
 */
export const normalizeInsightHref = (href: string): string => {
  if (!href.startsWith('#/')) return href;

  const path = href.slice(1);
  if (path === '/start') return '/start-a-project';
  if (path === '/home') return '/';
  return path;
};

const withReadMins = (article: InsightArticleSource): InsightArticle => ({
  ...article,
  readMins: computeReadMins(article.blocks),
});

/** Published articles, newest first. Drafts are excluded here and everywhere. */
const publishedSorted = (): InsightArticle[] =>
  LOCAL_ARTICLES.filter((article) => article.published)
    .map(withReadMins)
    .sort((a, b) => b.date.localeCompare(a.date));

export async function getPublishedArticles(): Promise<InsightArticle[]> {
  return publishedSorted();
}

/** Published articles only — draft slugs never resolve. */
export async function getArticleBySlug(slug: string): Promise<InsightArticle | null> {
  return publishedSorted().find((article) => article.slug === slug) ?? null;
}

/** Same category, excluding the article itself, up to `max`. */
export async function getRelatedArticles(
  article: InsightArticle,
  max = 3
): Promise<InsightArticle[]> {
  return publishedSorted()
    .filter((other) => other.slug !== article.slug && other.category === article.category)
    .slice(0, max);
}

/** Neighbours in the date-sorted published list. */
export async function getAdjacent(
  article: InsightArticle
): Promise<{ newer: InsightArticle | null; older: InsightArticle | null }> {
  const articles = publishedSorted();
  const index = articles.findIndex((other) => other.slug === article.slug);

  if (index === -1) return { newer: null, older: null };

  return {
    newer: index > 0 ? articles[index - 1] : null,
    older: index < articles.length - 1 ? articles[index + 1] : null,
  };
}

/** Unique categories (published articles only) with counts, A→Z. */
export async function getCategories(): Promise<InsightCategory[]> {
  const counts = new Map<string, number>();

  for (const article of publishedSorted()) {
    counts.set(article.category, (counts.get(article.category) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, slug: slugify(name), count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Resolve a URL category slug back to its category, or null. */
export async function getCategoryBySlug(slug: string): Promise<InsightCategory | null> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}

/** h2 headings with the same ids InsightBlocks renders — used for the TOC. */
export const extractH2s = (blocks: InsightBlock[]): { id: string; text: string }[] =>
  blocks
    .filter((block): block is Extract<InsightBlock, { t: 'h2' }> => block.t === 'h2')
    .map((block) => ({ id: slugify(block.x), text: block.x }));
