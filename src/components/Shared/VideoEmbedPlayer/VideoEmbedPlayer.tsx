'use client';

import React from 'react';
import Play from '@src/components/Icons/Play';
// import Caption from '../Caption/Caption';
import { VideoEmbedPlayerPropTypes } from '../VideoEmbedPlayer/VideoEmbedPlayer.types';
import Caption from '../Caption';

const VideoEmbedPlayer: React.FC<VideoEmbedPlayerPropTypes> = ({ className = '', data }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  const hasThumbnail = Boolean(data?.thumbnail?.url);
  const isContentful = data?.platform === 'contentful';

  // Lazy-load media when either user plays OR the component enters viewport (helps LCP)
  const shouldLoadMedia = isPlaying || isInView || !hasThumbnail;

  React.useEffect(() => {
    if (!wrapperRef.current) return;
    const io = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      rootMargin: '200px',
    });
    io.observe(wrapperRef.current);
    return () => io.disconnect();
  }, []);

  // Auto-play <video> safely when toggled
  React.useEffect(() => {
    if (!isContentful || !isPlaying || !videoRef.current) return;
    const playPromise = videoRef.current.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        /* ignore autoplay block */
      });
    }
  }, [isContentful, isPlaying]);

  const handlePlay = () => setIsPlaying(true);

  // Guard if no data
  if (!data?.url) return null;

  // Optional: tweak provider query params (YouTube/Vimeo) for better UX/branding
  const buildEmbedSrc = (url: string) => {
    try {
      const u = new URL(url);
      // Example YouTube/Vimeo niceties:
      if (u.hostname.includes('youtube') || u.hostname.includes('youtu.be')) {
        u.searchParams.set('autoplay', isPlaying ? '1' : '0');
        u.searchParams.set('playsinline', '1');
        u.searchParams.set('rel', '0');
        u.searchParams.set('modestbranding', '1');
      } else if (u.hostname.includes('vimeo')) {
        u.searchParams.set('autoplay', isPlaying ? '1' : '0');
        u.searchParams.set('muted', '1');
        u.searchParams.set('controls', '1');
        u.searchParams.set('playsinline', '1');
        u.searchParams.set('dnt', '1');
      }
      return u.toString();
    } catch {
      return url;
    }
  };

  const embedSrc = shouldLoadMedia ? buildEmbedSrc(data?.url) : undefined;

  return (
    <div className={`my-[1.6rem] ${className}`.trim()}>
      <div ref={wrapperRef} className='relative aspect-video w-full'>
        {/* Thumbnail overlay (click-to-play) */}
        {!isPlaying && hasThumbnail && (
          <button
            type='button'
            onClick={handlePlay}
            className='absolute inset-0 z-100 h-full w-full cursor-pointer'
            aria-label='Play video'
            style={{
              background: `url(${data?.thumbnail?.url}) no-repeat center / cover`,
            }}
          >
            <Play className='text-background-primary absolute top-1/2 left-1/2 h-auto w-[10%] -translate-x-1/2 -translate-y-1/2' />
          </button>
        )}

        {/* Contentful = <video>, others = <iframe> */}
        {isContentful ? (
          shouldLoadMedia && (
            <video
              ref={videoRef}
              className='absolute inset-0 h-full w-full'
              src={embedSrc}
              poster={data?.thumbnail?.url}
              loop
              muted
              playsInline
              controls={true}
              autoPlay={isPlaying || !hasThumbnail}
            >
              Sorry, your browser does not support embedded videos.
            </video>
          )
        ) : (
          // For iframes: lazy-load src only when shouldLoadMedia is true
          <iframe
            className='absolute inset-0 h-full w-full'
            // Avoid setting src until needed to defer network work
            src={embedSrc}
            loading='lazy'
            allow='autoplay; fullscreen; encrypted-media; picture-in-picture'
            allowFullScreen
            title='Embedded video'
          />
        )}
      </div>

      {data?.bodyCopy && <Caption data={data} />}
    </div>
  );
};

export default VideoEmbedPlayer;
