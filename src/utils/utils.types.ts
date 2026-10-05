export type IsFullUrlParamTypes = {
  url: string;
};

export type IsFullUrlReturnTypes = boolean;

export type CheckTrustedDomainParamType = { href: string };

export type IsFullUrl = {
  url: string;
};

export type ImgLoaderParamTypes = {
  imgs: HTMLImageElement[];
};

export type HasImagesLoadedParamTypes = {
  numberOfImagesLoaded: number;
  numberOfImagesFound: number;
};

export type AddHighlightTypes = string;

export type ScrollToParamTypes = {
  targetSelector: string; // can be a class, id, or tag e.g., '.myClass', '#myId', 'section'
};

export type CacheTypes = 'no-cache' | 'force-cache';

export type FetchAPIParamTypes = {
  url?: string;
  method?: 'GET' | 'POST';
  query: string;
  variables?: object;
  cache?: CacheTypes;
};

export type GetButtonReturnTypes =
  | {
      primary: true;
    }
  | {
      secondary: true;
    }
  | {
      tertiary: true;
    };

export type JsonLDParamTypes = {
  data?: any;
};
