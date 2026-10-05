import { BodyCopyTypes, PlatformTypes } from '@src/typescriptGlobals/contentful';

export type TwitterEmbedPropTypes = {
  className?: string;
  data: {
    url: string;
    platform: PlatformTypes;
    bodyCopy: BodyCopyTypes;
  };
};
