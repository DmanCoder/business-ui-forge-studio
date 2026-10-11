/**
 * Push a custom event onto the Google Tag Manager dataLayer.
 *
 * GTM is loaded globally in the root layout (production only). This helper is
 * safe to call anywhere: it is a no-op during SSR and creates the dataLayer
 * array when GTM has not loaded, so a push can never throw. Never pass
 * personally identifiable information — the payload is forwarded to GA4.
 */
const pushDataLayerEvent = (event: string, data: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({ event, ...data });
};

export default pushDataLayerEvent;
