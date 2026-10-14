import React from 'react';
import Link from 'next/link';

import InsightFigure from '@src/components/insights/InsightFigure';
import { normalizeInsightHref, slugify } from '@src/lib/insights';
import type { InsightBlock } from '@src/lib/insights/types';

// Inline syntax inside text strings: [label](href) links and **bold**.
const INLINE_PATTERN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

/** Parse inline [label](href) and **bold** markup into React nodes. */
const renderInline = (text: string): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  INLINE_PATTERN.lastIndex = 0;
  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));

    if (match[1] !== undefined) {
      const href = normalizeInsightHref(match[2]);
      const isExternal = /^https?:\/\//.test(href);
      const linkClasses =
        'text-ink font-semibold underline decoration-blue decoration-2 underline-offset-[0.3rem] hover:text-blue';

      nodes.push(
        isExternal ? (
          <a
            key={key++}
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className={linkClasses}
          >
            {match[1]}
          </a>
        ) : (
          <Link key={key++} href={href} className={linkClasses}>
            {match[1]}
          </Link>
        )
      );
    } else {
      nodes.push(
        <strong key={key++} className='font-semibold'>
          {match[3]}
        </strong>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return nodes;
};

const renderBlock = (block: InsightBlock, index: number, sectionIndex: number): React.ReactNode => {
  switch (block.t) {
    case 'p':
      return (
        <p key={index} className='text-ink my-[2rem] text-[1.75rem] leading-[1.75]'>
          {renderInline(block.x)}
        </p>
      );

    case 'h2':
      /* Section opener: hairline, ledger index, then the heading */
      return (
        <h2
          key={index}
          id={slugify(block.x)}
          className='border-line mt-[6.4rem] mb-[2rem] border-t pt-[2.4rem] text-[clamp(2.4rem,2.8vw,3rem)] leading-[1.2] font-semibold'
        >
          <span className='tnum text-blue mb-[1rem] block text-[1.25rem] font-semibold tracking-[0.16em]'>
            {String(sectionIndex).padStart(2, '0')}
          </span>
          {renderInline(block.x)}
        </h2>
      );

    case 'h3':
      return (
        <h3
          key={index}
          className='mt-[4rem] mb-[1.2rem] text-[2.05rem] leading-[1.3] font-semibold'
        >
          {renderInline(block.x)}
        </h3>
      );

    case 'ul':
      return (
        <ul
          key={index}
          className='marker:text-blue my-[2rem] flex list-disc flex-col gap-[1rem] pl-[2.2rem] text-[1.7rem] leading-[1.65]'
        >
          {block.x.map((item, itemIndex) => (
            <li key={itemIndex} className='pl-[0.4rem]'>
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );

    case 'quote':
      /* Pull quote: display serif, a cobalt rule — typography does the work */
      return (
        <blockquote
          key={index}
          className='border-blue font-display text-ink my-[4.8rem] max-w-[28ch] border-l-2 pl-[2.4rem] text-[clamp(2.4rem,3.2vw,3.2rem)] leading-[1.3]'
        >
          {renderInline(block.x)}
        </blockquote>
      );

    case 'callout':
      return (
        <aside key={index} className='border-edge my-[3.6rem] border bg-white p-[2.4rem]'>
          <p className='meta-label text-blue'>{block.title}</p>
          <p className='mt-[1rem] text-[1.6rem] leading-[1.7]'>{renderInline(block.x)}</p>
        </aside>
      );

    case 'table':
      /* Comparison table: hairlines, a ledger header row, purposeful overflow
         on narrow screens (min-width keeps columns readable; the wrapper scrolls). */
      return (
        <div
          key={index}
          className='-mx-[2rem] my-[3.6rem] overflow-x-auto px-[2rem] md:mx-0 md:px-0'
        >
          <table
            className={`w-full border-collapse text-[1.5rem] leading-[1.5] ${
              block.headers.length >= 3 ? 'min-w-[60rem]' : ''
            }`}
          >
            <thead>
              <tr className='border-ink border-b-2 text-left'>
                {block.headers.map((header, headerIndex) => (
                  <th
                    key={headerIndex}
                    scope='col'
                    className='meta-label px-[1.2rem] pb-[1.2rem] align-bottom first:pl-0 last:pr-0'
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className='border-line border-b'>
                  {row.map((cell, cellIndex) =>
                    cellIndex === 0 ? (
                      <th
                        key={cellIndex}
                        scope='row'
                        className='py-[1.4rem] pr-[1.2rem] text-left align-top font-semibold'
                      >
                        {renderInline(cell)}
                      </th>
                    ) : (
                      <td
                        key={cellIndex}
                        className='text-muted px-[1.2rem] py-[1.4rem] align-top last:pr-0'
                      >
                        {renderInline(cell)}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'code':
      return (
        <pre
          key={index}
          className='bg-ink text-edge my-[3.2rem] overflow-x-auto p-[2.4rem] font-mono text-[1.4rem] whitespace-pre'
        >
          {block.x}
        </pre>
      );

    case 'figure':
      return <InsightFigure key={index} kind={block.x} caption={block.caption} />;

    case 'img':
      /* Images render only when a real asset exists — no placeholder panels */
      return block.src ? (
        <figure key={index} className='my-[3.2rem]'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt ?? ''} className='border-line w-full border' />
          {block.caption && (
            <figcaption className='text-muted mt-[1.2rem] text-[1.35rem] leading-[1.5]'>
              {block.caption}
            </figcaption>
          )}
        </figure>
      ) : null;

    default:
      return null;
  }
};

type InsightBlocksProps = {
  blocks: InsightBlock[];
};

/** Renders an article body from its portable {t, x, ...} block structure. */
const InsightBlocks: React.FC<InsightBlocksProps> = ({ blocks }) => {
  // Section number for each block: how many h2s have appeared up to and
  // including it. Pure, so the renderer stays free of render-time mutation.
  const sectionNumbers = blocks.map(
    (_, index) => blocks.slice(0, index + 1).filter((block) => block.t === 'h2').length
  );
  return <>{blocks.map((block, index) => renderBlock(block, index, sectionNumbers[index]))}</>;
};

export default InsightBlocks;
