// -------------- DESIGN TOKENS (DISPLAY COPY) --------------
// Human-readable values of the design system, used by the specimen graphics
// (hero, case study, about) so every number they print is the real one.
//
// SOURCE OF TRUTH: src/app/globals.css (@theme) and src/components/ui/Cta.tsx.
// Colour classes in the specimens still come from the Tailwind theme
// (bg-paper, bg-ink, bg-blue, bg-line); only the printed hex strings, scale
// labels and breakpoints live here. Update this file when globals.css changes.

export const TOKEN_COLORS = [
  { name: 'paper', hex: '#faf9f6', className: 'bg-paper' },
  { name: 'ink', hex: '#0b1220', className: 'bg-ink' },
  { name: 'blue', hex: '#1554cb', className: 'bg-blue' },
  { name: 'line', hex: '#e8e6e0', className: 'bg-line' },
] as const;

/** The three steps of the type scale that matter to a reader. */
export const TYPE_SCALE = [
  { role: 'Display', face: 'Instrument Serif 400', max: 'to 10.4rem' },
  { role: 'Heading', face: 'Instrument Sans 600', max: 'to 4rem' },
  { role: 'Body', face: 'Instrument Sans 400', max: '1.6rem' },
] as const;

/** Printed token rows — names mirror the custom properties / utilities. */
export const TOKEN_ROWS = [
  { name: '--color-blue', value: '#1554cb' },
  { name: '--spacing', value: '0.4rem' },
  { name: 'radius · button', value: '0.2rem' },
  { name: 'motion', value: 'none' },
] as const;

/** Breakpoints from the @theme block, in px. */
export const BREAKPOINTS = [500, 768, 1024, 1280] as const;
