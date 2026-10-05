import { AssetTypes, BodyCopyTypes, PlatformTypes } from '@src/typescriptGlobals/contentful';

export type VideoEmbedPlayerPropTypes = {
  className?: string;
  data: {
    url: string;
    platform: PlatformTypes;
    bodyCopy: BodyCopyTypes;
    thumbnail: AssetTypes;
  };
};
