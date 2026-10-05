'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

import Caption from '../Caption';

import { TwitterEmbedPropTypes } from './TwitterEmbed.types';

export default function TwitterEmbed({ data, className = '' }: TwitterEmbedPropTypes) {
  const ref = useRef<HTMLQuoteElement>(null);
  const url = data?.url ?? '';

  // Re-embed when the URL changes (after widgets is ready)
  useEffect(() => {
    if (!url || !ref.current) return;

    const tryLoad = () => {
      // clear any previous injected iframe to avoid duplicates
      ref.current!.innerHTML = `<a href="${url}"></a>`;
      window.twttr?.widgets.load(ref.current!);
    };

    if (window.twttr?.widgets) {
      tryLoad();
    } else if (window.twttr?.ready) {
      window.twttr.ready(() => tryLoad());
    }
  }, [url]);

  return (
    <>
      <Script
        src='https://platform.twitter.com/widgets.js'
        strategy='afterInteractive'
        onLoad={() => {
          // If the script loads after first render, ensure current embed is processed
          if (ref.current && window.twttr?.widgets) {
            window.twttr.widgets.load(ref.current);
          }
        }}
      />

      <figure className={className}>
        <blockquote
          ref={ref}
          className='twitter-tweet mx-auto inline w-full! max-w-[500px]! min-w-[calc(100vw-48px)]! sm:min-w-[50rem]!'
          data-width='500'
          data-dnt='true'
          data-align='center'
        >
          {/* Initial anchor; effect will re-set this on URL change */}
          <a href={data?.url} rel='noopener noreferrer' />
        </blockquote>
        {data?.bodyCopy && <Caption data={data} />}
      </figure>
    </>
  );
}
