import React from 'react';
import { Document } from '@contentful/rich-text-types';

export type RichTextRendererPropTypes = {
  children?: React.ReactNode;
  document: Document;
};
