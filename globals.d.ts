export {};

declare global {
  interface Window {
    /** Twitter/X embed widgets (loaded on demand by TwitterEmbed). */
    twttr?: {
      widgets: {
        load: (_element?: HTMLElement | null) => void;
      };
      ready?: (_callback: () => void) => void;
    };
    /** Instagram embed script (loaded on demand by InstagramEmbed). */
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}
