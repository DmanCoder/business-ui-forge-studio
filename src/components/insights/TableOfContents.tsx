import React from 'react';

type TocItem = {
  id: string;
  text: string;
};

type TableOfContentsProps = {
  items: TocItem[];
};

/**
 * "In this article" index of h2 anchors. The parent only renders it when the
 * article has 3+ h2 blocks. Plain anchor jumps — instant, no smooth scroll
 * (the global scroll-margin-top handles the sticky-header offset).
 */
const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => (
  <nav aria-label='In this article' className='border-edge my-[4rem] border-t border-b py-[2.4rem]'>
    <p className='meta-label'>In this article</p>
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
  </nav>
);

export default TableOfContents;
