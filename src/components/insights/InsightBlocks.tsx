import React from 'react';
import Link from 'next/link';

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

const renderBlock = (block: InsightBlock, index: number): React.ReactNode => {
  switch (block.t) {
    case 'p':
      return (
        <p key={index} className='text-ink my-[1.8rem] text-[1.7rem] leading-[1.75]'>
          {renderInline(block.x)}
        </p>
      );

    case 'h2':
      return (
        <h2
          key={index}
          id={slugify(block.x)}
          className='mt-[5.6rem] mb-[1.6rem] text-[2.6rem] leading-[1.2] font-semibold'
        >
          {renderInline(block.x)}
        </h2>
      );

    case 'h3':
      return (
        <h3 key={index} className='mt-[3.6rem] mb-[1.2rem] text-[2rem] font-semibold'>
          {renderInline(block.x)}
        </h3>
      );

    case 'ul':
      return (
        <ul
          key={index}
          className='marker:text-blue my-[1.8rem] flex list-disc flex-col gap-[0.8rem] pl-[2rem] text-[1.65rem] leading-[1.65]'
        >
          {block.x.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item)}</li>
          ))}
        </ul>
      );

    case 'quote':
      /* Pull quote as pure typography — no box, no border decoration */
      return (
        <blockquote
          key={index}
          className='font-display text-ink my-[4rem] max-w-[26ch] text-[clamp(2.2rem,3vw,2.8rem)] leading-[1.35] italic'
        >
          {renderInline(block.x)}
        </blockquote>
      );

    case 'callout':
      return (
        <aside key={index} className='border-blue my-[3.2rem] border-l-2 pl-[2.4rem]'>
          <p className='meta-label text-blue'>{block.title}</p>
          <p className='mt-[1rem] text-[1.6rem] leading-[1.7]'>{renderInline(block.x)}</p>
        </aside>
      );

    case 'table':
      return (
        <div key={index} className='my-[3.2rem] overflow-x-auto'>
          <table className='w-full text-[1.5rem]'>
            <thead>
              <tr className='border-ink border-b-2 text-left'>
                {block.headers.map((header, headerIndex) => (
                  <th key={headerIndex} className='meta-label px-[1.2rem] py-[1.2rem] first:pl-0'>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className='border-line border-b'>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className='px-[1.2rem] py-[1.4rem] align-top first:pl-0'>
                      {renderInline(cell)}
                    </td>
                  ))}
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
const InsightBlocks: React.FC<InsightBlocksProps> = ({ blocks }) => (
  <>{blocks.map((block, index) => renderBlock(block, index))}</>
);

export default InsightBlocks;
