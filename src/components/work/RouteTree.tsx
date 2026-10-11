import React from 'react';

import { NAV_ITEMS, CTA_ITEM } from '@src/config/site';
import { SERVICE_PAGES } from '@src/content/service-pages';
import { getPublishedCaseStudies } from '@src/lib/caseStudies';
import { getPublishedArticles, getCategories } from '@src/lib/insights';

type Node = { label: string; note?: string; children?: Node[] };

const LEGAL: Node = {
  label: 'Legal',
  note: 'privacy · terms · disclaimer',
};

const TreeList: React.FC<{ nodes: Node[]; depth?: number }> = ({ nodes, depth = 0 }) => (
  <ul className={depth === 0 ? '' : 'border-edge ml-[0.9rem] border-l pl-[1.8rem]'}>
    {nodes.map((node) => (
      <li key={node.label} className='relative py-[0.5rem]'>
        {depth > 0 && (
          <span
            aria-hidden='true'
            className='bg-edge absolute top-[1.5rem] left-[-1.8rem] h-px w-[1.2rem]'
          />
        )}
        <span className='text-[1.4rem] leading-[1.4] font-medium'>{node.label}</span>
        {node.note && (
          <span className='text-muted-dark ml-[0.8rem] font-mono text-[1.1rem]'>{node.note}</span>
        )}
        {node.children && node.children.length > 0 && (
          <TreeList nodes={node.children} depth={depth + 1} />
        )}
      </li>
    ))}
  </ul>
);

/**
 * The site's real content architecture, read from the same config and
 * content modules the pages use (navigation, service pages, published case
 * studies, published articles and categories). Nothing is hand-typed, so the
 * figure stays true as content grows. Semantic nested lists. Static.
 */
const RouteTree: React.FC<{ caption?: string; className?: string }> = async ({
  caption,
  className = '',
}) => {
  const [studies, articles, categories] = await Promise.all([
    getPublishedCaseStudies(),
    getPublishedArticles(),
    getCategories(),
  ]);

  const sections: Node[] = NAV_ITEMS.map((item) => {
    switch (item.href) {
      case '/work':
        return {
          label: item.label,
          note: `${studies.length} case stud${studies.length === 1 ? 'y' : 'ies'}`,
          children: studies.map((study) => ({ label: study.title })),
        };
      case '/services':
        return {
          label: item.label,
          note: `${SERVICE_PAGES.length} service pages`,
          children: SERVICE_PAGES.map((service) => ({ label: service.shortName })),
        };
      case '/insights':
        return {
          label: item.label,
          note: `${articles.length} articles · ${categories.length} categories`,
          children: [
            ...articles.map((article) => ({ label: article.title })),
            ...categories.map((category) => ({
              label: `Category · ${category.name}`,
              note: String(category.count).padStart(2, '0'),
            })),
          ],
        };
      default:
        return { label: item.label };
    }
  });

  const tree: Node[] = [
    {
      label: 'Home',
      children: [...sections, { label: CTA_ITEM.label, note: 'enquiry form' }, LEGAL],
    },
  ];

  return (
    <figure className={`border-edge border ${className}`}>
      <div className='grid gap-[2.4rem] p-[2.4rem] md:grid-cols-12 md:p-[2.8rem]'>
        <div className='md:col-span-8'>
          <p className='meta-label'>Routes</p>
          <div className='mt-[1.2rem]'>
            <TreeList nodes={tree} />
          </div>
        </div>
        <dl className='md:col-span-4'>
          <div className='border-edge border-t py-[1.4rem]'>
            <dt className='meta-label'>Source</dt>
            <dd className='mt-[0.6rem] text-[1.4rem] leading-[1.5]'>
              Typed local content modules, one per content type
            </dd>
          </div>
          <div className='border-edge border-t py-[1.4rem]'>
            <dt className='meta-label'>Access</dt>
            <dd className='mt-[0.6rem] text-[1.4rem] leading-[1.5]'>
              Async data layer — pages never import a source directly
            </dd>
          </div>
          <div className='border-edge border-t border-b py-[1.4rem]'>
            <dt className='meta-label'>Later</dt>
            <dd className='mt-[0.6rem] text-[1.4rem] leading-[1.5]'>
              A headless CMS replaces the modules without touching a page
            </dd>
          </div>
        </dl>
      </div>
      {caption && (
        <figcaption className='meta-label border-edge border-t px-[2.4rem] py-[1.2rem] md:px-[2.8rem]'>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default RouteTree;
