// -------------- FEATURE FLAGS (SERVER-SAFE) --------------
// Flags read from server-side environment variables. These are evaluated
// during static generation and server rendering only — never expose them
// through NEXT_PUBLIC_* and never read them inside client components.

/**
 * Demo-content mode. When `SHOW_DEMO_CONTENT=true`, clearly-labelled fictional
 * demo case studies and sample testimonials (src/lib/caseStudies/demo.ts) are
 * merged into the local content source so every layout can be designed and
 * tested. When the variable is unset or anything other than the exact string
 * 'true', demo content is excluded everywhere: pages, static params, metadata,
 * sitemap and JSON-LD all share this one decision.
 *
 * Demo content is always labelled in the UI and noindexed — this flag controls
 * presence, honesty gates stay in src/lib/caseStudies.
 */
export function isDemoContentEnabled(): boolean {
  return process.env.SHOW_DEMO_CONTENT === 'true';
}
