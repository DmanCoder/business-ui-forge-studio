'use client';

import React, { useEffect, useState } from 'react';

type TocItem = {
  id: string;
  text: string;
};

type TableOfContentsProps = {
  items: TocItem[];
  /**
   * `sidebar` — the sticky "In this article" rail beside the reading column
   * on large screens, with the current section marked.
   * `inline` — a native <details> block at the top of the article on
   * smaller screens. Both are plain anchor jumps: instant, no smooth scroll
   * (the global scroll-margin-top handles the sticky-header offset).
   */
  variant?: 'sidebar' | 'inline';
};

/** Id of the heading currently at the top of the viewport, or null. */
const useActiveHeading = (ids: string[], enabled: boolean): string | null => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || ids.length === 0 || typeof window === 'undefined') return;

    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (headings.length === 0) return;

    // The active section is the last heading above the reading line.
    const update = () => {
      const line = 120;
      let current: string | null = null;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= line) current = heading.id;
      }
      setActive(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ids, enabled]);

  return active;
};

const TableOfContents: React.FC<TableOfContentsProps> = ({ items, variant = 'inline' }) => {
  const active = useActiveHeading(
    items.map((item) => item.id),
    variant === 'sidebar'
  );

  if (variant === 'sidebar') {
    return (
      <nav aria-label='In this article'>
        <p className='meta-label'>In this article</p>
        <ol className='mt-[1.6rem] flex list-none flex-col'>
          {items.map((item, index) => {
            const isActive = item.id === active;
            return (
              <li
                key={item.id}
                className={`border-l-2 ${isActive ? 'border-blue' : 'border-line'}`}
              >
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`hover:text-ink flex gap-[1.2rem] py-[0.7rem] pl-[1.6rem] text-[1.45rem] leading-[1.45] ${
                    isActive ? 'text-ink font-semibold' : 'text-muted font-medium'
                  }`}
                >
                  <span className='tnum text-blue text-[1.2rem] font-semibold'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{item.text}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  return (
    <details className='border-edge group border-t border-b py-[1.6rem]'>
      <summary className='flex cursor-pointer list-none items-center justify-between gap-[1.6rem] [&::-webkit-details-marker]:hidden'>
        <span className='meta-label'>
          In this article <span className='tnum text-muted-dark'>· {items.length} sections</span>
        </span>
        <span aria-hidden='true' className='text-[1.4rem] font-semibold'>
          <span className='group-open:hidden'>+</span>
          <span className='hidden group-open:inline'>−</span>
        </span>
      </summary>
      <ol className='mt-[1.6rem] flex list-none flex-col gap-[1rem]'>
        {items.map((item, index) => (
          <li key={item.id} className='flex gap-[1.4rem] text-[1.55rem] leading-[1.5]'>
            <span className='tnum text-blue text-[1.3rem] font-medium'>
              {String(index + 1).padStart(2, '0')}
            </span>
            <a
              href={`#${item.id}`}
              className='text-ink font-medium hover:underline hover:decoration-2 hover:underline-offset-[0.4rem]'
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
};

export default TableOfContents;
