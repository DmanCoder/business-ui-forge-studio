// ---------------------------------------------------------------------------
// UI Forge Studio — static asset generator
//
// Renders the static files the site still ships as files — the insights Open
// Graph covers (SVG + rasterised PNG) and the production-off demo galleries —
// from the shared primitives in asset-lib.mjs:
//   node scripts/generate-static-assets.mjs
//
// Every in-page graphic (hero specimen, service diagrams, platform decision,
// process map, studio artefacts, case-study figures) is an HTML/CSS component
// under src/components rendered from the live design tokens, so it is no
// longer generated here.
//
// Fonts: scripts/fonts/ holds the OFL Instrument Serif / Instrument Sans
// files and a fontconfig file, so the rasteriser prints the real typefaces.
// Everything emitted is STATIC. No animation of any kind.
// ---------------------------------------------------------------------------

import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import {
  P,
  F,
  svg,
  rect,
  line,
  circle,
  text,
  label,
  forgeSpark,
  registration,
  mark,
} from './asset-lib.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = (p) => resolve(ROOT, 'public/static', p);

// fontconfig must see the bundled fonts before sharp (librsvg) initialises,
// so the config path is set first and sharp is imported afterwards.
process.env.FONTCONFIG_FILE = resolve(ROOT, 'scripts/fonts/fonts.conf');
const sharp = (await import('sharp')).default;
const written = [];
function emit(path, markup) {
  writeFileSync(OUT(path), markup);
  written.push(path);
}

/** A labelled flow node (box + centred mono label). */
function node(x, y, w, h, str, { fill = P.white, stroke = P.ink, accent = false, textFill } = {}) {
  const tc = textFill || (accent ? P.blueDeep : P.ink);
  return [
    rect(x, y, w, h, fill, { stroke: accent ? P.blue : stroke, sw: 2, r: 6 }),
    text(x + w / 2, y + h / 2 + 4, str, {
      font: F.mono,
      size: 13,
      fill: tc,
      anchor: 'middle',
      ls: 0.5,
    }),
  ].join('\n');
}

/** A horizontal connector with a small arrowhead. */
function connector(x1, y, x2, { stroke = P.edge } = {}) {
  return [
    line(x1, y, x2 - 8, y, stroke, 2),
    `  <path d="M${x2 - 10} ${y - 5} L${x2} ${y} L${x2 - 10} ${y + 5}" fill="none" stroke="${stroke}" stroke-width="2"/>`,
  ].join('\n');
}

// --- 5. INSIGHTS OPEN GRAPH COVERS ----------------------------------------
// One shared editorial family; each article gets a distinct diagram that
// restates a claim the article makes, with no invented figures. Only the
// 1200x630 Open Graph crop is produced — on-page figures are HTML.

function brandMark(x, y, { onDark = false } = {}) {
  return [
    mark(x, y - 11, 22, { body: onDark ? P.white : P.ink, bar: P.blue }),
    text(x + 34, y + 5, 'UI FORGE STUDIO', {
      font: F.sans,
      size: 14,
      fill: onDark ? P.white : P.ink,
      ls: 2,
      weight: 600,
    }),
  ].join('\n');
}

// -- diagrams (compact, ~210px tall so they fit the 1200x630 OG crop) --
function costDiagram(x, y, w) {
  // "Two five-page websites": same page count, every other decision differs.
  const parts = [label(x, y, 'SAME PAGE COUNT · DIFFERENT SCOPE', { fill: P.muted, size: 12 })];
  const rows = [
    ['Pages', '5', '5'],
    ['Layouts', '2 templates', '5 bespoke'],
    ['Content', 'Supplied', 'Written & shot'],
    ['Functionality', 'Contact form', 'Bookings, logins'],
    ['Integrations', 'None', 'CRM, accounting'],
  ];
  const colA = x + 230;
  const colB = x + 230 + (w - 230) / 2;
  parts.push(label(colA, y + 24, 'WEBSITE A', { fill: P.mutedDark, size: 11 }));
  parts.push(label(colB, y + 24, 'WEBSITE B', { fill: P.blue, size: 11 }));
  rows.forEach(([name, a, b], i) => {
    const ry = y + 48 + i * 34;
    parts.push(line(x, ry - 22, x + w, ry - 22, P.line, 1.5));
    parts.push(text(x, ry, name, { font: F.sans, size: 15, fill: P.ink, weight: 500 }));
    parts.push(text(colA, ry, a, { font: F.sans, size: 15, fill: P.muted }));
    parts.push(text(colB, ry, b, { font: F.sans, size: 15, fill: P.ink }));
  });
  return parts.join('\n');
}

function ownershipDiagram(x, y, w) {
  const parts = [
    label(x, y, 'THE FIVE THINGS THAT MAKE UP A WEBSITE', { fill: P.muted, size: 12 }),
  ];
  const layers = [
    ['Domain', 'your business, always'],
    ['Hosting', 'yours, or managed with a handover'],
    ['The website itself', 'set out in the contract'],
    ['Content and data', 'unambiguously yours'],
    ['Accounts and access', 'owned by the business'],
  ];
  const sh = 34;
  layers.forEach(([name, note], i) => {
    const ly = y + 18 + i * (sh + 6);
    const accent = i === 0;
    parts.push(rect(x, ly, w, sh, P.white, { stroke: accent ? P.blue : P.edge, sw: 1.5 }));
    parts.push(
      text(x + 18, ly + sh / 2 + 4, String(i + 1).padStart(2, '0'), {
        font: F.sans,
        size: 12,
        fill: P.blue,
        weight: 600,
      })
    );
    parts.push(text(x + 52, ly + sh / 2 + 6, name, { font: F.serif, size: 19, fill: P.ink }));
    parts.push(
      text(x + w - 16, ly + sh / 2 + 5, note, {
        font: F.sans,
        size: 13,
        fill: P.muted,
        anchor: 'end',
      })
    );
  });
  return parts.join('\n');
}

function platformDiagram(x, y, w) {
  const parts = [label(x, y, 'THREE ARCHITECTURES', { fill: P.muted, size: 12 })];
  const cols = [
    ['WordPress', ['Theme', 'WordPress editor', 'PHP hosting'], false],
    ['Webflow', ['Visual canvas', 'Webflow CMS', 'Webflow hosting'], false],
    ['Custom build', ['Next.js front end', 'CMS chosen for you', 'Managed hosting'], true],
  ];
  const gap = 28;
  const cw = (w - 2 * gap) / 3;
  cols.forEach(([name, slabs, accent], c) => {
    const cx = x + c * (cw + gap);
    parts.push(rect(cx, y + 20, cw, 38, P.white, { stroke: accent ? P.blue : P.ink, sw: 1.5 }));
    parts.push(
      text(cx + cw / 2, y + 45, name, {
        font: F.sans,
        size: 15,
        fill: accent ? P.blue : P.ink,
        anchor: 'middle',
        weight: 600,
      })
    );
    slabs.forEach((s, i) => {
      const sy = y + 66 + i * 44;
      parts.push(rect(cx, sy, cw, 36, P.white, { stroke: P.line, sw: 1.5 }));
      parts.push(
        text(cx + cw / 2, sy + 23, s, { font: F.sans, size: 13, fill: P.muted, anchor: 'middle' })
      );
    });
  });
  return parts.join('\n');
}

function insightCover(W, H, { category, titleLines, diagram }) {
  const parts = [rect(0, 0, W, H, P.paper)];
  parts.push(registration(40, 40, W - 80, H - 80)); // corner marks only — the blueprint cue stays on off-site surfaces
  parts.push(brandMark(64, 92));
  parts.push(label(64, 158, `INSIGHT · ${category.toUpperCase()}`, { fill: P.blue, size: 13 }));
  const tSize = 44;
  const tGap = tSize + 8;
  titleLines.forEach((l, i) =>
    parts.push(text(64, 206 + i * tGap, l, { font: F.serif, size: tSize, fill: P.ink }))
  );
  const titleBottom = 206 + (titleLines.length - 1) * tGap + 24;
  parts.push(line(64, titleBottom, W - 64, titleBottom, P.line, 1.5));
  parts.push(diagram(64, titleBottom + 40, W - 128));
  parts.push(label(64, H - 40, 'uiforgestudio.com', { fill: P.muted, size: 12 }));
  parts.push(label(W - 64, H - 40, 'INSIGHTS', { fill: P.mutedDark, size: 11, anchor: 'end' }));
  return svg({
    w: W,
    h: H,
    title: `UI Forge Studio insight cover — ${titleLines.join(' ')}.`,
    children: parts.join('\n'),
  });
}

const INSIGHTS = [
  {
    key: 'website-cost',
    category: 'Websites',
    title: ['What affects the', 'cost of a website'],
    diagram: costDiagram,
    tag: 'INS / COST',
  },
  {
    key: 'ownership-hosting',
    category: 'Ownership',
    title: ['Website ownership', '& hosting explained'],
    diagram: ownershipDiagram,
    tag: 'INS / OWN',
  },
  {
    key: 'platform-comparison',
    category: 'Websites',
    title: ['Custom, WordPress', 'or Webflow'],
    diagram: platformDiagram,
    tag: 'INS / PLAT',
  },
];

// --- 7. DEMO PROJECT GALLERIES --------------------------------------------
// Original fictional interface compositions for the clearly-labelled demo
// case studies. Industry-appropriate structure, project accent, always the
// visible demo stamp. No fabricated metrics or results.

function themeOf(dark) {
  return dark
    ? {
        bg: '#0d1526',
        page: '#101a2c',
        stroke: '#22304a',
        ink: '#ffffff',
        muted: '#8fa3c4',
        card: '#16233b',
        wash: '#1b2942',
        stamp: '#8fa3c4',
      }
    : {
        bg: P.paper,
        page: P.white,
        stroke: P.edge,
        ink: P.ink,
        muted: P.mutedDark,
        card: P.paper,
        wash: '#eef1f4',
        stamp: '#6b675c',
      };
}

function demoFrame(parts, t, x, y, w, h, brand, accent) {
  parts.push(rect(x, y, w, h, t.page, { stroke: t.stroke, sw: 2 }));
  parts.push(
    rect(x, y, w, 44, t.bg === P.paper ? P.paper : '#0b1424', { stroke: t.stroke, sw: 2 })
  );
  parts.push(circle(x + 26, y + 22, 6, t.stroke));
  parts.push(circle(x + 48, y + 22, 6, t.stroke));
  parts.push(circle(x + 70, y + 22, 6, t.stroke));
  parts.push(text(x + 30, y + 90, brand, { font: F.serif, size: 26, fill: t.ink }));
  parts.push(rect(x + w - 190, y + 72, 74, 10, t.muted, { r: 5 }));
  parts.push(rect(x + w - 96, y + 66, 72, 24, accent, { r: 12 }));
  parts.push(line(x, y + 120, x + w, y + 120, t.stroke, 1.5));
}

function demoDesktop(cfg, kind) {
  const W = 1600;
  const H = 1000;
  const t = themeOf(cfg.dark);
  const parts = [rect(0, 0, W, H, t.bg)];
  const x = 120;
  const y = 90;
  const w = 1360;
  const h = 800;
  demoFrame(parts, t, x, y, w, h, cfg.brand, cfg.accent);
  const cx = x + 60;
  if (kind === 'app') {
    // application shell — sidebar + workflow + placeholder content (no metrics)
    parts.push(rect(x, y + 120, 190, h - 120, t.card, { stroke: t.stroke, sw: 1.5 }));
    for (let i = 0; i < 6; i++)
      parts.push(
        rect(x + 28, y + 160 + i * 42, 130, 12, i === 1 ? cfg.accent : t.stroke, { r: 6 })
      );
    const wx = x + 240;
    parts.push(text(wx, y + 190, 'Training overview', { font: F.serif, size: 30, fill: t.ink }));
    parts.push(
      node(wx, y + 220, 150, 44, 'PLAN', { fill: t.page, stroke: cfg.accent, accent: true })
    );
    parts.push(connector(wx + 150, y + 242, wx + 210, { stroke: t.stroke }));
    parts.push(
      node(wx + 210, y + 220, 150, 44, 'SESSION', {
        fill: t.page,
        stroke: t.muted,
        textFill: t.ink,
      })
    );
    parts.push(connector(wx + 360, y + 242, wx + 420, { stroke: t.stroke }));
    parts.push(
      node(wx + 420, y + 220, 150, 44, 'REVIEW', { fill: t.page, stroke: t.muted, textFill: t.ink })
    );
    for (let i = 0; i < 3; i++) {
      parts.push(
        rect(wx, y + 320 + i * 110, 1000, 90, t.card, { stroke: t.stroke, sw: 1.5, r: 6 })
      );
      parts.push(rect(wx + 28, y + 348 + i * 110, 220, 12, t.ink, { r: 6 }));
      parts.push(rect(wx + 28, y + 372 + i * 110, 420, 8, t.muted, { r: 4 }));
      parts.push(rect(wx + 900, y + 348 + i * 110, 60, 34, t.wash, { r: 6 }));
    }
  } else if (kind === 'booking') {
    parts.push(text(cx, y + 200, cfg.zones[0], { font: F.serif, size: 40, fill: t.ink }));
    parts.push(rect(cx, y + 230, 560, 10, t.muted, { r: 5 }));
    // steps
    for (let i = 0; i < 3; i++) {
      parts.push(
        circle(cx + 20 + i * 90, y + 300, 18, i === 0 ? cfg.accent : t.card, {
          stroke: t.stroke,
          sw: 2,
        })
      );
    }
    parts.push(line(cx + 38, y + 300, cx + 200, y + 300, t.stroke, 2));
    // form panel
    parts.push(rect(cx, y + 360, 620, 380, t.card, { stroke: t.stroke, sw: 1.5, r: 6 }));
    for (let i = 0; i < 4; i++)
      parts.push(
        rect(cx + 30, y + 400 + i * 66, 560, 40, t.page, { stroke: t.stroke, sw: 1.5, r: 4 })
      );
    parts.push(rect(cx + 30, y + 668, 200, 44, cfg.accent, { r: 22 }));
    // summary card
    parts.push(rect(cx + 700, y + 360, 500, 380, t.wash, { r: 6 }));
    parts.push(text(cx + 730, y + 410, cfg.zones[1], { font: F.serif, size: 26, fill: t.ink }));
    for (let i = 0; i < 4; i++) {
      parts.push(line(cx + 730, y + 450 + i * 56, cx + 1170, y + 450 + i * 56, t.stroke, 1.5));
      parts.push(rect(cx + 730, y + 460 + i * 56, 200, 10, t.muted, { r: 5 }));
      parts.push(rect(cx + 1080, y + 460 + i * 56, 90, 10, t.ink, { r: 5 }));
    }
  } else {
    // overview / home
    parts.push(text(cx, y + 210, cfg.zones[0], { font: F.serif, size: 46, fill: t.ink }));
    parts.push(text(cx, y + 264, cfg.zones[1], { font: F.serif, size: 46, fill: t.ink }));
    parts.push(rect(cx, y + 300, 480, 10, t.muted, { r: 5 }));
    parts.push(rect(cx, y + 324, 400, 10, t.muted, { r: 5 }));
    parts.push(rect(cx, y + 372, 200, 50, cfg.accent, { r: 25 }));
    parts.push(rect(x + w - 620, y + 180, 560, 320, t.wash, { r: 6 }));
    parts.push(forgeSpark(x + w - 340, y + 340, 20, cfg.accent));
    for (let i = 0; i < 3; i++) {
      const bx = cx + i * 420;
      parts.push(rect(bx, y + 560, 380, 200, t.card, { stroke: t.stroke, sw: 1.5, r: 6 }));
      parts.push(circle(bx + 44, y + 616, 22, t.wash));
      parts.push(forgeSpark(bx + 44, y + 616, 10, cfg.accent));
      parts.push(rect(bx + 30, y + 664, 200, 14, t.ink, { r: 7 }));
      parts.push(rect(bx + 30, y + 692, 300, 9, t.muted, { r: 4 }));
      parts.push(rect(bx + 30, y + 712, 260, 9, t.muted, { r: 4 }));
    }
  }
  parts.push(demoStampT(parts, t, 120, 958, cfg.stamp));
  return svg({ w: W, h: H, title: cfg.altDesktop(kind), children: parts.join('\n') });
}

function demoMobile(cfg) {
  const W = 1500;
  const H = 1000;
  const t = themeOf(cfg.dark);
  const parts = [rect(0, 0, W, H, t.bg)];
  const xs = [340, 640, 940];
  xs.forEach((x, i) => {
    const y = 120;
    const w = 220;
    const h = 720;
    parts.push(rect(x, y, w, h, t.page, { stroke: t.stroke, sw: 2, r: 30 }));
    parts.push(rect(x + w / 2 - 30, y + 16, 60, 8, t.stroke, { r: 4 }));
    parts.push(
      text(x + 22, y + 66, cfg.brand.split(' ')[0], { font: F.serif, size: 20, fill: t.ink })
    );
    parts.push(rect(x + w - 60, y + 50, 40, 16, cfg.accent, { r: 8 }));
    parts.push(rect(x + 22, y + 92, w - 44, i === 1 ? 300 : 150, t.wash, { r: 6 }));
    if (i === 1) parts.push(forgeSpark(x + w / 2, y + 240, 18, cfg.accent));
    const oy = i === 1 ? y + 420 : y + 262;
    parts.push(rect(x + 22, oy, w - 80, 12, t.ink, { r: 6 }));
    parts.push(rect(x + 22, oy + 24, w - 44, 8, t.muted, { r: 4 }));
    parts.push(rect(x + 22, oy + 42, w - 60, 8, t.muted, { r: 4 }));
    parts.push(rect(x + 22, y + h - 90, w - 44, 40, cfg.accent, { r: 20 }));
    parts.push(line(x, y + h - 42, x + w, y + h - 42, t.stroke, 1.5));
    [0.25, 0.5, 0.75].forEach((f, k) =>
      parts.push(circle(x + w * f, y + h - 22, 5, k === 0 ? cfg.accent : t.stroke))
    );
  });
  parts.push(demoStampT(parts, t, 60, 958, cfg.stamp));
  return svg({ w: W, h: H, title: cfg.altMobile, children: parts.join('\n') });
}

function demoDetail(cfg) {
  const W = 1400;
  const H = 1050;
  const t = themeOf(cfg.dark);
  const parts = [rect(0, 0, W, H, t.bg)];
  parts.push(registration(48, 48, W - 96, H - 96)); // corners only — demo stamp sits at the bottom
  parts.push(label(96, 120, 'DESIGN-SYSTEM SPECIMEN', { fill: cfg.accent, size: 14 }));
  parts.push(text(96, 172, cfg.brand, { font: F.serif, size: 40, fill: t.ink }));
  parts.push(line(96, 202, W - 96, 202, t.stroke, 1.5));
  // swatches
  const sy = 250;
  [
    [cfg.accent, 'ACCENT'],
    [t.ink, 'INK'],
    [t.muted, 'MUTED'],
    [t.wash, 'WASH'],
    [t.stroke, 'LINE'],
  ].forEach(([c, n], i) => {
    parts.push(rect(96 + i * 130, sy, 100, 100, c, { stroke: t.stroke, sw: 1.5, r: 4 }));
    parts.push(label(96 + i * 130, sy + 128, n, { fill: t.muted, size: 11 }));
  });
  // type + buttons
  parts.push(text(820, sy + 60, 'Ag', { font: F.serif, size: 80, fill: t.ink }));
  parts.push(text(960, sy + 60, 'Ag', { font: F.sans, size: 60, fill: t.ink }));
  parts.push(text(1090, sy + 60, 'Ag', { font: F.mono, size: 44, fill: t.muted }));
  // component chips
  const cy = 470;
  const chips = ['Button', 'Field', 'Card', 'Nav', 'Badge', 'Tab'];
  chips.forEach((c, i) => {
    const cx = 96 + (i % 3) * 420;
    const yy = cy + Math.floor(i / 3) * 240;
    parts.push(rect(cx, yy, 380, 200, t.page, { stroke: t.stroke, sw: 1.5, r: 6 }));
    parts.push(label(cx + 24, yy + 34, c.toUpperCase(), { fill: t.muted, size: 11 }));
    parts.push(
      rect(
        cx + 24,
        yy + 60,
        160,
        44,
        i % 2 ? 'none' : cfg.accent,
        i % 2 ? { r: 22, stroke: cfg.accent, sw: 2 } : { r: 22 }
      )
    );
    parts.push(rect(cx + 24, yy + 128, 320, 10, t.muted, { r: 5 }));
    parts.push(rect(cx + 24, yy + 152, 260, 10, t.stroke, { r: 5 }));
  });
  parts.push(forgeSpark(W - 96, 112, 14, cfg.accent));
  parts.push(demoStampT(parts, t, 48, H - 40, cfg.stamp));
  return svg({ w: W, h: H, title: cfg.altDetail, children: parts.join('\n') });
}

// demo stamp respecting theme (returns '' — pushes into parts)
function demoStampT(parts, t, x, y, color) {
  parts.push(
    text(x, y, 'DEMO — FICTIONAL BRAND · NOT CLIENT WORK', {
      font: F.sans,
      size: 22,
      fill: color,
      ls: 4,
    })
  );
  return '';
}

const DEMOS = [
  {
    slug: 'northline-physio-demo',
    brand: 'Northline Physio',
    accent: '#3d7f72',
    dark: false,
    stamp: '#6b675c',
    kinds: ['overview', 'booking'],
    zones: ['Move well,', 'feel better.'],
    bookingZones: ['Book an appointment', 'Your visit'],
    altDesktop: (k) =>
      k === 'booking'
        ? 'Demo interface for the fictional Northline Physio clinic: an appointment-booking page with a stepper, a details form and a visit-summary panel. Fictional demo, not client work.'
        : 'Demo interface for the fictional Northline Physio clinic: a homepage with a service headline, an image panel and three service cards. Fictional demo, not client work.',
    altMobile:
      'Demo responsive views for the fictional Northline Physio clinic: three phone screens showing home, services and booking. Fictional demo, not client work.',
    altDetail:
      'Demo design-system specimen for the fictional Northline Physio clinic: colour swatches, type scale and component chips in the clinic accent. Fictional demo, not client work.',
  },
  {
    slug: 'meridian-motors-demo',
    brand: 'Meridian Motors',
    accent: '#c98a2b',
    dark: false,
    stamp: '#6b675c',
    kinds: ['overview', 'booking'],
    zones: ['Servicing,', 'sorted.'],
    bookingZones: ['Book a service', 'Your booking'],
    altDesktop: (k) =>
      k === 'booking'
        ? 'Demo interface for the fictional Meridian Motors garage: a service-booking page with a stepper, a details form and a booking-summary panel. Fictional demo, not client work.'
        : 'Demo interface for the fictional Meridian Motors garage: a homepage with a servicing headline, an image panel and three service cards. Fictional demo, not client work.',
    altMobile:
      'Demo responsive views for the fictional Meridian Motors garage: three phone screens showing home, services and booking. Fictional demo, not client work.',
    altDetail:
      'Demo design-system specimen for the fictional Meridian Motors garage: colour swatches, type scale and component chips in the garage accent. Fictional demo, not client work.',
  },
  {
    slug: 'apex-sprint-lab-demo',
    brand: 'Apex Sprint Lab',
    accent: '#1e6fff',
    dark: true,
    stamp: '#8fa3c4',
    kinds: ['app', 'overview'],
    zones: ['Train with', 'precision.'],
    altDesktop: (k) =>
      k === 'app'
        ? 'Demo interface for the fictional Apex Sprint Lab performance app: a dark application shell with a sidebar, a plan-to-review workflow and placeholder session rows — a concept UI with no real performance data. Fictional demo, not client work.'
        : 'Demo interface for the fictional Apex Sprint Lab performance app: a dark marketing homepage with a headline, an image panel and three feature cards. Fictional demo, not client work.',
    altMobile:
      'Demo responsive views for the fictional Apex Sprint Lab performance app: three dark phone screens showing home, plan and session. Fictional demo, not client work.',
    altDetail:
      'Demo design-system specimen for the fictional Apex Sprint Lab performance app: colour swatches, type scale and component chips on a dark theme. Fictional demo, not client work.',
  },
];

// --- render ----------------------------------------------------------------
for (const ins of INSIGHTS) {
  emit(
    `insights/${ins.key}-og.svg`,
    insightCover(1200, 630, { category: ins.category, titleLines: ins.title, diagram: ins.diagram })
  );
}
for (const d of DEMOS) {
  d.kinds.forEach((k, i) => {
    const cfg = { ...d, zones: k === 'booking' ? d.bookingZones : d.zones };
    emit(`work/demo/${d.slug}-desktop-${i + 1}.svg`, demoDesktop(cfg, k));
  });
  emit(`work/demo/${d.slug}-mobile.svg`, demoMobile(d));
  emit(`work/demo/${d.slug}-detail.svg`, demoDetail(d));
}

// Open Graph rasters: social platforms don't render SVG og:image, so every
// insight OG cover is also written as a 1200x630 PNG for metadata use.
const ogPngs = [];
for (const ins of INSIGHTS) {
  const svgPath = OUT(`insights/${ins.key}-og.svg`);
  const pngPath = `insights/${ins.key}-og.png`;
  await sharp(readFileSync(svgPath), { density: 220 })
    .resize(1200, 630, { fit: 'fill' })
    .png({ compressionLevel: 9 })
    .toFile(OUT(pngPath));
  ogPngs.push(pngPath);
}

console.log(`Generated ${written.length} SVG assets:`);
written.forEach((w) => console.log('  public/static/' + w));
console.log(`Rasterised ${ogPngs.length} Open Graph PNGs:`);
ogPngs.forEach((w) => console.log('  public/static/' + w));
