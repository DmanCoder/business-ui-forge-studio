import { BodyCopyTypes } from '@src/typescriptGlobals/contentful';
import { ObjectFitTypes } from '@src/typescriptGlobals/types';
import React from 'react';

type WithAspectRatioTypes = {
  aspectRatio: number;
  width: number;
};

type WithoutAspectRatioTypes = {
  aspectRatio?: never;
  width?: never | number;
};

export type NextImagePropTypes = {
  src: string;
  alt: string;
  title?: string;
  caption?: BodyCopyTypes | string;
  children?: React.ReactNode;
  priority?: boolean;
  objectFit?: ObjectFitTypes;
  className?: string;
  childrenClassName?: string;
  sizes?: string;
  quality?: number;
  imgREF?: React.RefObject<HTMLElement>;
} & (WithAspectRatioTypes | WithoutAspectRatioTypes);
