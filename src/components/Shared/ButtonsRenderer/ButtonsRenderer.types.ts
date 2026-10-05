import { ButtonEntryTypes } from '@src/typescriptGlobals/contentful';

export type ButtonsRendererPropTypes = {
  className?: string;
  style?: object;
  buttons: ButtonEntryTypes[];
};
