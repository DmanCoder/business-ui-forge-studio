import React from 'react';

import { Cell } from '@src/components/graphics/Frame';
import type { InsightFigureKind } from '@src/lib/insights/types';

/**
 * In-body editorial figures for the insights articles. Each one restates a
 * claim the article itself makes, in ledger form, with no invented numbers.
 * Real lists and tables, so the content is available to assistive technology.
 * Static — no motion.
 */

/* "Two five-page websites can honestly differ in cost by a factor of five." */
const SamePagesDifferentScope = () => {
  const rows = [
    { factor: 'Pages', a: '5', b: '5' },
    { factor: 'Unique layouts', a: '2 templates', b: '5 bespoke layouts' },
    { factor: 'Content', a: 'Supplied by you', b: 'Written and photographed' },
    { factor: 'Functionality', a: 'Contact form', b: 'Bookings, logins, payments' },
    { factor: 'Integrations', a: 'None', b: 'CRM, accounting, inventory' },
    { factor: 'After launch', a: 'Self-managed', b: 'Care plan' },
  ];
  return (
    <table className='w-full text-[1.45rem]'>
      <thead>
        <tr className='border-ink border-b text-left'>
          <th className='meta-label py-[1rem] pr-[1.2rem] font-semibold'>Factor</th>
          <th className='meta-label py-[1rem] pr-[1.2rem] font-semibold'>Website A</th>
          <th className='meta-label py-[1rem] font-semibold'>Website B</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.factor} className='border-line border-b'>
            <td className='py-[1rem] pr-[1.2rem] font-medium'>{row.factor}</td>
            <td className='text-muted py-[1rem] pr-[1.2rem]'>{row.a}</td>
            <td className='py-[1rem]'>{row.b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/* The five things that make up a website, and who should hold each. */
const OwnershipLayers = () => {
  const layers = [
    { name: 'Domain', holder: 'Your business, always', accent: true },
    { name: 'Hosting', holder: 'You, or managed for you with a documented handover' },
    { name: 'The website itself', holder: 'Set out in the contract — use, modify, move' },
    { name: 'Content and data', holder: 'Unambiguously yours' },
    { name: 'Accounts and access', holder: 'Owned by the business, access granted to people' },
  ];
  return (
    <ol className='flex flex-col gap-[0.8rem]'>
      {layers.map((layer, index) => (
        <li
          key={layer.name}
          className={`grid grid-cols-[3.6rem_1fr] items-baseline gap-x-[1.2rem] border px-[1.6rem] py-[1.2rem] sm:grid-cols-[3.6rem_1fr_auto] ${
            layer.accent ? 'border-blue bg-white' : 'border-edge bg-white'
          }`}
        >
          <span className='tnum text-blue text-[1.3rem] font-semibold'>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className='font-display text-[2rem] leading-[1.1]'>{layer.name}</span>
          <span className='text-muted col-start-2 text-[1.35rem] leading-[1.4] sm:col-start-3 sm:text-right'>
            {layer.holder}
          </span>
        </li>
      ))}
    </ol>
  );
};

/* What each option is made of. */
const ThreeArchitectures = () => {
  const columns = [
    { name: 'WordPress', layers: ['Theme', 'WordPress editor', 'PHP hosting'] },
    { name: 'Webflow', layers: ['Visual canvas', 'Webflow CMS', 'Webflow hosting'] },
    {
      name: 'Custom build',
      layers: ['Next.js front end', 'CMS chosen for you', 'Managed hosting'],
      accent: true,
    },
  ];
  return (
    <div className='grid gap-[1.2rem] sm:grid-cols-3'>
      {columns.map((column) => (
        <dl key={column.name}>
          <dt>
            <Cell active={Boolean(column.accent)} className='w-full py-[0.9rem] text-[1.35rem]'>
              {column.name}
            </Cell>
          </dt>
          {column.layers.map((layer) => (
            <dd
              key={layer}
              className='border-line text-muted mt-[0.6rem] border bg-white px-[1.2rem] py-[0.8rem] text-center text-[1.25rem]'
            >
              {layer}
            </dd>
          ))}
        </dl>
      ))}
    </div>
  );
};

const FIGURES: Record<InsightFigureKind, { render: () => React.ReactElement; caption: string }> = {
  'same-pages-different-scope': {
    render: SamePagesDifferentScope,
    caption:
      'Two “five-page websites”. Same page count; every other decision differs, and so does the price.',
  },
  'ownership-layers': {
    render: OwnershipLayers,
    caption: 'The five things that make up a website, and who should hold each one.',
  },
  'three-architectures': {
    render: ThreeArchitectures,
    caption: 'What each option is made of — the layers you are choosing between.',
  },
};

const InsightFigure: React.FC<{ kind: InsightFigureKind; caption?: string }> = ({
  kind,
  caption,
}) => {
  const figure = FIGURES[kind];
  const Render = figure.render;
  return (
    <figure className='border-edge bg-paper my-[3.2rem] border p-[clamp(1.6rem,3vw,2.4rem)]'>
      <Render />
      <figcaption className='meta-label border-line mt-[1.6rem] border-t pt-[1.2rem]'>
        {caption ?? figure.caption}
      </figcaption>
    </figure>
  );
};

export default InsightFigure;
