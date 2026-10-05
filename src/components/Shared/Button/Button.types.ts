import React from 'react';

import { ButtonPropAlignTypes } from '@src/typescriptGlobals/contentful';

type ButtonStyles = 'primary' | 'secondary' | 'tertiary';

type BaseButtonProps = {
  className?: string;
  text?: string;
  ariaLabel?: string;
  reversed?: boolean;
  align?: ButtonPropAlignTypes;
  HtmlTag?: ButtonTagTypes;
  children?: React.ReactNode;
};

type AtLeastOneStyle = {
  [K in ButtonStyles]-?: Record<K, true> & Partial<Record<Exclude<ButtonStyles, K>, never>>;
}[ButtonStyles];

type ButtonWithOnClick = BaseButtonProps &
  AtLeastOneStyle & {
    HtmlTag?: 'button';
    // eslint-disable-next-line
    onClick: (() => void) | ((...args: any[]) => void); // onClick can be a function or undefined
    href?: never; // href should not exist for 'button'
  };

type ButtonWithHref = BaseButtonProps &
  AtLeastOneStyle & {
    HtmlTag?: 'a' | 'Link'; // HtmlTag is optional here, defaults to 'a' or 'Link'
    href: string;
    onClick?: never; // onClick should not exist for 'a' and 'Link'
  };

export type ButtonPropTypes = ButtonWithOnClick | ButtonWithHref;
export type ButtonTagTypes = 'button' | 'Link';
