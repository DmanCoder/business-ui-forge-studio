// -------------- INSIGHTS — DISCOVERY (SEARCH, FILTER, SORT, PAGE) --------------
// Pure functions shared by the server (initial render, metadata, 404s) and
// the client explorer. No React, no DOM: everything here is deterministic
// over the InsightSummary list, so the HTML the server renders for a URL is
// exactly what the client computes for the same URL.
//
// URL contract (all optional; defaults are omitted from the URL):
//   q=<text>              keyword search
//   category=<slug>       one category
//   topic=<slug,slug>     any of these topics (OR within the facet)
//   read=<bucket>         one reading-time bucket
//   sort=newest|oldest|az|relevance
//   page=<n>              1-based, applied after filtering
// Facets combine with AND; the search terms must all match (AND).

import type { InsightReadBucket, InsightSummary } from './types';

export type InsightSortKey = 'newest' | 'oldest' | 'az' | 'relevance';

export type DiscoveryState = {
  q: string;
  category: string | null;
  topics: string[];
  read: InsightReadBucket['slug'] | null;
  /** null = not chosen by the reader; resolved by `effectiveSort`. */
  sort: InsightSortKey | null;
  page: number;
};

export const DEFAULT_STATE: DiscoveryState = {
  q: '',
  category: null,
  topics: [],
  read: null,
  sort: null,
  page: 1,
};

export const SORT_OPTIONS: { value: InsightSortKey; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'az', label: 'A to Z' },
  { value: 'relevance', label: 'Relevance' },
];

const SORT_KEYS = new Set<string>(SORT_OPTIONS.map((option) => option.value));
const READ_KEYS = new Set<string>(['quick', 'medium', 'deep']);

type RawParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

/** Collapse whitespace and trim — the canonical form of a query. */
export const normaliseQuery = (value: string): string => value.replace(/\s+/g, ' ').trim();

/** Parse raw search params into a state. Unknown or malformed values are dropped. */
export const parseDiscoveryParams = (params: RawParams): DiscoveryState => {
  const q = normaliseQuery(first(params.q) ?? '').slice(0, 120);
  const category = first(params.category)?.trim() || null;
  const topics = (first(params.topic) ?? '')
    .split(',')
    .map((topic) => topic.trim())
    .filter(Boolean);
  const readRaw = first(params.read);
  const read = readRaw && READ_KEYS.has(readRaw) ? (readRaw as InsightReadBucket['slug']) : null;
  const sortRaw = first(params.sort);
  const sort = sortRaw && SORT_KEYS.has(sortRaw) ? (sortRaw as InsightSortKey) : null;
  const pageRaw = first(params.page);
  const page = pageRaw && /^[0-9]+$/.test(pageRaw) ? Math.max(1, parseInt(pageRaw, 10)) : 1;

  return { q, category, topics: [...new Set(topics)], read, sort, page };
};

/** True when nothing narrows or reorders the collection (page 1 of everything). */
export const isDefaultState = (state: DiscoveryState): boolean =>
  state.q === '' &&
  state.category === null &&
  state.topics.length === 0 &&
  state.read === null &&
  (state.sort === null || state.sort === 'newest') &&
  state.page === 1;

/** True when any filter (not paging or sorting) is active. */
export const hasActiveFilters = (state: DiscoveryState): boolean =>
  state.q !== '' || state.category !== null || state.topics.length > 0 || state.read !== null;

/**
 * The sort actually applied: the reader's choice, else relevance while a
 * query is active, else newest. Relevance without a query falls back to newest.
 */
export const effectiveSort = (state: DiscoveryState): InsightSortKey => {
  if (state.sort && state.sort !== 'relevance') return state.sort;
  return state.q ? 'relevance' : 'newest';
};

/** Serialise a state to a query string ('' for the default state). */
export const toSearchString = (state: DiscoveryState): string => {
  const params = new URLSearchParams();
  if (state.q) params.set('q', state.q);
  if (state.category) params.set('category', state.category);
  if (state.topics.length) params.set('topic', state.topics.join(','));
  if (state.read) params.set('read', state.read);
  if (state.sort && state.sort !== 'newest' && !(state.sort === 'relevance' && !state.q)) {
    params.set('sort', state.sort);
  }
  if (state.page > 1) params.set('page', String(state.page));
  const query = params.toString();
  return query ? `?${query}` : '';
};

/** Parse a `?…` string straight back into a state (used on popstate). */
export const fromSearchString = (search: string): DiscoveryState => {
  const params = new URLSearchParams(search);
  const raw: RawParams = {};
  params.forEach((value, key) => {
    raw[key] = value;
  });
  return parseDiscoveryParams(raw);
};

/** Search terms: lower-case words, two or more characters, de-duplicated. */
export const tokenise = (query: string): string[] => [
  ...new Set(
    normaliseQuery(query)
      .toLowerCase()
      .split(' ')
      .filter((term) => term.length >= 2)
  ),
];

export type SearchMatch = {
  /** Where the best match was found — drives the card's match context line. */
  field: 'title' | 'topic' | 'category' | 'heading' | 'summary' | 'excerpt';
  text: string;
};

export type ScoredSummary = {
  article: InsightSummary;
  score: number;
  match: SearchMatch | null;
};

const FIELD_WEIGHTS: Record<SearchMatch['field'], number> = {
  title: 10,
  topic: 6,
  category: 5,
  heading: 4,
  summary: 3,
  excerpt: 2,
};

/**
 * Score one article against the terms. Every term must appear somewhere
 * (AND); the score sums the best field weight per term, with a bonus for
 * the whole phrase in the title. Returns null when a term is missing.
 */
export const scoreArticle = (article: InsightSummary, terms: string[]): ScoredSummary | null => {
  if (terms.length === 0) return { article, score: 0, match: null };

  const fields: { field: SearchMatch['field']; text: string }[] = [
    { field: 'title', text: article.title },
    ...article.tags.map((tag) => ({ field: 'topic' as const, text: tag })),
    { field: 'category', text: article.category },
    ...article.headings.map((heading) => ({ field: 'heading' as const, text: heading })),
    ...(article.summary ? [{ field: 'summary' as const, text: article.summary }] : []),
    { field: 'excerpt', text: article.excerpt },
  ];
  const lowered = fields.map((entry) => ({ ...entry, lower: entry.text.toLowerCase() }));

  let score = 0;
  let best: { weight: number; field: SearchMatch['field']; text: string } | null = null;

  for (const term of terms) {
    let termBest = 0;
    for (const entry of lowered) {
      if (!entry.lower.includes(term)) continue;
      const weight = FIELD_WEIGHTS[entry.field];
      if (weight > termBest) termBest = weight;
      // Prefer showing a non-title match as context — the title is already visible.
      const contextWeight = entry.field === 'title' ? weight - 9 : weight;
      if (!best || contextWeight > best.weight) {
        best = { weight: contextWeight, field: entry.field, text: entry.text };
      }
    }
    if (termBest === 0) return null;
    score += termBest;
  }

  const phrase = terms.join(' ');
  if (terms.length > 1 && article.title.toLowerCase().includes(phrase)) score += 8;

  return { article, score, match: best ? { field: best.field, text: best.text } : null };
};

const compareBy = (sort: InsightSortKey) => (a: ScoredSummary, b: ScoredSummary) => {
  switch (sort) {
    case 'oldest':
      return a.article.date.localeCompare(b.article.date);
    case 'az':
      return a.article.title.localeCompare(b.article.title, 'en-AU');
    case 'relevance':
      return b.score - a.score || b.article.date.localeCompare(a.article.date);
    case 'newest':
    default:
      return b.article.date.localeCompare(a.article.date);
  }
};

export type DiscoveryResult = {
  /** Every match, sorted — the whole collection, not just one page. */
  results: ScoredSummary[];
  total: number;
  page: number;
  totalPages: number;
  pageItems: ScoredSummary[];
  /** The lead story carries the featured treatment only in the default state. */
  featured: boolean;
  sort: InsightSortKey;
  terms: string[];
};

/** Filter the whole collection, sort it, then take one page. */
export const applyDiscovery = (
  articles: InsightSummary[],
  state: DiscoveryState,
  pageSize: number
): DiscoveryResult => {
  const terms = tokenise(state.q);
  const topics = new Set(state.topics);

  const results: ScoredSummary[] = [];
  for (const article of articles) {
    if (state.category && article.categorySlug !== state.category) continue;
    if (topics.size && !article.tagSlugs.some((slug) => topics.has(slug))) continue;
    if (state.read && article.readBucket !== state.read) continue;
    const scored = scoreArticle(article, terms);
    if (scored) results.push(scored);
  }

  const sort = effectiveSort(state);
  results.sort(compareBy(sort));

  const total = results.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, state.page), totalPages);
  const pageItems = results.slice((page - 1) * pageSize, page * pageSize);

  return {
    results,
    total,
    page,
    totalPages,
    pageItems,
    featured: isDefaultState(state) && pageItems.length > 0,
    sort,
    terms,
  };
};
