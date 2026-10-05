// ---------------------------------------------------------------------------
// UI Forge Studio — static asset primitives ("editorial ledger" system)
//
// One source of truth for the visual language shared by every generated
// asset: palette, type stacks, browser-frame geometry, the forge-spark motif,
// modular grids and blueprint registration marks. Keeping these here is what
// makes the asset set provably ONE visual family instead of a different look
// per page.
//
// Hard rule: everything produced is STATIC. No <animate>, no SMIL, no CSS
// animation/transition — ever. (See docs/UI-FORGE-NO-ANIMATION-AUDIT.md and
// the no-animation mandate.) Tokens mirror src/app/globals.css.
// ---------------------------------------------------------------------------

/** Brand palette — exact values from src/app/globals.css @theme. */
export const P = {
  paper: '#faf9f6',
  ink: '#0b1220',
  blue: '#1e6fff',
  blueDeep: '#1554cb',
  blueBright: '#4c8bff',
  blueSoft: '#7fa8ff',
  blueWash: '#e8f0ff', // --color-primary--light
  muted: '#555d6a',
  mutedDark: '#8a93a3',
  line: '#e8e6e0',
  edge: '#c9c6bd',
  white: '#ffffff',
  ink70: '#3a4150',
};

/** Font stacks that render identically without web fonts loaded. */
export const F = {
  serif: "Georgia, 'Times New Roman', serif",
  sans: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  mono: "'SF Mono', ui-monospace, Menlo, Consolas, monospace",
};

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/** Wrap children in a titled, accessible SVG root. */
export function svg({ w, h, title, children }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(
    title
  )}">
  <!-- Original UI Forge Studio artwork. Static — no animation. -->
${children}
</svg>
`;
}

export function rect(x, y, w, h, fill, { r = 0, stroke, sw = 0, opacity } = {}) {
  const rx = r ? ` rx="${r}"` : '';
  const st = stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : '';
  const op = opacity != null ? ` opacity="${opacity}"` : '';
  return `  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill || 'none'}"${rx}${st}${op}/>`;
}

export function line(x1, y1, x2, y2, stroke = P.line, sw = 2, { dash } = {}) {
  const d = dash ? ` stroke-dasharray="${dash}"` : '';
  return `  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"${d}/>`;
}

export function circle(cx, cy, r, fill, { stroke, sw = 0 } = {}) {
  const st = stroke ? ` stroke="${stroke}" stroke-width="${sw}"` : '';
  return `  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill || 'none'}"${st}/>`;
}

export function text(x, y, str, { font = F.sans, size = 14, fill = P.ink, weight, ls, anchor } = {}) {
  const w = weight ? ` font-weight="${weight}"` : '';
  const l = ls != null ? ` letter-spacing="${ls}"` : '';
  const a = anchor ? ` text-anchor="${anchor}"` : '';
  return `  <text x="${x}" y="${y}" font-family="${font}" font-size="${size}"${w}${l}${a} fill="${fill}">${esc(
    str
  )}</text>`;
}

/** Uppercase technical label (mono, tracked out) — the recurring caption voice. */
export function label(x, y, str, { fill = P.muted, size = 13, anchor } = {}) {
  return text(x, y, str, { font: F.mono, size, fill, ls: size * 0.18, anchor });
}

/** The forge-spark motif: a four-point plus/cross, the studio's recognition mark. */
export function forgeSpark(cx, cy, s = 28, fill = P.blue) {
  const a = s; // arm length from centre
  const t = s * 0.34; // half-thickness
  const d = [
    `M${cx - t} ${cy - a}`,
    `H${cx + t}`,
    `V${cy - t}`,
    `H${cx + a}`,
    `V${cy + t}`,
    `H${cx + t}`,
    `V${cy + a}`,
    `H${cx - t}`,
    `V${cy + t}`,
    `H${cx - a}`,
    `V${cy - t}`,
    `H${cx - t}`,
    'Z',
  ].join(' ');
  return `  <path d="${d}" fill="${fill}"/>`;
}

/** Blueprint corner registration marks + optional coordinate captions. */
export function registration(x, y, w, h, { code, tag, stroke = P.edge } = {}) {
  const m = 14;
  const parts = [
    // corners
    `  <path d="M${x} ${y + m} V${y} H${x + m}" fill="none" stroke="${stroke}" stroke-width="1.5"/>`,
    `  <path d="M${x + w - m} ${y} H${x + w} V${y + m}" fill="none" stroke="${stroke}" stroke-width="1.5"/>`,
    `  <path d="M${x + w} ${y + h - m} V${y + h} H${x + w - m}" fill="none" stroke="${stroke}" stroke-width="1.5"/>`,
    `  <path d="M${x + m} ${y + h} H${x} V${y + h - m}" fill="none" stroke="${stroke}" stroke-width="1.5"/>`,
  ];
  if (code) parts.push(label(x + 4, y + h - 6, code, { fill: stroke, size: 12 }));
  if (tag) parts.push(label(x + w - 4, y + h - 6, tag, { fill: stroke, size: 12, anchor: 'end' }));
  return parts.join('\n');
}

/** A neutral browser chrome bar. Returns the chrome; caller fills the body. */
export function browserChrome(x, y, w, { h = 40, fill = P.paper, stroke = P.edge, dot = P.edge } = {}) {
  const r = h * 0.16;
  return [
    rect(x, y, w, h, fill, { stroke, sw: 2 }),
    circle(x + h * 0.55, y + h / 2, r, dot),
    circle(x + h * 1.05, y + h / 2, r, dot),
    circle(x + h * 1.55, y + h / 2, r, dot),
    rect(x + w * 0.32, y + h * 0.3, w * 0.36, h * 0.4, P.line, { r: h * 0.2 }),
  ].join('\n');
}

/** Evenly spaced vertical grid columns (design-canvas modular grid hint). */
export function columns(x, y, w, h, n, stroke = P.line, sw = 1) {
  const parts = [];
  const step = w / n;
  for (let i = 1; i < n; i++) parts.push(line(x + step * i, y, x + step * i, y + h, stroke, sw));
  return parts.join('\n');
}

/** A tick ruler with measurement marks — the blueprint accent. */
export function ruler(x, y, w, { step = 40, stroke = P.edge, tall = 5 } = {}) {
  const parts = [line(x, y, x + w, y, stroke, 1.5)];
  for (let i = 0; i * step <= w; i++) {
    const big = i % 5 === 0;
    parts.push(line(x + i * step, y, x + i * step, y - (big ? tall * 2 : tall), stroke, 1.5));
  }
  return parts.join('\n');
}

/** Stacked "text" rules standing in for a paragraph. */
export function textLines(x, y, widths, { gap = 22, h = 9, fill = P.mutedDark, r = 4.5 } = {}) {
  return widths.map((w, i) => rect(x, y + i * gap, w, h, fill, { r })).join('\n');
}

/** A pill button (primary = filled blue, else outlined ink). */
export function pill(x, y, w, h, { primary = true } = {}) {
  if (primary)
    return [
      rect(x, y, w, h, P.blue, { r: h / 2 }),
      rect(x + w * 0.28, y + h * 0.42, w * 0.44, h * 0.16, P.white, { r: 4 }),
    ].join('\n');
  return [
    rect(x, y, w, h, 'none', { r: h / 2, stroke: P.ink, sw: 2 }),
    rect(x + w * 0.28, y + h * 0.42, w * 0.44, h * 0.16, P.ink, { r: 4 }),
  ].join('\n');
}

/** Visible demo watermark line — used only on fictional demo artwork. */
export function demoStamp(x, y, str = 'DEMO — FICTIONAL BRAND · NOT CLIENT WORK') {
  return text(x, y, str, { font: F.sans, size: 22, fill: '#6b675c', ls: 4 });
}
