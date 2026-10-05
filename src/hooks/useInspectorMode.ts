'use client';

import { useContentfulInspectorMode } from '@contentful/live-preview/react';

type InspectorModeTags = ReturnType<typeof useContentfulInspectorMode>;

interface UseInspectorModeParams {
  entryId: string;
  locale?: string;
}

/**
 * Hook to manage Contentful inspector mode in non-production environments.
 * Always calls the hook unconditionally to follow React's Rules of Hooks.
 * @param params - Parameters for configuring inspector mode.
 * @returns Inspector mode props in non-production, empty object in production.
 */
const useInspectorMode = ({
  entryId,
  locale,
}: UseInspectorModeParams): InspectorModeTags | (() => Record<string, never>) => {
  // Call the hook unconditionally
  const inspectorProps = useContentfulInspectorMode({ entryId, locale });

  // Return a no-op function for production environments
  const isProduction =
    process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ENVIRONMENT === 'PROD';
  return isProduction ? () => ({}) : inspectorProps;
};

export default useInspectorMode;
