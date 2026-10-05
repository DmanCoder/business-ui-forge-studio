'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { PlatformTypes } from '@src/typescriptGlobals/contentful';

import type { SocialEmbedsPropTypes } from './SocialEmbeds.types';

// Lazy-load heavy embeds (no SSR if they touch window)
const InstagramEmbed = dynamic(() => import('../InstagramEmbed/InstagramEmbed'), { ssr: false });
const TwitterEmbed = dynamic(() => import('../TwitterEmbed/TwitterEmbed'), { ssr: false });
const VideoEmbedPlayer = dynamic(() => import('../VideoEmbedPlayer/VideoEmbedPlayer'), {
  ssr: false,
});

// Normalize platform strings once
const normalize = (s?: string) => (s ?? '').toLowerCase().replace(/\s+/g, ''); // e.g., "Facebook Video" -> "facebookvideo"

const VIDEO_PLATFORMS: Set<PlatformTypes> = new Set<PlatformTypes>([
  'contentful',
  'youtube',
  'vimeo',
  'dailymotion',
  'wistia',
  'twitch',
  'facebookvideo',
  'loom',
  'brightcove',
  'jwplayer',
  'vidyard',
]);

const SocialEmbeds: React.FC<SocialEmbedsPropTypes> = ({ data, className }) => {
  const platform = normalize(data?.platform) as PlatformTypes | '';

  if (!platform || !data) return null;

  if (platform === 'instagram') {
    return <InstagramEmbed data={data} className={className} />;
  }

  if (platform === 'twitter') {
    return <TwitterEmbed data={data} className={className} />;
  }

  if (VIDEO_PLATFORMS.has(platform as PlatformTypes)) {
    return <VideoEmbedPlayer data={data} className={className} />;
  }

  // Unknown platform → render nothing (or a fallback UI)
  return null;
};

export default SocialEmbeds;
