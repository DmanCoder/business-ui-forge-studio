'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import BodyCopyRenderer from '@src/components/Shared/BodyCopyRenderer';
import Chevron from '@src/components/Icons/Chevron';

import { TableOfContentsPropTypes } from './TableOfContents.types';
import styles from './TableOfContents.module.css';

const TableOfContents: React.FC<TableOfContentsPropTypes> = ({ data }) => {
  const params = useParams<{ slug: string; locale: string }>();
  const navRef = useRef<HTMLDivElement>(null);

  // Update href attributes before rendering
  const updateHrefBeforeRender = (bodyCopy: any) => {
    if (!bodyCopy?.json) return bodyCopy;

    const updateHref = (node: any) => {
      if (node?.nodeType === 'hyperlink' && node?.data?.uri?.includes('#')) {
        const targetId = node?.data?.uri?.split('#')?.[1];
        node.data.uri = `/blogs/${params?.slug}#${targetId}`;
      }

      if (node?.content) {
        node?.content?.forEach(updateHref);
      }
    };

    bodyCopy.json.content.forEach(updateHref);
    return bodyCopy;
  };

  // Process the bodyCopy data to update href attributes
  const processedBodyCopy = updateHrefBeforeRender(data?.bodyCopy);

  useEffect(() => {
    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const anchor = (e.target as HTMLElement).closest('a[href*="#"]');
      if (!anchor) return;

      e.preventDefault();
      const targetId = anchor.getAttribute('href')?.split('#')[1];
      if (!targetId) return;

      const targetElement = document.querySelector(`[scrollto-id='${targetId}']`);
      if (!targetElement) return;

      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offset = 75; // pixels
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'auto',
      });
    };

    const navElement = navRef.current;
    if (navElement) {
      navElement.addEventListener('click', handleAnchorClick as any);
    }

    return () => {
      if (navElement) {
        navElement.removeEventListener('click', handleAnchorClick as any);
      }
    };
  }, [params.locale, params.slug]);

  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const checkHeight = () => {
      if (navRef.current && navRef.current.offsetHeight > 300) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener('resize', checkHeight);
    checkHeight();

    return () => window.removeEventListener('resize', checkHeight);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <nav
        ref={navRef}
        role='navigation'
        className='border-border relative overflow-hidden rounded-[0.8rem] border-[0.1rem] p-[2.4rem] pb-[4rem]'
        style={{ maxHeight: isCollapsed ? '30rem' : '100rem' }}
      >
        <h2 className='text-body-copy--dark mb-[1rem] text-[1.8rem] font-medium'>{data?.title}</h2>

        <BodyCopyRenderer
          className={`${styles.nestedList} [&_a]:text-body-copy--dark gap-[unset] [&>ol>li]:line-clamp-1 [&>ol>li]:font-medium`}
          bodyCopy={processedBodyCopy}
        />

        <button
          onClick={toggleCollapse}
          className={`bg-accent absolute bottom-[0] left-[50%] h-[5rem] translate-x-[-50%] text-white ${
            isCollapsed
              ? 'to-background-secondary w-full bg-linear-to-b from-transparent to-50% lg:to-70%'
              : ''
          }`}
        >
          {isCollapsed ? (
            <span className='relative bottom-[-1rem] flex justify-center font-medium'>
              Show more
              <Chevron className='rotate-90' />
            </span>
          ) : (
            <span className='relative bottom-[-1rem] flex justify-center font-medium'>
              Show less <Chevron className='-rotate-90' />
            </span>
          )}
        </button>
      </nav>
    </>
  );
};

export default TableOfContents;
