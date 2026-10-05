import { BodyCopyTypes, PlatformTypes } from '@src/typescriptGlobals/contentful';

export type InstagramEmbedPropTypes = {
  className?: string;
  data: {
    url: string;
    platform: PlatformTypes;
    bodyCopy: BodyCopyTypes;
  };
};
