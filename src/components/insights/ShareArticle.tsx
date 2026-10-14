'use client';

import React, { useState } from 'react';

import XTwitter from '@src/components/Icons/XTwitter';
import LinkedIn from '@src/components/Icons/LinkedIn';
import Facebook from '@src/components/Icons/Facebook';
import { BASE_URL } from '@src/typescriptGlobals/constants';

type ShareArticleProps = {
  slug: string;
  title: string;
  className?: string;
};

const control =
  'border-edge text-ink hover:border-ink hover:bg-ink hover:text-white inline-flex min-h-[4.4rem] items-center gap-[0.8rem] border px-[1.4rem] text-[1.35rem] font-semibold';

/**
 * Share controls in the ledger voice: copy the link (with an inline, instant
 * confirmation — no toast, no alert), then X, LinkedIn and Facebook.
 */
const ShareArticle: React.FC<ShareArticleProps> = ({ slug, title, className = '' }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = new URL(`/insights/${slug}`, BASE_URL).toString();
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <XTwitter className='h-[1.6rem] w-[1.6rem]' />,
    },
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedIn className='h-[1.7rem] w-[1.7rem]' />,
    },
    {
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <Facebook className='h-[1.6rem] w-[1.6rem]' />,
    },
  ];

  const copyLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: shareUrl });
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      // Cancelled or unavailable — the links below still work.
    }
  };

  return (
    <div className={className} role='group' aria-label='Share this article'>
      <p className='meta-label'>Share</p>
      <div className='mt-[1.2rem] flex flex-wrap gap-[0.8rem]'>
        <button type='button' onClick={copyLink} className={control}>
          <span aria-hidden='true'>↗</span>
          {copied ? 'Link copied' : 'Copy link'}
        </button>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={link.label}
            title={link.label}
            className={`${control} px-[1.2rem]`}
          >
            {link.icon}
          </a>
        ))}
      </div>
      <p role='status' aria-live='polite' className='sr-only'>
        {copied ? 'Link copied to clipboard' : ''}
      </p>
    </div>
  );
};

export default ShareArticle;
