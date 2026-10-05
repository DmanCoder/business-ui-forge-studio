'use client';

import React from 'react';
import Script from 'next/script';

import Caption from '../Caption';

import { InstagramEmbedPropTypes } from './InstagramEmbed.types';

export default function InstagramEmbed({ data, className = '' }: InstagramEmbedPropTypes) {
  const [scriptReady, setScriptReady] = React.useState(false);
  const containerRef = React.useRef<HTMLElement>(null);
  const url = data?.url || '';

  // Process the embed once the script is ready and the URL changes
  React.useEffect(() => {
    if (!scriptReady || !url) return;
    // Guard for SSR/undefined
    if (typeof window !== 'undefined' && window.instgrm?.Embeds?.process) {
      // process just once per URL change
      window.instgrm.Embeds.process();
    }
  }, [scriptReady, url]);

  return (
    <>
      <Script
        id='instagram-embed'
        src='https://www.instagram.com/embed.js'
        strategy='lazyOnload'
        onLoad={() => setScriptReady(true)}
      />

      <figure ref={containerRef} className={`mx-auto max-w-[54rem] ${className}`}>
        {/* 
          Key on URL forces a fresh blockquote when the URL changes,
          which avoids stale embeds.
        */}
        <blockquote
          key={url}
          className='instagram-media mx-auto w-full'
          data-instgrm-permalink={url}
          data-instgrm-version='14'
          data-instgrm-captioned='true'
        />

        {data?.bodyCopy && <Caption data={data} />}
      </figure>
    </>
  );
}
