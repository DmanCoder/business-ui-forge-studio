'use client';
import React from 'react';

import XTwitter from '@src/components/Icons/XTwitter';
import LinkedIn from '@src/components/Icons/LinkedIn';
import Facebook from '@src/components/Icons/Facebook';
import { BASE_URL } from '@src/typescriptGlobals/constants';

type ShareThisArticleProps = {
  className?: string;
  post: { slug: string; title?: string };
};

const ShareThisArticle: React.FC<ShareThisArticleProps> = ({ className = '', post }) => {
  const shareUrl = new URL(`/insights/${post?.slug ?? ''}`, BASE_URL).toString();
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(post?.title ?? 'Check this out');

  const links = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const shareNative = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: post?.title ?? 'Article', url: shareUrl });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        // Replace with your toast system
        alert('Link copied to clipboard');
      }
    } catch {
      // user cancelled or share failed — no-op
    }
  };

  return (
    <div className={className} role='group' aria-label='Share this article'>
      <p className='mb-[1rem] text-[1.3rem] font-semibold uppercase'>Share This Article</p>

      <div className='flex items-center gap-[0.8rem]'>
        <button
          type='button'
          onClick={shareNative}
          className='border-border text-primary focus:ring-primary/40 inline-flex aspect-square w-[2.8rem] items-center justify-center rounded-full border-[0.1rem] leading-none focus:ring-2 focus:outline-none'
          aria-label='Share'
          title='Share'
        >
          <span aria-hidden>↗</span>
        </button>

        <a
          href={links.twitter}
          target='_blank'
          rel='noopener noreferrer'
          className='border-border text-primary rounded-full border-[0.1rem] p-[0.5rem]'
          aria-label='Share on X (Twitter)'
          title='Share on X'
        >
          <XTwitter className='h-[1.8rem] w-[1.8rem] p-[0.2rem]' />
        </a>

        <a
          href={links.linkedin}
          target='_blank'
          rel='noopener noreferrer'
          className='border-border text-primary rounded-full border-[0.1rem] p-[0.5rem]'
          aria-label='Share on LinkedIn'
          title='Share on LinkedIn'
        >
          <LinkedIn className='h-[2rem] w-[2rem] p-[0.2rem]' />
        </a>

        <a
          href={links.facebook}
          target='_blank'
          rel='noopener noreferrer'
          className='border-border text-primary rounded-full border-[0.1rem] p-[0.5rem]'
          aria-label='Share on Facebook'
          title='Share on Facebook'
        >
          <Facebook className='h-[1.8rem] w-[1.8rem] p-[0.2rem]' />
        </a>
      </div>
    </div>
  );
};

export default ShareThisArticle;
