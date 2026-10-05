import React from 'react';

export type NextLinkPropTypes = {
  className?: string;
  href?: string;
  title?: string;
  scroll?: boolean;
  ariaLabel?: string | undefined;
  replace?: boolean;
  children: React.ReactNode;
  locale?: string | undefined;
  prefetch?: boolean;
};
