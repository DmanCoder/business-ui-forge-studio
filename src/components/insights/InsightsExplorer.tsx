'use client';

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import InsightCard from '@src/components/insights/InsightCard';
import {
  DEFAULT_STATE,
  SORT_OPTIONS,
  applyDiscovery,
  effectiveSort,
  fromSearchString,
  normaliseQuery,
  toSearchString,
  type DiscoveryState,
  type InsightSortKey,
} from '@src/lib/insights/discovery';
import type {
  InsightCategory,
  InsightReadBucket,
  InsightSummary,
  InsightTopic,
} from '@src/lib/insights/types';

type InsightsExplorerProps = {
  articles: InsightSummary[];
  categories: InsightCategory[];
  topics: InsightTopic[];
  readBuckets: InsightReadBucket[];
  /** State parsed from the request URL — the server rendered exactly this. */
  initial: DiscoveryState;
  pageSize: number;
  /** The route that owns the query-string state. */
  basePath?: string;
};

const QUERY_DEBOUNCE_MS = 200;
const DESKTOP_QUERY = '(min-width: 1024px)';

type UrlMode = 'push' | 'replace' | 'skip';

/* Icons — single-colour, currentColor, no decoration. */
const SearchIcon = () => (
  <svg aria-hidden='true' viewBox='0 0 24 24' className='h-[1.7rem] w-[1.7rem]' fill='none'>
    <circle cx='10.5' cy='10.5' r='6.5' stroke='currentColor' strokeWidth='1.8' />
    <path d='M15.5 15.5 21 21' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
  </svg>
);
const CloseIcon = () => (
  <svg aria-hidden='true' viewBox='0 0 24 24' className='h-[1.4rem] w-[1.4rem]' fill='none'>
    <path d='M6 6l12 12M18 6 6 18' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
  </svg>
);
const SlidersIcon = () => (
  <svg aria-hidden='true' viewBox='0 0 24 24' className='h-[1.6rem] w-[1.6rem]' fill='none'>
    <path d='M4 7h16M4 17h16' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
    <circle
      cx='9'
      cy='7'
      r='2.4'
      fill='var(--color-paper)'
      stroke='currentColor'
      strokeWidth='1.8'
    />
    <circle
      cx='15'
      cy='17'
      r='2.4'
      fill='var(--color-paper)'
      stroke='currentColor'
      strokeWidth='1.8'
    />
  </svg>
);

/** True from the lg breakpoint; false during SSR and on first paint. */
const useIsDesktop = () => {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return desktop;
};

/** Category pill: one solid state, one quiet state — no competing outlines. */
const pill = (active: boolean) =>
  `inline-flex min-h-[4.4rem] shrink-0 items-center gap-[0.6rem] rounded-[0.2rem] border px-[1.2rem] text-[1.35rem] whitespace-nowrap lg:min-h-[3.6rem] ${
    active
      ? 'bg-ink border-ink font-semibold text-white'
      : 'border-line text-muted hover:border-ink hover:text-ink font-medium'
  }`;

/** Active-filter chip: removable, one row, only when something is applied. */
const chipButton =
  'border-edge text-ink hover:border-ink inline-flex min-h-[3.6rem] items-center gap-[0.8rem] border px-[1.1rem] text-[1.3rem] font-medium';

/**
 * The discovery system for the insights index: keyword search, category
 * pills, a collapsed Filters popover (topics, reading time), sorting, one
 * active-filter row, an empty state and paging — all computed from one
 * state object that round-trips through the URL (see lib/insights/discovery).
 * Every state change is instant: no transitions, no skeletons, no motion.
 */
const InsightsExplorer: React.FC<InsightsExplorerProps> = ({
  articles,
  categories,
  topics,
  readBuckets,
  initial,
  pageSize,
  basePath = '/insights',
}) => {
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const uid = useId();
  const searchId = `${uid}-search`;
  const searchHintId = `${uid}-search-hint`;
  const panelId = `${uid}-filters`;
  const sortId = `${uid}-sort`;

  // One store: the discovery state plus how its last change should reach the
  // URL. The parent keys this component on the server-rendered state, so a
  // server re-render (after router.push from a category page, or a history
  // restore) remounts it with fresh `initial` values — no sync effect needed.
  const [store, setStore] = useState<{ state: DiscoveryState; mode: UrlMode }>({
    state: initial,
    mode: 'skip',
  });
  const state = store.state;
  const [draft, setDraft] = useState(initial.q);
  const [panelOpen, setPanelOpen] = useState(false);

  const mounted = useRef(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const filtersButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelHeadingRef = useRef<HTMLHeadingElement>(null);

  /* --- State transitions ------------------------------------------------ */

  const update = useCallback((patch: Partial<DiscoveryState>, mode: UrlMode = 'push') => {
    setStore((previous) => ({ state: { ...previous.state, ...patch }, mode }));
  }, []);

  // Debounced query: the input answers immediately, the URL and results follow.
  useEffect(() => {
    const next = normaliseQuery(draft);
    if (next === state.q) return;
    const timer = setTimeout(() => update({ q: next, page: 1 }, 'replace'), QUERY_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [draft, state.q, update]);

  // Reflect state in the URL. Discrete changes push history; typing replaces.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (store.mode === 'skip') return;

    const search = toSearchString(store.state);
    const pathname = window.location.pathname.replace(/\/$/, '');
    const onBase = pathname === basePath || pathname.endsWith(basePath);

    if (!onBase) {
      router.push(`${basePath}${search}`);
      return;
    }
    const target = `${window.location.pathname}${search}`;
    if (`${window.location.pathname}${window.location.search}` === target) return;
    if (store.mode === 'replace') window.history.replaceState(null, '', target);
    else window.history.pushState(null, '', target);
  }, [store, basePath, router]);

  // Back/forward: the URL is the source of truth.
  useEffect(() => {
    const onPopState = () => {
      const next = fromSearchString(window.location.search);
      setStore({ state: next, mode: 'skip' });
      setDraft(next.q);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  /* --- Results ---------------------------------------------------------- */

  const result = useMemo(
    () => applyDiscovery(articles, state, pageSize),
    [articles, state, pageSize]
  );
  const sort = effectiveSort(state);
  const facetCount = state.topics.length + (state.read ? 1 : 0);

  const categoryName = (slug: string | null) =>
    categories.find((category) => category.slug === slug)?.name ?? null;
  const topicName = (slug: string) => topics.find((topic) => topic.slug === slug)?.name ?? slug;
  const bucketLabel = (slug: string | null) =>
    readBuckets.find((bucket) => bucket.slug === slug)?.label ?? null;

  const visibleBuckets = readBuckets.filter((bucket) => bucket.count > 0);
  // A one-option facet cannot narrow anything — offer it only when it can.
  const showReadFacet = visibleBuckets.length >= 2 || state.read !== null;
  const panelHasFacets = topics.length > 0 || showReadFacet;

  const countLabel =
    result.total === 0
      ? 'No matches'
      : `${result.total} ${result.total === 1 ? 'article' : 'articles'}`;

  // Full description for assistive technology; the visible count stays short.
  const status = (() => {
    const parts: string[] = [result.total === 0 ? 'No articles match' : countLabel];
    if (state.q) parts.push(`for “${state.q}”`);
    const category = categoryName(state.category);
    if (category) parts.push(`in ${category}`);
    if (state.topics.length) parts.push(`on ${state.topics.map(topicName).join(', ')}`);
    const bucket = bucketLabel(state.read);
    if (bucket) parts.push(`· ${bucket}`);
    if (result.totalPages > 1) parts.push(`· page ${result.page} of ${result.totalPages}`);
    return parts.join(' ');
  })();

  /* --- Actions ---------------------------------------------------------- */

  const setCategory = (slug: string | null) => update({ category: slug, page: 1 });
  const toggleTopic = (slug: string) =>
    update({
      topics: state.topics.includes(slug)
        ? state.topics.filter((topic) => topic !== slug)
        : [...state.topics, slug],
      page: 1,
    });
  const setRead = (slug: InsightReadBucket['slug'] | null) =>
    update({ read: state.read === slug ? null : slug, page: 1 });
  const setSort = (value: InsightSortKey) => update({ sort: value, page: 1 });
  const clearQuery = () => {
    setDraft('');
    update({ q: '', page: 1 });
  };
  const clearAll = () => {
    setDraft('');
    update({ ...DEFAULT_STATE });
  };
  const goToPage = (page: number) => {
    update({ page });
    resultsRef.current?.scrollIntoView({ block: 'start' });
  };

  /* --- Filters popover: focus, Escape, outside click, mobile sheet ------- */

  const openPanel = () => setPanelOpen(true);
  const closePanel = useCallback((refocus = true) => {
    setPanelOpen(false);
    if (refocus) filtersButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!panelOpen) return;
    panelHeadingRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closePanel();
        return;
      }
      if (event.key === 'Tab' && !isDesktop && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    // Desktop popover: a click anywhere else closes it (selections are kept).
    const onPointerDown = (event: MouseEvent) => {
      if (!isDesktop) return;
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || filtersButtonRef.current?.contains(target)) return;
      closePanel(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);

    const lockScroll = !isDesktop;
    const previousOverflow = document.body.style.overflow;
    if (lockScroll) document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
      if (lockScroll) document.body.style.overflow = previousOverflow;
    };
  }, [panelOpen, isDesktop, closePanel]);

  /* --- Render ----------------------------------------------------------- */

  const sortOptions = SORT_OPTIONS.filter((option) => option.value !== 'relevance' || state.q);

  const chip = (label: string, onRemove: () => void, removeLabel: string) => (
    <button
      key={removeLabel}
      type='button'
      onClick={onRemove}
      className={chipButton}
      aria-label={removeLabel}
    >
      <span>{label}</span>
      <CloseIcon />
    </button>
  );

  const activeChips: React.ReactNode[] = [];
  if (state.q) activeChips.push(chip(`“${state.q}”`, clearQuery, `Clear search: ${state.q}`));
  if (state.category) {
    const name = categoryName(state.category) ?? state.category;
    activeChips.push(chip(name, () => setCategory(null), `Remove category filter: ${name}`));
  }
  state.topics.forEach((slug) =>
    activeChips.push(
      chip(topicName(slug), () => toggleTopic(slug), `Remove topic filter: ${topicName(slug)}`)
    )
  );
  if (state.read) {
    const label = bucketLabel(state.read) ?? state.read;
    activeChips.push(chip(label, () => setRead(null), `Remove reading time filter: ${label}`));
  }
  if (state.sort && state.sort !== 'newest' && !(state.sort === 'relevance' && !state.q)) {
    const label = SORT_OPTIONS.find((option) => option.value === state.sort)?.label ?? state.sort;
    activeChips.push(
      chip(`Sorted: ${label}`, () => update({ sort: null, page: 1 }), 'Reset sort order')
    );
  }

  const items = result.pageItems;
  const gridCols = items.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3';

  const pagerItems: (number | 'ellipsis')[] = [];
  for (let page = 1; page <= result.totalPages; page++) {
    if (page === 1 || page === result.totalPages || Math.abs(page - result.page) <= 1) {
      pagerItems.push(page);
    } else if (pagerItems[pagerItems.length - 1] !== 'ellipsis') {
      pagerItems.push('ellipsis');
    }
  }
  const pagerLink =
    'tnum min-w-[4.4rem] min-h-[4.4rem] inline-flex items-center justify-center text-[1.45rem] font-semibold text-muted hover:text-ink hover:underline hover:underline-offset-[0.6rem]';

  const facetRow = (
    checked: boolean,
    label: string,
    count: string,
    onChange: () => void,
    key: string
  ) => (
    <li key={key}>
      <label className='hover:text-ink flex min-h-[4rem] cursor-pointer items-center gap-[1rem] text-[1.4rem] lg:min-h-[3.6rem]'>
        <input
          type='checkbox'
          checked={checked}
          onChange={onChange}
          className='h-[1.6rem] w-[1.6rem] shrink-0 cursor-pointer'
        />
        <span className={checked ? 'text-ink font-semibold' : 'text-ink font-medium'}>{label}</span>
        <span className='tnum text-muted-dark ml-auto text-[1.25rem]'>{count}</span>
      </label>
    </li>
  );

  return (
    <div>
      {/* Toolbar — one row from lg: search · categories · filters · count + sort */}
      <div ref={resultsRef} className='border-edge border-t border-b'>
        <div className='flex flex-col lg:flex-row lg:items-stretch'>
          {/* Search */}
          <div className='border-line relative border-b lg:min-w-[28rem] lg:flex-1 lg:border-r lg:border-b-0'>
            <label htmlFor={searchId} className='sr-only'>
              Search insights
            </label>
            <span id={searchHintId} className='sr-only'>
              Searches article titles, summaries, topics and section headings.
            </span>
            <span className='text-muted pointer-events-none absolute top-1/2 left-0 -translate-y-1/2'>
              <SearchIcon />
            </span>
            <input
              id={searchId}
              type='search'
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder='Search insights, topics or advice…'
              aria-describedby={searchHintId}
              autoComplete='off'
              spellCheck={false}
              enterKeyHint='search'
              className='placeholder:text-muted-dark text-ink focus-visible:outline-blue min-h-[5.2rem] w-full bg-transparent pr-[4.4rem] pl-[2.8rem] text-[1.55rem] outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] lg:pr-[5.6rem] [&::-webkit-search-cancel-button]:hidden'
            />
            {draft && (
              <button
                type='button'
                onClick={clearQuery}
                aria-label='Clear search'
                className='text-muted hover:text-ink absolute top-1/2 right-0 flex h-[4.4rem] w-[4.4rem] -translate-y-1/2 items-center justify-center lg:right-[0.8rem]'
              >
                <CloseIcon />
              </button>
            )}
          </div>

          {/* Categories + Filters */}
          <div className='flex items-center gap-[0.8rem] py-[1rem] lg:py-0 lg:pl-[2rem]'>
            <nav
              aria-label='Categories'
              className='scrollbar-hide -mx-[2rem] flex flex-1 gap-[0.6rem] overflow-x-auto px-[2rem] lg:mx-0 lg:flex-none lg:overflow-visible lg:px-0'
            >
              <button
                type='button'
                onClick={() => setCategory(null)}
                aria-pressed={state.category === null}
                className={pill(state.category === null)}
              >
                All <span className='tnum opacity-70'>{articles.length}</span>
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  type='button'
                  onClick={() => setCategory(category.slug)}
                  aria-pressed={state.category === category.slug}
                  className={pill(state.category === category.slug)}
                >
                  {category.name} <span className='tnum opacity-70'>{category.count}</span>
                </button>
              ))}
            </nav>

            {panelHasFacets && (
              <div className='relative shrink-0'>
                <button
                  ref={filtersButtonRef}
                  type='button'
                  onClick={() => (panelOpen ? closePanel() : openPanel())}
                  aria-expanded={panelOpen}
                  aria-controls={panelId}
                  className={`inline-flex min-h-[4.4rem] items-center gap-[0.7rem] rounded-[0.2rem] border px-[1.2rem] text-[1.35rem] font-semibold lg:min-h-[3.6rem] ${
                    panelOpen || facetCount > 0
                      ? 'border-ink text-ink'
                      : 'border-line text-ink hover:border-ink'
                  }`}
                >
                  <SlidersIcon />
                  Filters
                  {facetCount > 0 && (
                    <span className='bg-blue tnum inline-flex min-w-[1.8rem] items-center justify-center px-[0.4rem] text-[1.1rem] font-semibold text-white'>
                      {facetCount}
                    </span>
                  )}
                </button>

                {/* Popover from lg; full-screen sheet below. Rendered only while open. */}
                {panelOpen && (
                  <div
                    ref={panelRef}
                    id={panelId}
                    role={isDesktop ? 'group' : 'dialog'}
                    aria-modal={isDesktop ? undefined : true}
                    aria-labelledby={`${panelId}-heading`}
                    className='bg-paper border-edge fixed inset-0 z-70 overflow-y-auto lg:absolute lg:inset-auto lg:top-[calc(100%+0.8rem)] lg:right-0 lg:z-40 lg:w-[40rem] lg:overflow-visible lg:border lg:bg-white'
                  >
                    <div className='container-site flex min-h-full flex-col py-[2.4rem] lg:min-h-0 lg:max-w-none lg:p-[2rem]'>
                      <div className='flex items-center justify-between gap-[1.6rem]'>
                        <h2
                          id={`${panelId}-heading`}
                          ref={panelHeadingRef}
                          tabIndex={-1}
                          className='meta-label outline-none'
                        >
                          Filters
                        </h2>
                        <button
                          type='button'
                          onClick={() => closePanel()}
                          aria-label='Close filters'
                          className='text-ink hover:text-blue -mr-[1rem] flex h-[4.4rem] w-[4.4rem] items-center justify-center lg:hidden'
                        >
                          <CloseIcon />
                        </button>
                      </div>

                      {topics.length > 0 && (
                        <fieldset className='mt-[1.6rem]'>
                          <legend className='text-[1.4rem] font-semibold'>
                            Topics{' '}
                            <span className='text-muted font-normal'>— any of the selected</span>
                          </legend>
                          <ul className='mt-[0.8rem] grid gap-x-[2rem] sm:grid-cols-2'>
                            {topics.map((topic) =>
                              facetRow(
                                state.topics.includes(topic.slug),
                                topic.name,
                                String(topic.count),
                                () => toggleTopic(topic.slug),
                                topic.slug
                              )
                            )}
                          </ul>
                        </fieldset>
                      )}

                      {showReadFacet && (
                        <fieldset className='border-line mt-[1.6rem] border-t pt-[1.6rem]'>
                          <legend className='float-left text-[1.4rem] font-semibold'>
                            Reading time
                          </legend>
                          <ul className='clear-both mt-[0.8rem] grid gap-x-[2rem] sm:grid-cols-2'>
                            {visibleBuckets.map((bucket) =>
                              facetRow(
                                state.read === bucket.slug,
                                bucket.label,
                                `${bucket.hint} · ${bucket.count}`,
                                () => setRead(bucket.slug),
                                bucket.slug
                              )
                            )}
                          </ul>
                        </fieldset>
                      )}

                      {/* Sheet footer (phones and tablets only) */}
                      <div className='border-line mt-auto flex items-center justify-between gap-[1.2rem] border-t pt-[2rem] lg:hidden'>
                        <button
                          type='button'
                          onClick={() => update({ topics: [], read: null, page: 1 })}
                          disabled={facetCount === 0}
                          className='text-muted hover:text-ink min-h-[4.4rem] text-[1.4rem] font-semibold underline underline-offset-[0.5rem] disabled:cursor-not-allowed disabled:opacity-50'
                        >
                          Clear
                        </button>
                        <button
                          type='button'
                          onClick={() => closePanel()}
                          className='bg-blue hover:bg-ink inline-flex min-h-[4.4rem] items-center gap-[1rem] px-[2.2rem] text-[1.45rem] font-semibold text-white'
                        >
                          Show {countLabel}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Count + sort */}
          <div className='border-line flex items-center justify-between gap-[1.2rem] border-t py-[0.8rem] lg:ml-auto lg:border-t-0 lg:border-l lg:py-0 lg:pl-[2rem]'>
            <p className='tnum text-muted text-[1.35rem]' aria-hidden='true'>
              {countLabel}
            </p>
            <p role='status' aria-live='polite' aria-atomic='true' className='sr-only'>
              {status}
            </p>
            <label htmlFor={sortId} className='sr-only'>
              Sort articles
            </label>
            <select
              id={sortId}
              value={sort}
              onChange={(event) => setSort(event.target.value as InsightSortKey)}
              className='border-line text-ink hover:border-ink min-h-[4.4rem] cursor-pointer rounded-[0.2rem] border bg-transparent px-[1rem] text-[1.35rem] font-medium lg:min-h-[3.6rem]'
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active filters — exactly one row, only when something is applied */}
      {activeChips.length > 0 && (
        <div className='border-line flex flex-wrap items-center gap-[0.8rem] border-b py-[1rem]'>
          <span className='meta-label mr-[0.4rem]'>Showing</span>
          {activeChips}
          <button
            type='button'
            onClick={clearAll}
            className='text-ink hover:text-blue ml-auto min-h-[3.6rem] px-[0.4rem] text-[1.35rem] font-semibold underline underline-offset-[0.5rem]'
          >
            Clear all
          </button>
        </div>
      )}

      {/* Results */}
      <div className='pt-[2.4rem]'>
        {result.total === 0 ? (
          <div className='border-edge max-w-[72rem] border bg-white p-[clamp(2rem,3vw,3.2rem)]'>
            <p className='meta-label text-blue'>No results</p>
            <h2 className='font-display mt-[1.2rem] max-w-[22ch] text-[clamp(2.4rem,3vw,3.2rem)] leading-[1.15]'>
              Nothing matches that combination yet.
            </h2>
            <p className='text-muted mt-[1.2rem] max-w-[52ch] text-[1.5rem] leading-[1.6]'>
              {state.q
                ? `No article mentions “${state.q}” in its title, summary, topics or section headings`
                : 'No article fits every filter you have selected'}
              {state.category ? ` within ${categoryName(state.category)}` : ''}. Try a broader word
              or fewer filters.
            </p>
            <div className='mt-[2rem] flex flex-wrap gap-[0.8rem]'>
              <button
                type='button'
                onClick={clearAll}
                className='bg-blue hover:bg-ink inline-flex min-h-[4.4rem] items-center gap-[1rem] px-[2rem] text-[1.4rem] font-semibold text-white'
              >
                Clear filters <span aria-hidden='true'>→</span>
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  type='button'
                  onClick={() => {
                    setDraft('');
                    update({ ...DEFAULT_STATE, category: category.slug });
                  }}
                  className={`${chipButton} min-h-[4.4rem]`}
                >
                  {category.name}
                  <span className='tnum text-muted-dark text-[1.25rem]'>{category.count}</span>
                </button>
              ))}
            </div>
          </div>
        ) : items.length === 1 ? (
          <div className='max-w-[92rem]'>
            <InsightCard
              article={items[0].article}
              variant='wide'
              lead={result.featured}
              terms={result.terms}
              match={items[0].match}
              headingLevel='h2'
              priority
            />
          </div>
        ) : (
          <div className={`grid gap-x-[2.4rem] gap-y-[3.6rem] ${gridCols}`}>
            {items.map((item, index) => (
              <InsightCard
                key={item.article.slug}
                article={item.article}
                variant='cover'
                lead={result.featured && index === 0}
                terms={result.terms}
                match={item.match}
                headingLevel='h2'
                priority={index < 3}
              />
            ))}
          </div>
        )}

        {result.totalPages > 1 && (
          <nav
            aria-label='Pagination'
            className='border-edge mt-[4rem] flex flex-wrap items-center justify-between gap-[1.2rem] border-t pt-[2rem]'
          >
            <button
              type='button'
              onClick={() => goToPage(result.page - 1)}
              disabled={result.page <= 1}
              className={`${pagerLink} disabled:text-edge disabled:no-underline`}
            >
              ← Previous
            </button>
            <span className='flex items-center gap-[0.4rem]'>
              {pagerItems.map((item, index) =>
                item === 'ellipsis' ? (
                  <span key={`ellipsis-${index}`} className='text-muted px-[0.6rem] text-[1.45rem]'>
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    type='button'
                    onClick={() => goToPage(item)}
                    aria-current={item === result.page ? 'page' : undefined}
                    className={`${pagerLink} ${
                      item === result.page
                        ? 'text-ink decoration-blue underline decoration-2 underline-offset-[0.6rem]'
                        : ''
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </span>
            <button
              type='button'
              onClick={() => goToPage(result.page + 1)}
              disabled={result.page >= result.totalPages}
              className={`${pagerLink} disabled:text-edge disabled:no-underline`}
            >
              Next →
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default InsightsExplorer;
