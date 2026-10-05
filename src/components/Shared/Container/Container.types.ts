import React from 'react';

type ContainerTagNames =
  | 'section'
  | 'nav'
  | 'article'
  | 'aside'
  | 'main'
  | 'header'
  | 'footer'
  | 'div'
  | 'form'
  | 'fieldset'
  | 'ul'
  | 'ol'
  | 'dl'
  | 'figure'
  | 'address'
  | 'details'
  | 'menu';

export type ContainerPropTypes = {
  children: React.ReactNode;
  className?: string;
  background?: string;
  HtmlTag?: ContainerTagNames;
};
