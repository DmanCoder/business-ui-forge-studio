// ---------------------------------------------------------------------------
// UI Forge Studio — static asset generator
//
// Renders every original SVG asset from the shared primitives in asset-lib.mjs
// so the whole set is ONE visual family and fully reproducible:
//   node scripts/generate-static-assets.mjs
//
// Everything emitted is STATIC. No animation of any kind. See the no-animation
// mandate and docs/UI-FORGE-ASSET-SYSTEM.md.
// ---------------------------------------------------------------------------

import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';
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
  browserChrome,
  columns,
  ruler,
  textLines,
  pill,
} from './asset-lib.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = (p) => resolve(ROOT, 'public/static', p);
const written = [];
function emit(path, markup) {
  writeFileSync(OUT(path), markup);
  written.push(path);
}

// --- small shared sub-components ------------------------------------------

/** A design-system "specimen" type-scale row: mono label + serif/sans glyph. */
function scaleRow(x, y, tag, glyph, { font = F.serif, size = 34 } = {}) {
  return [
    label(x, y, tag, { size: 12, fill: P.mutedDark }),
    text(x + 150, y + size * 0.34, glyph, { font, size, fill: P.ink }),
  ].join('\n');
}

/** A colour swatch with a small hex caption. */
function swatch(x, y, s, fill, hex, { stroke } = {}) {
  return [
    rect(x, y, s, s, fill, stroke ? { stroke, sw: 1.5, r: 3 } : { r: 3 }),
    label(x, y + s + 16, hex, { size: 11, fill: P.mutedDark }),
  ].join('\n');
}

/** A simplified desktop UI inside a browser frame. */
function desktopUnit(x, y, w, h, accent = P.blue) {
  const chromeH = Math.max(22, h * 0.08);
  const bx = x + 18;
  return [
    rect(x, y, w, h, P.white, { stroke: P.edge, sw: 2 }),
    browserChrome(x, y, w, { h: chromeH, dot: P.edge }),
    // nav
    rect(bx, y + chromeH + 18, w * 0.18, 8, P.ink, { r: 4 }),
    rect(x + w - 18 - w * 0.14, y + chromeH + 16, w * 0.14, 14, accent, { r: 7 }),
    // hero headline + copy
    rect(bx, y + chromeH + 52, w * 0.5, 14, P.ink, { r: 4 }),
    rect(bx, y + chromeH + 74, w * 0.38, 8, P.mutedDark, { r: 4 }),
    // image panel
    rect(x + w * 0.52, y + chromeH + 46, w * 0.42, h * 0.42, P.blueWash, { r: 4 }),
    // three cards
    rect(bx, y + h - h * 0.3, w * 0.26, h * 0.22, P.paper, { stroke: P.line, sw: 1.5, r: 3 }),
    rect(bx + w * 0.3, y + h - h * 0.3, w * 0.26, h * 0.22, P.paper, { stroke: P.line, sw: 1.5, r: 3 }),
    rect(bx + w * 0.6, y + h - h * 0.3, w * 0.26, h * 0.22, P.paper, { stroke: P.line, sw: 1.5, r: 3 }),
  ].join('\n');
}

/** A simplified phone frame with a mobile UI. */
function phoneUnit(x, y, w, h, accent = P.blue) {
  const r = 22;
  const bx = x + 16;
  const bw = w - 32;
  return [
    rect(x, y, w, h, P.white, { stroke: P.edge, sw: 2, r }),
    rect(x + w / 2 - 26, y + 12, 52, 8, P.line, { r: 4 }), // notch
    rect(bx, y + 34, bw * 0.5, 8, P.ink, { r: 4 }),
    rect(x + w - 16 - 24, y + 32, 24, 12, accent, { r: 6 }),
    rect(bx, y + 62, bw, h * 0.26, P.blueWash, { r: 4 }),
    rect(bx, y + h * 0.44, bw * 0.7, 9, P.ink, { r: 4 }),
    rect(bx, y + h * 0.44 + 20, bw, 7, P.mutedDark, { r: 4 }),
    rect(bx, y + h * 0.44 + 36, bw * 0.85, 7, P.mutedDark, { r: 4 }),
    // bottom tab bar
    line(x, y + h - 40, x + w, y + h - 40, P.line, 1.5),
    circle(x + w * 0.25, y + h - 20, 5, accent),
    circle(x + w * 0.5, y + h - 20, 5, P.edge),
    circle(x + w * 0.75, y + h - 20, 5, P.edge),
  ].join('\n');
}

/** A labelled flow node (box + centred mono label). */
function node(x, y, w, h, str, { fill = P.white, stroke = P.ink, accent = false, textFill } = {}) {
  const tc = textFill || (accent ? P.blueDeep : P.ink);
  return [
    rect(x, y, w, h, fill, { stroke: accent ? P.blue : stroke, sw: 2, r: 6 }),
    text(x + w / 2, y + h / 2 + 4, str, { font: F.mono, size: 13, fill: tc, anchor: 'middle', ls: 0.5 }),
  ].join('\n');
}

/** A horizontal connector with a small arrowhead. */
function connector(x1, y, x2, { stroke = P.edge } = {}) {
  return [
    line(x1, y, x2 - 8, y, stroke, 2),
    `  <path d="M${x2 - 10} ${y - 5} L${x2} ${y} L${x2 - 10} ${y + 5}" fill="none" stroke="${stroke}" stroke-width="2"/>`,
  ].join('\n');
}

// --- 1. HOMEPAGE SIGNATURE VISUAL -----------------------------------------
// "One system — design and development." A browser-framed design canvas and a
// build/specimen card, joined by the forge-spark. Not a dashboard; no code
// wallpaper. Supports (never replaces) the typographic hero.

function homepageSignature() {
  const W = 1600;
  const H = 1000;
  const parts = [rect(0, 0, W, H, P.paper)];

  // blueprint frame + ruler
  parts.push(registration(60, 60, 1480, 880, { code: 'UIF · 001', tag: 'ONE SYSTEM' }));
  parts.push(ruler(120, 132, 900, { step: 44 }));

  // --- design canvas (browser) ---
  const bx = 120;
  const by = 190;
  const bw = 900;
  const bh = 620;
  const chromeH = 44;
  parts.push(rect(bx, by, bw, bh, P.white, { stroke: P.edge, sw: 2 }));
  parts.push(browserChrome(bx, by, bw, { h: chromeH }));
  const cTop = by + chromeH;
  const padX = bx + 52;
  // faint modular grid
  parts.push(columns(padX, cTop + 40, bw - 104, bh - chromeH - 80, 12, P.line, 1));
  parts.push(label(padX, cTop + 40, 'DESIGN', { fill: P.blue, size: 14 }));
  // serif headline specimen (real editorial glyphs)
  parts.push(text(padX, cTop + 132, 'Design,', { font: F.serif, size: 76, fill: P.ink }));
  parts.push(text(padX, cTop + 214, 'engineered.', { font: F.serif, size: 76, fill: P.ink }));
  parts.push(textLines(padX, cTop + 250, [430, 360], { gap: 22, fill: P.mutedDark }));
  parts.push(pill(padX, cTop + 314, 196, 50));
  parts.push(pill(padX + 220, cTop + 314, 176, 50, { primary: false }));
  // component row (page structure)
  const cardY = cTop + 404;
  for (let i = 0; i < 3; i++) {
    const cx = padX + i * 258;
    parts.push(rect(cx, cardY, 232, 132, P.paper, { stroke: P.line, sw: 1.5, r: 4 }));
    parts.push(forgeSpark(cx + 30, cardY + 34, 11, P.blue));
    parts.push(rect(cx + 20, cardY + 66, 150, 10, P.ink, { r: 5 }));
    parts.push(rect(cx + 20, cardY + 88, 180, 7, P.mutedDark, { r: 4 }));
    parts.push(rect(cx + 20, cardY + 104, 140, 7, P.mutedDark, { r: 4 }));
  }

  // --- forge-spark seam ---
  parts.push(circle(1020, 500, 44, P.paper, { stroke: P.line, sw: 2 }));
  parts.push(forgeSpark(1020, 500, 22, P.blue));

  // --- build / specimen card ---
  const sx = 1064;
  const sy = 210;
  const sw = 452;
  const sh = 600;
  parts.push(rect(sx + 10, sy + 10, sw, sh, P.line)); // offset backing plate (static depth, no shadow)
  parts.push(rect(sx, sy, sw, sh, P.white, { stroke: P.edge, sw: 2 }));
  const spx = sx + 40;
  parts.push(label(spx, sy + 46, 'BUILD · SPECIMEN', { fill: P.ink, size: 14 }));
  parts.push(forgeSpark(sx + sw - 40, sy + 40, 10, P.blue));
  parts.push(line(spx, sy + 66, sx + sw - 40, sy + 66, P.line, 1.5));
  // type scale
  let ry = sy + 120;
  parts.push(scaleRow(spx, ry, 'DISPLAY / SERIF', 'Ag', { font: F.serif, size: 44 }));
  ry += 78;
  parts.push(scaleRow(spx, ry, 'HEADING / SANS', 'Ag', { font: F.sans, size: 30 }));
  ry += 66;
  parts.push(scaleRow(spx, ry, 'MONO / CODE', 'Ag', { font: F.mono, size: 22 }));
  ry += 52;
  parts.push(line(spx, ry, sx + sw - 40, ry, P.line, 1.5));
  ry += 42;
  // colour swatches
  parts.push(swatch(spx, ry, 46, P.ink, 'INK'));
  parts.push(swatch(spx + 66, ry, 46, P.blue, 'BLUE'));
  parts.push(swatch(spx + 132, ry, 46, P.blueBright, 'BRIGHT'));
  parts.push(swatch(spx + 198, ry, 46, P.paper, 'PAPER', { stroke: P.edge }));
  parts.push(swatch(spx + 264, ry, 46, P.line, 'LINE'));
  ry += 92;
  parts.push(line(spx, ry, sx + sw - 40, ry, P.line, 1.5));
  ry += 34;
  // token rows (structured, not random code)
  const tokens = [
    ['color.blue', '#1e6fff'],
    ['radius.pill', '999px'],
    ['rule.hairline', '1px'],
  ];
  tokens.forEach((t, i) => {
    parts.push(text(spx, ry + i * 30, t[0], { font: F.mono, size: 15, fill: P.muted }));
    parts.push(text(sx + sw - 40, ry + i * 30, t[1], { font: F.mono, size: 15, fill: P.ink, anchor: 'end' }));
  });

  // --- caption strip ---
  parts.push(line(120, 892, 1520, 892, P.line, 1.5));
  parts.push(label(120, 918, 'DESIGN PRECISION', { size: 14, fill: P.muted }));
  parts.push(label(820, 918, 'TECHNICAL IMPLEMENTATION', { size: 14, fill: P.muted, anchor: 'middle' }));
  parts.push(label(1520, 918, 'CRAFTED OUTCOMES', { size: 14, fill: P.muted, anchor: 'end' }));

  return svg({
    w: W,
    h: H,
    title:
      'UI Forge Studio signature composition: a browser-framed design canvas with an editorial serif headline and modular grid, joined by the forge-spark motif to a build specimen card showing the type scale, colour palette and design tokens — design precision and technical implementation as one system.',
    children: parts.join('\n'),
  });
}

// --- 2. SERVICES VISUAL SYSTEM --------------------------------------------
// Six variants on ONE canvas: shared header + a service-specific diagram that
// each communicates something concrete.

const SVC_W = 1200;
const SVC_H = 750;

function serviceHeader(parts, index, title, descriptor) {
  parts.push(rect(0, 0, SVC_W, SVC_H, P.paper));
  parts.push(registration(48, 48, SVC_W - 96, SVC_H - 96, { code: `S / ${index}`, tag: 'SERVICE SYSTEM' }));
  parts.push(label(88, 116, `SERVICE / ${index}`, { fill: P.blue, size: 14 }));
  parts.push(text(88, 172, title, { font: F.serif, size: 46, fill: P.ink }));
  parts.push(label(88, 208, descriptor, { fill: P.muted, size: 14 }));
  parts.push(forgeSpark(SVC_W - 92, 108, 14, P.blue));
  parts.push(line(88, 236, SVC_W - 88, 236, P.line, 1.5));
}

// zone: x 88..1112 (w 1024), y 272..662 (h 390)
function svcWebsites() {
  const parts = [];
  serviceHeader(parts, '01', 'Websites', 'PAGE HIERARCHY · RESPONSIVE ARCHITECTURE');
  // desktop + mobile side by side
  parts.push(desktopUnit(120, 300, 560, 340, P.blue));
  parts.push(phoneUnit(720, 320, 150, 300, P.blue));
  // hierarchy tree on the right
  const tx = 920;
  parts.push(node(tx, 300, 160, 40, 'HOME', { accent: true }));
  const kids = ['WORK', 'SERVICES', 'INSIGHTS'];
  kids.forEach((k, i) => {
    const ky = 380 + i * 66;
    parts.push(line(tx + 20, 340, tx + 20, ky + 20, P.edge, 2));
    parts.push(line(tx + 20, ky + 20, tx + 40, ky + 20, P.edge, 2));
    parts.push(node(tx + 40, ky, 140, 40, k));
  });
  // breakpoints ruler
  parts.push(label(120, 672, '375', { size: 12, fill: P.mutedDark }));
  parts.push(label(400, 672, '768', { size: 12, fill: P.mutedDark, anchor: 'middle' }));
  parts.push(label(680, 672, '1440  BREAKPOINTS', { size: 12, fill: P.mutedDark, anchor: 'end' }));
  return svg({
    w: SVC_W,
    h: SVC_H,
    title:
      'Websites service diagram: a desktop browser layout and a mobile layout beside a page-hierarchy tree branching from Home to Work, Services and Insights, with responsive breakpoint markers.',
    children: parts.join('\n'),
  });
}

function svcLanding() {
  const parts = [];
  serviceHeader(parts, '02', 'Landing pages and campaigns', 'CAMPAIGN STRUCTURE · CONVERSION PATH');
  // single landing frame with labelled zones
  const lx = 120;
  const ly = 300;
  const lw = 420;
  const lh = 350;
  parts.push(rect(lx, ly, lw, lh, P.white, { stroke: P.edge, sw: 2 }));
  browserChromeInto(parts, lx, ly, lw);
  const zones = [
    ['HERO + PROMISE', 0.14, 0.2, P.blueWash],
    ['SOCIAL PROOF', 0.36, 0.14, P.paper],
    ['OFFER', 0.52, 0.14, P.paper],
    ['CALL TO ACTION', 0.68, 0.18, P.blue],
  ];
  zones.forEach(([t, top, hh, fill]) => {
    const zy = ly + lh * top;
    const zh = lh * hh;
    parts.push(rect(lx + 18, zy, lw - 36, zh - 10, fill, { stroke: P.line, sw: 1.5, r: 3 }));
    parts.push(label(lx + 32, zy + zh / 2, t, { size: 12, fill: fill === P.blue ? P.white : P.muted }));
  });
  // conversion path funnel to the right
  const fx = 660;
  parts.push(node(fx, 320, 170, 44, 'CAMPAIGN', { accent: true }));
  parts.push(connectorV(parts, fx + 85, 364, 408));
  parts.push(node(fx, 408, 170, 44, 'LANDING'));
  parts.push(connectorV(parts, fx + 85, 452, 496));
  parts.push(node(fx, 496, 170, 44, 'CONVERT', { accent: true }));
  // narrowing funnel graphic
  parts.push(
    `  <path d="M900 320 H1090 L1030 470 H960 Z" fill="none" stroke="${P.edge}" stroke-width="2"/>`
  );
  parts.push(label(915, 350, 'REACH', { size: 12, fill: P.mutedDark }));
  parts.push(label(975, 455, 'ACTION', { size: 12, fill: P.mutedDark }));
  return svg({
    w: SVC_W,
    h: SVC_H,
    title:
      'Landing pages and campaigns diagram: a single landing page with hero, social-proof, offer and call-to-action zones, alongside a campaign-to-conversion path and a narrowing reach-to-action funnel.',
    children: parts.join('\n'),
  });
}

function svcEcommerce() {
  const parts = [];
  serviceHeader(parts, '03', 'E-commerce', 'PRODUCT · CART · CHECKOUT SYSTEM');
  const y = 320;
  const w = 300;
  const h = 300;
  const gap = 62;
  const xs = [120, 120 + w + gap, 120 + 2 * (w + gap)];
  // product
  parts.push(rect(xs[0], y, w, h, P.white, { stroke: P.edge, sw: 2 }));
  browserChromeInto(parts, xs[0], y, w);
  parts.push(rect(xs[0] + 24, y + 50, w - 48, 120, P.blueWash, { r: 4 }));
  parts.push(rect(xs[0] + 24, y + 184, 150, 10, P.ink, { r: 5 }));
  parts.push(rect(xs[0] + 24, y + 204, 90, 8, P.mutedDark, { r: 4 }));
  parts.push(rect(xs[0] + 24, y + h - 56, 120, 34, P.blue, { r: 17 }));
  parts.push(label(xs[0] + 24, y - 12, 'PRODUCT', { size: 12, fill: P.muted }));
  // cart
  parts.push(rect(xs[1], y, w, h, P.white, { stroke: P.edge, sw: 2 }));
  browserChromeInto(parts, xs[1], y, w);
  for (let i = 0; i < 3; i++) {
    parts.push(rect(xs[1] + 24, y + 50 + i * 50, 44, 44, P.blueWash, { r: 4 }));
    parts.push(rect(xs[1] + 80, y + 62 + i * 50, 130, 8, P.ink, { r: 4 }));
    parts.push(rect(xs[1] + 80, y + 78 + i * 50, 70, 7, P.mutedDark, { r: 4 }));
  }
  parts.push(line(xs[1] + 24, y + 214, xs[1] + w - 24, y + 214, P.line, 1.5));
  parts.push(rect(xs[1] + 24, y + h - 56, w - 48, 34, P.blue, { r: 17 }));
  parts.push(label(xs[1] + 24, y - 12, 'CART', { size: 12, fill: P.muted }));
  // checkout
  parts.push(rect(xs[2], y, w, h, P.white, { stroke: P.edge, sw: 2 }));
  browserChromeInto(parts, xs[2], y, w);
  for (let i = 0; i < 4; i++) {
    parts.push(rect(xs[2] + 24, y + 52 + i * 44, w - 48, 30, P.paper, { stroke: P.line, sw: 1.5, r: 4 }));
  }
  parts.push(rect(xs[2] + 24, y + h - 56, w - 48, 34, P.blue, { r: 17 }));
  parts.push(label(xs[2] + 24, y - 12, 'CHECKOUT', { size: 12, fill: P.muted }));
  // connectors
  parts.push(connectorInto(parts, xs[0] + w, y + h / 2, xs[1]));
  parts.push(connectorInto(parts, xs[1] + w, y + h / 2, xs[2]));
  return svg({
    w: SVC_W,
    h: SVC_H,
    title:
      'E-commerce diagram: three linked storefront screens — a product page, a cart with line items and a checkout form — connected left to right as one purchase system.',
    children: parts.join('\n'),
  });
}

function svcProducts() {
  const parts = [];
  serviceHeader(parts, '04', 'Digital products', 'APPLICATION SHELL · WORKFLOW');
  // app shell
  const ax = 120;
  const ay = 300;
  const aw = 560;
  const ah = 340;
  parts.push(rect(ax, ay, aw, ah, P.white, { stroke: P.edge, sw: 2 }));
  parts.push(rect(ax, ay, 130, ah, P.paper, { stroke: P.line, sw: 1.5 })); // sidebar
  parts.push(rect(ax, ay, aw, 40, P.paper, { stroke: P.line, sw: 1.5 })); // topbar
  parts.push(forgeSpark(ax + 24, ay + 20, 8, P.blue));
  for (let i = 0; i < 5; i++) parts.push(rect(ax + 20, ay + 64 + i * 34, 90, 9, i === 1 ? P.blue : P.line, { r: 4 }));
  // content: workflow nodes
  const wx = ax + 160;
  const wy = ay + 80;
  parts.push(node(wx, wy, 110, 40, 'DRAFT', { accent: true }));
  parts.push(connectorInto(parts, wx + 110, wy + 20, wx + 160));
  parts.push(node(wx + 160, wy, 110, 40, 'REVIEW'));
  parts.push(connectorInto(parts, wx + 270, wy + 20, wx + 320));
  parts.push(node(wx + 320, wy, 110, 40, 'SHIP'));
  parts.push(rect(wx, wy + 80, 370, 12, P.line, { r: 6 }));
  parts.push(rect(wx, wy + 108, 300, 8, P.mutedDark, { r: 4 }));
  parts.push(rect(wx, wy + 128, 340, 8, P.mutedDark, { r: 4 }));
  // component chip panel
  const px = 720;
  parts.push(label(px, 300, 'COMPONENTS', { size: 12, fill: P.muted }));
  const comps = ['Button', 'Field', 'Table', 'Modal', 'Nav', 'Card'];
  comps.forEach((c, i) => {
    const cx = px + (i % 2) * 180;
    const cy = 320 + Math.floor(i / 2) * 100;
    parts.push(rect(cx, cy, 160, 80, P.paper, { stroke: P.line, sw: 1.5, r: 4 }));
    parts.push(forgeSpark(cx + 22, cy + 26, 7, P.blueBright));
    parts.push(text(cx + 40, cy + 32, c, { font: F.mono, size: 14, fill: P.ink }));
    parts.push(rect(cx + 18, cy + 50, 110, 7, P.mutedDark, { r: 4 }));
  });
  return svg({
    w: SVC_W,
    h: SVC_H,
    title:
      'Digital products diagram: an application shell with a sidebar and top bar containing a Draft to Review to Ship workflow, beside a component library panel of reusable interface pieces.',
    children: parts.join('\n'),
  });
}

function svcMobile() {
  const parts = [];
  serviceHeader(parts, '05', 'Mobile applications', 'MOBILE INTERFACE SYSTEM');
  // three phones: nav, list, detail
  const specs = [
    [180, 'NAV'],
    [470, 'LIST'],
    [760, 'DETAIL'],
  ];
  specs.forEach(([x, tag], i) => {
    parts.push(phoneUnit(x, 300, 190, 330, i === 1 ? P.blue : P.blue));
    parts.push(label(x, 662, tag, { size: 12, fill: P.muted }));
  });
  // component chip
  parts.push(rect(1000, 300, 112, 330, P.paper, { stroke: P.line, sw: 1.5, r: 6 }));
  parts.push(label(1018, 328, 'KIT', { size: 12, fill: P.muted }));
  for (let i = 0; i < 4; i++) {
    parts.push(rect(1018, 348 + i * 66, 76, 44, P.white, { stroke: P.line, sw: 1.5, r: 4 }));
    parts.push(forgeSpark(1036, 370 + i * 66, 6, P.blueBright));
  }
  return svg({
    w: SVC_W,
    h: SVC_H,
    title:
      'Mobile applications diagram: three phone screens showing a navigation view, a list view and a detail view as one mobile interface system, beside a compact component kit.',
    children: parts.join('\n'),
  });
}

function svcCare() {
  const parts = [];
  serviceHeader(parts, '06', 'Ongoing care', 'MONITORING · RELEASES · MAINTENANCE · SUPPORT');
  // status board (no fabricated metrics — structural only)
  const bx = 120;
  const by = 300;
  parts.push(rect(bx, by, 500, 200, P.white, { stroke: P.edge, sw: 2, r: 4 }));
  parts.push(label(bx + 24, by + 34, 'STATUS', { size: 12, fill: P.muted }));
  const checks = ['Uptime', 'Backups', 'Dependencies', 'Security'];
  checks.forEach((c, i) => {
    const cy = by + 60 + i * 32;
    parts.push(circle(bx + 32, cy, 7, P.success ?? '#037e70'));
    parts.push(circle(bx + 32, cy, 7, '#037e70'));
    parts.push(text(bx + 52, cy + 5, c, { font: F.mono, size: 14, fill: P.ink }));
    parts.push(text(bx + 476, cy + 5, 'OK', { font: F.mono, size: 13, fill: '#037e70', anchor: 'end' }));
  });
  // release timeline (ticks, no numbers)
  const ty = by + 250;
  parts.push(label(bx, ty - 16, 'RELEASE TIMELINE', { size: 12, fill: P.muted }));
  parts.push(line(bx, ty, bx + 500, ty, P.edge, 2));
  for (let i = 0; i <= 6; i++) {
    const x = bx + (i * 500) / 6;
    parts.push(line(x, ty - 8, x, ty + 8, P.edge, 2));
    if (i % 2 === 0) parts.push(circle(x, ty, 6, P.blue));
  }
  // maintenance / support panel
  const mx = 700;
  parts.push(rect(mx, by, 412, 300, P.paper, { stroke: P.line, sw: 1.5, r: 4 }));
  parts.push(label(mx + 24, by + 34, 'MAINTENANCE & SUPPORT', { size: 12, fill: P.muted }));
  const rows = ['Content updates', 'Feature iterations', 'Performance care', 'Priority support'];
  rows.forEach((r, i) => {
    const ry = by + 66 + i * 52;
    parts.push(forgeSpark(mx + 30, ry, 8, P.blue));
    parts.push(text(mx + 52, ry + 5, r, { font: F.sans, size: 16, fill: P.ink }));
    parts.push(line(mx + 24, ry + 26, mx + 388, ry + 26, P.line, 1));
  });
  return svg({
    w: SVC_W,
    h: SVC_H,
    title:
      'Ongoing care diagram: a status board listing uptime, backups, dependencies and security as healthy checks, a release timeline of maintenance ticks, and a maintenance and support list — monitoring and care shown without any fabricated metrics.',
    children: parts.join('\n'),
  });
}

// helpers that push into a parts array and also return the last string (for
// inline use inside node/connector calls above)
function browserChromeInto(parts, x, y, w) {
  parts.push(browserChrome(x, y, w, { h: 30 }));
}
function connectorInto(parts, x1, y, x2) {
  const s = connector(x1, y, x2);
  parts.push(s);
  return '';
}
function connectorV(parts, x, y1, y2) {
  parts.push(line(x, y1, x, y2 - 8, P.edge, 2));
  parts.push(`  <path d="M${x - 5} ${y2 - 10} L${x} ${y2} L${x + 5} ${y2 - 10}" fill="none" stroke="${P.edge}" stroke-width="2"/>`);
  return '';
}

// --- 3. PROCESS MAP -------------------------------------------------------
// One supporting schematic for the seven-phase process page (not one image
// per phase). Design → development → care read as a single accountable line.

function processMap() {
  const W = 1600;
  const H = 680;
  const parts = [rect(0, 0, W, H, P.paper)];
  parts.push(registration(60, 48, W - 120, H - 96, { code: 'P / 01–07', tag: 'PROCESS MAP' }));
  parts.push(label(100, 112, 'PROCESS / DESIGN → DEVELOPMENT → CARE', { fill: P.blue, size: 14 }));
  parts.push(text(100, 168, 'How a project moves', { font: F.serif, size: 42, fill: P.ink }));
  parts.push(line(100, 200, W - 100, 200, P.line, 1.5));

  const phases = [
    ['01', 'Discover', 'Goals & scope'],
    ['02', 'Define', 'Plan & structure'],
    ['03', 'Design', 'Interface & system'],
    ['04', 'Build', 'Engineering'],
    ['05', 'Test', 'Quality & review'],
    ['06', 'Launch', 'Go live'],
    ['07', 'Support', 'Care & iterate'],
  ];
  const startX = 120;
  const colW = 195;
  const spineY = 452;
  const dotX = (i) => startX + i * colW + 30;

  const bracket = (i1, i2, y, str) => {
    const x1 = startX + i1 * colW + 20;
    const x2 = startX + i2 * colW + 120;
    return [
      line(x1, y, x2, y, P.edge, 1.5),
      line(x1, y, x1, y + 10, P.edge, 1.5),
      line(x2, y, x2, y + 10, P.edge, 1.5),
      label((x1 + x2) / 2, y - 8, str, { fill: P.muted, size: 12, anchor: 'middle' }),
    ].join('\n');
  };
  parts.push(bracket(0, 2, 268, 'DESIGN'));
  parts.push(bracket(3, 5, 268, 'DEVELOPMENT'));
  parts.push(bracket(6, 6, 268, 'CARE'));

  parts.push(line(dotX(0), spineY, dotX(6), spineY, P.edge, 2));
  phases.forEach(([n, name, deliver], i) => {
    const x = startX + i * colW;
    parts.push(text(x, 350, n, { font: F.serif, size: 52, fill: i < 3 ? P.blue : P.ink }));
    parts.push(line(dotX(i), 372, dotX(i), spineY, P.line, 1.5));
    parts.push(circle(dotX(i), spineY, 7, P.blue));
    parts.push(text(x, spineY + 52, name, { font: F.serif, size: 24, fill: P.ink }));
    parts.push(label(x, spineY + 80, deliver, { fill: P.muted, size: 12 }));
  });
  parts.push(forgeSpark(W - 96, 104, 14, P.blue));
  return svg({
    w: W,
    h: H,
    title:
      'UI Forge Studio process map: seven numbered phases — Discover, Define, Design, Build, Test, Launch and Support — along one connected line, grouped into design, development and care.',
    children: parts.join('\n'),
  });
}

// --- 4. ABOUT — STUDIO ARTEFACTS ------------------------------------------
// An honest founder-led composition built from studio artefacts (site frame,
// type specimen, grid, build tokens) — never a fabricated portrait, team or
// office. Portrait 4:5 for the founder's-note column.

function aboutArtefacts() {
  const W = 1080;
  const H = 1350;
  const parts = [rect(0, 0, W, H, P.paper)];
  parts.push(registration(48, 48, W - 96, H - 96)); // corners only — bottom caption sits below
  parts.push(label(96, 118, 'STUDIO ARTEFACTS', { fill: P.blue, size: 14 }));
  parts.push(text(96, 168, 'The work,', { font: F.serif, size: 46, fill: P.ink }));
  parts.push(text(96, 220, 'not a photo.', { font: F.serif, size: 46, fill: P.ink }));

  // artefact A — site frame
  parts.push(rect(96, 280, 620, 300, P.white, { stroke: P.edge, sw: 2 }));
  parts.push(browserChrome(96, 280, 620, { h: 34 }));
  parts.push(rect(128, 348, 300, 16, P.ink, { r: 5 }));
  parts.push(rect(128, 378, 220, 9, P.mutedDark, { r: 4 }));
  parts.push(rect(430, 340, 254, 180, P.blueWash, { r: 4 }));
  parts.push(rect(128, 500, 130, 30, P.blue, { r: 15 }));
  parts.push(label(96, 268, 'THE SITE', { fill: P.muted, size: 12 }));

  // artefact B — type specimen (overlapping right)
  parts.push(rect(560, 470, 424, 300, P.white, { stroke: P.edge, sw: 2 }));
  parts.push(label(592, 512, 'TYPE', { fill: P.muted, size: 12 }));
  parts.push(text(592, 610, 'Aa', { font: F.serif, size: 96, fill: P.ink }));
  parts.push(line(592, 650, 952, 650, P.line, 1.5));
  parts.push(text(592, 700, 'Instrument Serif', { font: F.serif, size: 22, fill: P.muted }));
  parts.push(text(592, 736, 'Instrument Sans', { font: F.sans, size: 18, fill: P.muted }));

  // artefact C — grid / spacing specimen
  parts.push(rect(96, 620, 420, 300, P.white, { stroke: P.edge, sw: 2 }));
  parts.push(label(128, 662, 'GRID', { fill: P.muted, size: 12 }));
  parts.push(columns(128, 690, 356, 180, 6, P.line, 1));
  for (let i = 0; i < 4; i++) parts.push(rect(128, 700 + i * 44, 356 - (i % 2) * 90, 20, i === 0 ? P.blueWash : P.paper, { stroke: P.line, sw: 1.5, r: 3 }));

  // artefact D — build tokens
  parts.push(rect(96, 960, 888, 300, P.white, { stroke: P.edge, sw: 2 }));
  parts.push(label(128, 1002, 'BUILD', { fill: P.muted, size: 12 }));
  parts.push(forgeSpark(W - 128, 1002, 10, P.blue));
  const toks = [
    ['export const', 'brand', '= { blue: "#1e6fff" }'],
    ['grid', '.columns', '= 12'],
    ['radius', '.pill', '= 999'],
    ['motion', '', '= none'],
  ];
  toks.forEach((t, i) => {
    const y = 1058 + i * 44;
    parts.push(text(128, y, t[0], { font: F.mono, size: 17, fill: P.blueDeep }));
    parts.push(text(128 + 190, y, t[1], { font: F.mono, size: 17, fill: P.ink }));
    parts.push(text(128 + 320, y, t[2], { font: F.mono, size: 17, fill: P.muted }));
  });
  parts.push(line(96, 1290, W - 96, 1290, P.line, 1.5));
  parts.push(label(96, 1318, 'FOUNDER-LED PRACTICE · NO STOCK PORTRAITS', { fill: P.muted, size: 13 }));
  return svg({
    w: W,
    h: H,
    title:
      'UI Forge Studio about composition: overlapping studio artefacts — a website frame, a type specimen, a modular grid and a panel of build tokens — standing in for the founder-led practice instead of a stock portrait.',
    children: parts.join('\n'),
  });
}

// --- 5. INSIGHTS COVER FAMILY ---------------------------------------------
// One shared editorial family; each article gets a distinct diagram. Two
// crops per article: Open Graph (1200x630) and a 3:2 listing cover.

function brandMark(x, y, { onDark = false } = {}) {
  return [
    forgeSpark(x + 8, y, 9, P.blue),
    text(x + 26, y + 5, 'UI FORGE STUDIO', { font: F.mono, size: 14, fill: onDark ? P.white : P.ink, ls: 2 }),
  ].join('\n');
}

// -- diagrams (compact, ~210px tall so they fit the 1200x630 OG crop too) --
function costDiagram(x, y, w) {
  const parts = [label(x, y, 'SCOPE DRIVES COST', { fill: P.muted, size: 12 })];
  const rows = [
    ['Pages & templates', 0.42],
    ['Features & logic', 0.66],
    ['Content & migration', 0.54],
    ['Integrations', 0.82],
  ];
  const barX = x + 210;
  const barW = w - 300;
  rows.forEach(([name, frac], i) => {
    const ry = y + 26 + i * 42;
    parts.push(text(x, ry + 15, name, { font: F.sans, size: 16, fill: P.ink }));
    parts.push(rect(barX, ry, barW, 20, P.line, { r: 10 }));
    parts.push(rect(barX, ry, barW * frac, 20, i === 3 ? P.blue : P.blueSoft, { r: 10 }));
  });
  const ay = y + 26 + 4 * 42 + 6;
  parts.push(line(barX, ay, barX + barW, ay, P.edge, 2));
  parts.push(label(barX, ay + 22, 'LOWER', { fill: P.mutedDark, size: 11 }));
  parts.push(label(barX + barW, ay + 22, 'HIGHER', { fill: P.mutedDark, size: 11, anchor: 'end' }));
  parts.push(circle(barX + barW * 0.7, ay, 6, P.blue));
  return parts.join('\n');
}

function ownershipDiagram(x, y, w) {
  const parts = [label(x, y, 'THE LAYERS YOU OWN', { fill: P.muted, size: 12 })];
  const layers = [
    ['Domain', 'your name'],
    ['Hosting', 'where it runs'],
    ['Code', 'the build'],
    ['Content', 'your words'],
  ];
  const sh = 42;
  layers.forEach(([name, note], i) => {
    const ly = y + 20 + i * (sh + 8);
    const accent = i === 0;
    parts.push(rect(x, ly, w, sh, accent ? P.blueWash : P.white, { stroke: accent ? P.blue : P.edge, sw: 2, r: 4 }));
    parts.push(forgeSpark(x + 28, ly + sh / 2, 8, accent ? P.blueDeep : P.edge));
    parts.push(text(x + 52, ly + sh / 2 + 6, name, { font: F.serif, size: 20, fill: P.ink }));
    parts.push(text(x + w - 20, ly + sh / 2 + 5, note, { font: F.mono, size: 13, fill: P.muted, anchor: 'end' }));
  });
  return parts.join('\n');
}

function platformDiagram(x, y, w) {
  const parts = [label(x, y, 'THREE ARCHITECTURES', { fill: P.muted, size: 12 })];
  const cols = [
    ['Custom', ['Next.js front-end', 'Headless CMS', 'Managed hosting'], true],
    ['WordPress', ['Theme', 'WP admin', 'PHP hosting'], false],
    ['Webflow', ['Visual canvas', 'Webflow CMS', 'Webflow cloud'], false],
  ];
  const gap = 28;
  const cw = (w - 2 * gap) / 3;
  cols.forEach(([name, slabs, accent], c) => {
    const cx = x + c * (cw + gap);
    parts.push(rect(cx, y + 20, cw, 38, accent ? P.blue : P.paper, { stroke: accent ? P.blue : P.edge, sw: 2, r: 4 }));
    parts.push(text(cx + cw / 2, y + 45, name, { font: F.serif, size: 20, fill: accent ? P.white : P.ink, anchor: 'middle' }));
    slabs.forEach((s, i) => {
      const sy = y + 66 + i * 44;
      parts.push(rect(cx, sy, cw, 36, P.white, { stroke: P.line, sw: 1.5, r: 4 }));
      parts.push(text(cx + cw / 2, sy + 23, s, { font: F.mono, size: 12, fill: P.muted, anchor: 'middle' }));
    });
  });
  return parts.join('\n');
}

function insightCover(W, H, { category, titleLines, diagram }) {
  const parts = [rect(0, 0, W, H, P.paper)];
  parts.push(registration(40, 40, W - 80, H - 80)); // corner marks only — no bottom code to clash with footer
  parts.push(brandMark(64, 92));
  parts.push(forgeSpark(W - 72, 100, 12, P.blue));
  parts.push(label(64, 158, `INSIGHT · ${category.toUpperCase()}`, { fill: P.blue, size: 13 }));
  const tSize = H > 700 ? 54 : 44;
  const tGap = tSize + 8;
  titleLines.forEach((l, i) => parts.push(text(64, 206 + i * tGap, l, { font: F.serif, size: tSize, fill: P.ink })));
  const titleBottom = 206 + (titleLines.length - 1) * tGap + 24;
  parts.push(line(64, titleBottom, W - 64, titleBottom, P.line, 1.5));
  parts.push(diagram(64, titleBottom + 40, W - 128));
  parts.push(label(64, H - 40, 'uiforge.studio', { fill: P.muted, size: 12 }));
  parts.push(label(W - 64, H - 40, 'ORIGINAL EDITORIAL ARTWORK', { fill: P.mutedDark, size: 11, anchor: 'end' }));
  return svg({ w: W, h: H, title: `UI Forge Studio insight cover — ${titleLines.join(' ')}. Original editorial diagram artwork on a warm off-white stage.`, children: parts.join('\n') });
}

const INSIGHTS = [
  { key: 'website-cost', category: 'Websites', title: ['What affects the', 'cost of a website'], diagram: costDiagram, tag: 'INS / COST' },
  { key: 'ownership-hosting', category: 'Ownership', title: ['Website ownership', '& hosting explained'], diagram: ownershipDiagram, tag: 'INS / OWN' },
  { key: 'platform-comparison', category: 'Websites', title: ['Custom, WordPress', 'or Webflow'], diagram: platformDiagram, tag: 'INS / PLAT' },
];

// --- 6. START A PROJECT ---------------------------------------------------
// Restrained enquiry schematic — brief → recommendation → proposal. Must not
// compete with the form.

function startProject() {
  const W = 1000;
  const H = 760;
  const parts = [rect(0, 0, W, H, P.paper)];
  parts.push(registration(48, 48, W - 96, H - 96, { code: 'ENQUIRY', tag: 'INPUT → OUTPUT' }));
  parts.push(label(88, 120, 'HOW ENQUIRIES WORK', { fill: P.blue, size: 14 }));
  parts.push(text(88, 172, 'Brief to proposal', { font: F.serif, size: 40, fill: P.ink }));
  parts.push(line(88, 202, W - 88, 202, P.line, 1.5));
  const steps = [
    ['01', 'Brief', 'You describe the situation'],
    ['02', 'Recommendation', 'We suggest the right approach'],
    ['03', 'Proposal', 'A clear scope and price'],
  ];
  steps.forEach(([n, name, desc], i) => {
    const y = 268 + i * 148;
    parts.push(rect(88, y, W - 176, 116, P.white, { stroke: P.edge, sw: 2, r: 6 }));
    parts.push(text(128, y + 74, n, { font: F.serif, size: 44, fill: P.blue }));
    parts.push(text(228, y + 54, name, { font: F.serif, size: 26, fill: P.ink }));
    parts.push(label(228, y + 84, desc, { fill: P.muted, size: 13 }));
    parts.push(forgeSpark(W - 128, y + 58, 10, P.blue));
    if (i < 2) {
      parts.push(line(W / 2, y + 116, W / 2, y + 148 - 8, P.edge, 2));
      parts.push(`  <path d="M${W / 2 - 5} ${y + 148 - 10} L${W / 2} ${y + 148} L${W / 2 + 5} ${y + 148 - 10}" fill="none" stroke="${P.edge}" stroke-width="2"/>`);
    }
  });
  return svg({
    w: W,
    h: H,
    title:
      'Start a project schematic: a three-step enquiry model — Brief, Recommendation, Proposal — shown as one input-to-output path.',
    children: parts.join('\n'),
  });
}

// --- 7. DEMO PROJECT GALLERIES --------------------------------------------
// Original fictional interface compositions for the clearly-labelled demo
// case studies. Industry-appropriate structure, project accent, always the
// visible demo stamp. No fabricated metrics or results.

function themeOf(dark) {
  return dark
    ? { bg: '#0d1526', page: '#101a2c', stroke: '#22304a', ink: '#ffffff', muted: '#8fa3c4', card: '#16233b', wash: '#1b2942', stamp: '#8fa3c4' }
    : { bg: P.paper, page: P.white, stroke: P.edge, ink: P.ink, muted: P.mutedDark, card: P.paper, wash: '#eef1f4', stamp: '#6b675c' };
}

function demoFrame(parts, t, x, y, w, h, brand, accent) {
  parts.push(rect(x, y, w, h, t.page, { stroke: t.stroke, sw: 2 }));
  parts.push(rect(x, y, w, 44, t.bg === P.paper ? P.paper : '#0b1424', { stroke: t.stroke, sw: 2 }));
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
    for (let i = 0; i < 6; i++) parts.push(rect(x + 28, y + 160 + i * 42, 130, 12, i === 1 ? cfg.accent : t.stroke, { r: 6 }));
    const wx = x + 240;
    parts.push(text(wx, y + 190, 'Training overview', { font: F.serif, size: 30, fill: t.ink }));
    parts.push(node(wx, y + 220, 150, 44, 'PLAN', { fill: t.page, stroke: cfg.accent, accent: true }));
    parts.push(connector(wx + 150, y + 242, wx + 210, { stroke: t.stroke }));
    parts.push(node(wx + 210, y + 220, 150, 44, 'SESSION', { fill: t.page, stroke: t.muted, textFill: t.ink }));
    parts.push(connector(wx + 360, y + 242, wx + 420, { stroke: t.stroke }));
    parts.push(node(wx + 420, y + 220, 150, 44, 'REVIEW', { fill: t.page, stroke: t.muted, textFill: t.ink }));
    for (let i = 0; i < 3; i++) {
      parts.push(rect(wx, y + 320 + i * 110, 1000, 90, t.card, { stroke: t.stroke, sw: 1.5, r: 6 }));
      parts.push(rect(wx + 28, y + 348 + i * 110, 220, 12, t.ink, { r: 6 }));
      parts.push(rect(wx + 28, y + 372 + i * 110, 420, 8, t.muted, { r: 4 }));
      parts.push(rect(wx + 900, y + 348 + i * 110, 60, 34, t.wash, { r: 6 }));
    }
  } else if (kind === 'booking') {
    parts.push(text(cx, y + 200, cfg.zones[0], { font: F.serif, size: 40, fill: t.ink }));
    parts.push(rect(cx, y + 230, 560, 10, t.muted, { r: 5 }));
    // steps
    for (let i = 0; i < 3; i++) {
      parts.push(circle(cx + 20 + i * 90, y + 300, 18, i === 0 ? cfg.accent : t.card, { stroke: t.stroke, sw: 2 }));
    }
    parts.push(line(cx + 38, y + 300, cx + 200, y + 300, t.stroke, 2));
    // form panel
    parts.push(rect(cx, y + 360, 620, 380, t.card, { stroke: t.stroke, sw: 1.5, r: 6 }));
    for (let i = 0; i < 4; i++) parts.push(rect(cx + 30, y + 400 + i * 66, 560, 40, t.page, { stroke: t.stroke, sw: 1.5, r: 4 }));
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
    parts.push(text(x + 22, y + 66, cfg.brand.split(' ')[0], { font: F.serif, size: 20, fill: t.ink }));
    parts.push(rect(x + w - 60, y + 50, 40, 16, cfg.accent, { r: 8 }));
    parts.push(rect(x + 22, y + 92, w - 44, i === 1 ? 300 : 150, t.wash, { r: 6 }));
    if (i === 1) parts.push(forgeSpark(x + w / 2, y + 240, 18, cfg.accent));
    const oy = i === 1 ? y + 420 : y + 262;
    parts.push(rect(x + 22, oy, w - 80, 12, t.ink, { r: 6 }));
    parts.push(rect(x + 22, oy + 24, w - 44, 8, t.muted, { r: 4 }));
    parts.push(rect(x + 22, oy + 42, w - 60, 8, t.muted, { r: 4 }));
    parts.push(rect(x + 22, y + h - 90, w - 44, 40, cfg.accent, { r: 20 }));
    parts.push(line(x, y + h - 42, x + w, y + h - 42, t.stroke, 1.5));
    [0.25, 0.5, 0.75].forEach((f, k) => parts.push(circle(x + w * f, y + h - 22, 5, k === 0 ? cfg.accent : t.stroke)));
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
  [[cfg.accent, 'ACCENT'], [t.ink, 'INK'], [t.muted, 'MUTED'], [t.wash, 'WASH'], [t.stroke, 'LINE']].forEach(([c, n], i) => {
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
    parts.push(rect(cx + 24, yy + 60, 160, 44, i % 2 ? 'none' : cfg.accent, i % 2 ? { r: 22, stroke: cfg.accent, sw: 2 } : { r: 22 }));
    parts.push(rect(cx + 24, yy + 128, 320, 10, t.muted, { r: 5 }));
    parts.push(rect(cx + 24, yy + 152, 260, 10, t.stroke, { r: 5 }));
  });
  parts.push(forgeSpark(W - 96, 112, 14, cfg.accent));
  parts.push(demoStampT(parts, t, 48, H - 40, cfg.stamp));
  return svg({ w: W, h: H, title: cfg.altDetail, children: parts.join('\n') });
}

// demo stamp respecting theme (returns '' — pushes into parts)
function demoStampT(parts, t, x, y, color) {
  parts.push(text(x, y, 'DEMO — FICTIONAL BRAND · NOT CLIENT WORK', { font: F.sans, size: 22, fill: color, ls: 4 }));
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
emit('brand/homepage-signature.svg', homepageSignature());
emit('services/websites.svg', svcWebsites());
emit('services/landing-pages.svg', svcLanding());
emit('services/ecommerce.svg', svcEcommerce());
emit('services/digital-products.svg', svcProducts());
emit('services/mobile-apps.svg', svcMobile());
emit('services/ongoing-care.svg', svcCare());
emit('process/project-map.svg', processMap());
emit('about/studio-artefacts.svg', aboutArtefacts());
emit('brand/start-a-project.svg', startProject());
for (const ins of INSIGHTS) {
  emit(`insights/${ins.key}-og.svg`, insightCover(1200, 630, { category: ins.category, titleLines: ins.title, diagram: ins.diagram, tag: ins.tag }));
  emit(`insights/${ins.key}-cover.svg`, insightCover(1200, 800, { category: ins.category, titleLines: ins.title, diagram: ins.diagram, tag: ins.tag }));
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
