import { BodyCopyTypes } from '@src/typescriptGlobals/contentful';

export type BodyCopyRendererPropTypes = {
  className?: string;
  style?: object;
  HTMLTag?: 'div' | 'aside' | 'section';
  bodyCopy: BodyCopyTypes;
};
