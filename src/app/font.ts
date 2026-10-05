import { Instrument_Serif, Instrument_Sans } from 'next/font/google';

/** Display face — reserved for large editorial statements and oversized numerals. */
export const displayFont = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

/** Body face — copy, headings, UI, forms. */
export const bodyFont = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-sans',
});
