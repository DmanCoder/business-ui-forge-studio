// ---------------------------------------------------------------------------
// UI Forge Studio — insights cover art generator
//
// Draws the original editorial artwork for each insights article as pure
// geometry (no text, no photography, no third-party assets) and emits:
//   public/static/insights/art/<key>-cover.svg   1200×800  (3:2 — cards, mobile hero)
//   public/static/insights/art/<key>-wide.svg    1600×640  (5:2 — article hero)
//   public/static/insights/art/<key>-og.png      1200×630  (Open Graph raster)
//
//   node scripts/generate-insight-art.mjs
//
// One visual family: the "drafting sheet" stage (paper, a faint modular grid,
// registration corners) and the brand palette from src/app/globals.css. Each
// composition restates the article's argument as structure — never as
// numbers, prices or logos. Everything is STATIC. No animation of any kind.
// ---------------------------------------------------------------------------

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { P, svg, rect, line, circle } from './asset-lib.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = resolve(ROOT, 'public/static/insights/art');
mkdirSync(OUT_DIR, { recursive: true });

const sharp = (await import('sharp')).default;

const path = (d, { fill = 'none', stroke, sw = 2, dash, cap = 'round', join = 'round' } = {}) =>
  `  <path d="${d}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${sw}" stroke-linecap="${cap}" stroke-linejoin="${join}"` : ''}${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;

const group = (transform, children) =>
  `  <g transform="${transform}">\n${children.join('\n')}\n  </g>`;

/** The shared stage: paper, a faint 40px modular grid, registration corners. */
const stage = (W, H) => {
  const parts = [rect(0, 0, W, H, P.paper)];
  const inset = 40;
  for (let x = inset; x <= W - inset; x += 40) parts.push(line(x, inset, x, H - inset, P.line, 1));
  for (let y = inset; y <= H - inset; y += 40) parts.push(line(inset, y, W - inset, y, P.line, 1));
  const c = 14;
  [
    [inset, inset, 1, 1],
    [W - inset, inset, -1, 1],
    [W - inset, H - inset, -1, -1],
    [inset, H - inset, 1, -1],
  ].forEach(([x, y, dx, dy]) => {
    parts.push(line(x, y, x + c * dx, y, P.edge, 1.5));
    parts.push(line(x, y, x, y + c * dy, P.edge, 1.5));
  });
  return parts;
};

// Each composition is drawn in a 1000×560 logical frame, then placed.
const FRAME = { w: 1000, h: 560 };

/* -------------------------------------------------------------------------
   A. Website cost — a brief at the left, branching into six modules of
   rising size and complexity. Scope is a bill of materials, not a page count.
   ------------------------------------------------------------------------- */
const costFactors = () => {
  const p = [];
  // The brief: an ink tile with the cobalt bar.
  p.push(rect(40, 252, 64, 64, P.ink, { r: 4 }));
  p.push(rect(64, 252, 16, 40, P.blue));

  // Connector spine and branches (edge hairlines with cobalt junctions).
  const spineX = 150;
  p.push(line(104, 284, spineX, 284, P.edge, 2));
  p.push(line(spineX, 90, spineX, 470, P.edge, 2));
  const branches = [90, 180, 284, 380, 470];
  branches.forEach((y) => p.push(circle(spineX, y, 5, P.blue)));

  // Module frames: [x, y, w, h]
  const m1 = [200, 40, 170, 110]; // layouts
  const m2 = [410, 20, 220, 150]; // content
  const m3 = [680, 10, 290, 230]; // functionality (the cobalt module)
  const m4 = [200, 330, 220, 170]; // integrations
  const m5 = [470, 300, 250, 230]; // e-commerce
  const m6 = [770, 290, 200, 240]; // after launch

  // Branch lines from the spine to each module edge.
  p.push(line(spineX, 90, m1[0], 90, P.edge, 2));
  p.push(line(spineX, 180, 390, 180, P.edge, 2));
  p.push(path(`M390 180 V95 H${m2[0]}`, { stroke: P.edge, sw: 2 }));
  p.push(path(`M${m2[0] + m2[2]} 95 H${m3[0]}`, { stroke: P.edge, sw: 2 }));
  p.push(line(spineX, 380, m4[0], 380, P.edge, 2));
  p.push(path(`M${m4[0] + m4[2]} 415 H${m5[0]}`, { stroke: P.edge, sw: 2 }));
  p.push(path(`M${m5[0] + m5[2]} 415 H${m6[0]}`, { stroke: P.edge, sw: 2 }));
  p.push(line(spineX, 470, 200, 470, P.edge, 2));

  const frame = ([x, y, w, h], fill = P.white, stroke = P.ink) =>
    rect(x, y, w, h, fill, { r: 4, stroke, sw: 2 });

  // m1 — unique layouts: three nested page frames.
  p.push(frame(m1));
  [0, 1, 2].forEach((i) => {
    p.push(rect(m1[0] + 18 + i * 44, m1[1] + 22, 32, 66, P.paper, { stroke: P.edge, sw: 1.5 }));
    p.push(rect(m1[0] + 24 + i * 44, m1[1] + 30, 20, 6, i === 2 ? P.blue : P.ink));
    p.push(rect(m1[0] + 24 + i * 44, m1[1] + 44, 20, 3, P.edge));
    p.push(rect(m1[0] + 24 + i * 44, m1[1] + 52, 14, 3, P.edge));
  });

  // m2 — content: a headline bar and text measure.
  p.push(frame(m2));
  p.push(rect(m2[0] + 22, m2[1] + 24, 110, 12, P.ink, { r: 2 }));
  [0, 1, 2, 3, 4].forEach((i) =>
    p.push(rect(m2[0] + 22, m2[1] + 52 + i * 16, i === 4 ? 90 : 176, 5, P.edge, { r: 2 }))
  );
  p.push(rect(m2[0] + 150, m2[1] + 22, 48, 36, P.paper, { stroke: P.edge, sw: 1.5 }));
  p.push(path(`M${m2[0] + 156} ${m2[1] + 52} l12 -14 l9 9 l8 -10 l13 15 Z`, { fill: P.blue }));

  // m3 — functionality: the cobalt module, fields and a submit.
  p.push(frame(m3, P.blue, P.blue));
  [0, 1, 2].forEach((i) =>
    p.push(rect(m3[0] + 26, m3[1] + 28 + i * 44, 170, 28, P.white, { r: 2 }))
  );
  p.push(rect(m3[0] + 212, m3[1] + 28, 52, 116, P.blueDeep, { r: 2 }));
  [0, 1, 2, 3].forEach((i) => p.push(rect(m3[0] + 222, m3[1] + 40 + i * 24, 32, 6, P.blueSoft)));
  p.push(rect(m3[0] + 26, m3[1] + 168, 110, 34, P.ink, { r: 2 }));
  p.push(rect(m3[0] + 150, m3[1] + 168, 114, 34, P.white, { r: 2 }));

  // m4 — integrations: three systems joined to a hub.
  p.push(frame(m4));
  const hub = [m4[0] + 110, m4[1] + 85];
  const sats = [
    [m4[0] + 40, m4[1] + 40],
    [m4[0] + 180, m4[1] + 40],
    [m4[0] + 110, m4[1] + 140],
  ];
  sats.forEach(([x, y]) => p.push(line(hub[0], hub[1], x, y, P.edge, 2)));
  sats.forEach(([x, y], i) =>
    p.push(
      circle(x, y, 16, i === 1 ? P.blue : P.white, { stroke: i === 1 ? P.blue : P.ink, sw: 2 })
    )
  );
  p.push(circle(hub[0], hub[1], 22, P.ink));
  p.push(circle(hub[0], hub[1], 7, P.white));

  // m5 — e-commerce: a 3×2 product grid with a cart tile.
  p.push(frame(m5));
  for (let r = 0; r < 2; r++)
    for (let c = 0; c < 3; c++) {
      const x = m5[0] + 22 + c * 70;
      const y = m5[1] + 24 + r * 96;
      p.push(rect(x, y, 56, 56, P.paper, { stroke: P.edge, sw: 1.5 }));
      p.push(rect(x, y + 64, 36, 5, P.ink, { r: 2 }));
      p.push(rect(x, y + 74, 24, 4, P.edge, { r: 2 }));
    }
  p.push(circle(m5[0] + 212, m5[1] + 46, 14, P.blue));

  // m6 — after launch: a dial of maintenance cycles.
  p.push(frame(m6));
  const cx = m6[0] + 100;
  const cy = m6[1] + 110;
  p.push(circle(cx, cy, 68, P.paper, { stroke: P.ink, sw: 2 }));
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const r1 = 58;
    const r2 = i % 3 === 0 ? 46 : 52;
    p.push(
      line(
        cx + Math.cos(a) * r1,
        cy + Math.sin(a) * r1,
        cx + Math.cos(a) * r2,
        cy + Math.sin(a) * r2,
        P.ink,
        2
      )
    );
  }
  p.push(path(`M${cx} ${cy} L${cx} ${cy - 44}`, { stroke: P.blue, sw: 4 }));
  p.push(path(`M${cx} ${cy} L${cx + 30} ${cy + 18}`, { stroke: P.ink, sw: 3 }));
  p.push(circle(cx, cy, 6, P.blue));
  p.push(rect(m6[0] + 30, m6[1] + 200, 140, 6, P.edge, { r: 3 }));
  p.push(rect(m6[0] + 30, m6[1] + 200, 90, 6, P.blue, { r: 3 }));

  return p;
};

/* -------------------------------------------------------------------------
   B. WordPress vs Webflow vs custom — three builds of the same product.
   Equal height, equal weight, one cobalt element each. Nobody wins.
   ------------------------------------------------------------------------- */
const threeArchitectures = () => {
  const p = [];
  const colW = 270;
  const gap = 65;
  const top = 50;
  const h = 460;
  const xs = [50, 50 + colW + gap, 50 + 2 * (colW + gap)];

  // Shared baseline: one product, three ways.
  p.push(line(40, top + h + 30, 960, top + h + 30, P.ink, 2));
  xs.forEach((x) => p.push(line(x + colW / 2, top + h, x + colW / 2, top + h + 30, P.edge, 2)));

  const plate = (x) => rect(x, top, colW, h, P.white, { r: 4, stroke: P.ink, sw: 2 });

  // Column 1 — theme + plugins: many bricks, one editor bar.
  p.push(plate(xs[0]));
  {
    const x = xs[0];
    p.push(rect(x + 20, top + 20, colW - 40, 44, P.ink, { r: 2 }));
    p.push(rect(x + 32, top + 36, 70, 12, P.paper, { r: 2 }));
    p.push(rect(x + 110, top + 36, 24, 12, P.edge, { r: 2 }));
    p.push(rect(x + 140, top + 36, 24, 12, P.edge, { r: 2 }));
    const bricks = [
      [0, 0, 2, 1],
      [2, 0, 1, 1],
      [3, 0, 1, 2],
      [0, 1, 1, 1],
      [1, 1, 2, 1],
      [0, 2, 1, 2],
      [1, 2, 1, 1],
      [2, 2, 2, 1],
      [1, 3, 3, 1],
      [0, 4, 2, 1],
      [2, 4, 1, 1],
      [3, 4, 1, 1],
      [0, 5, 4, 1],
    ];
    const u = (colW - 40) / 4;
    const v = 56;
    bricks.forEach(([c, r, w, hh], i) => {
      const bx = x + 20 + c * u + 4;
      const by = top + 84 + r * v + 4;
      const blue = i === 4;
      p.push(
        rect(bx, by, w * u - 8, hh * v - 8, blue ? P.blue : P.paper, {
          r: 2,
          stroke: blue ? P.blue : P.edge,
          sw: 1.5,
        })
      );
      if (!blue) p.push(rect(bx + 10, by + 12, Math.min(w * u - 28, 60), 5, P.ink, { r: 2 }));
    });
  }

  // Column 2 — visual canvas: a few large blocks with selection handles.
  p.push(plate(xs[1]));
  {
    const x = xs[1];
    // canvas rulers
    p.push(rect(x + 20, top + 20, colW - 40, 14, P.paper, { stroke: P.edge, sw: 1.5 }));
    p.push(rect(x + 20, top + 20, 14, h - 40, P.paper, { stroke: P.edge, sw: 1.5 }));
    for (let i = 0; i < 10; i++)
      p.push(line(x + 50 + i * 22, top + 26, x + 50 + i * 22, top + 34, P.edge, 1.5));
    for (let i = 0; i < 18; i++)
      p.push(line(x + 26, top + 54 + i * 22, x + 34, top + 54 + i * 22, P.edge, 1.5));
    const cx0 = x + 48;
    const cy0 = top + 48;
    const cw = colW - 76;
    p.push(rect(cx0, cy0, cw, 90, P.paper, { stroke: P.edge, sw: 1.5 }));
    p.push(rect(cx0 + 16, cy0 + 22, 110, 12, P.ink, { r: 2 }));
    p.push(rect(cx0 + 16, cy0 + 46, 150, 5, P.edge, { r: 2 }));
    p.push(rect(cx0 + 16, cy0 + 58, 120, 5, P.edge, { r: 2 }));
    // the selected block: cobalt selection outline with handles
    const sy = cy0 + 110;
    p.push(rect(cx0, sy, cw, 150, P.white, { stroke: P.blue, sw: 2.5 }));
    p.push(rect(cx0 + 16, sy + 18, cw - 32, 70, P.paper, { stroke: P.edge, sw: 1.5 }));
    p.push(path(`M${cx0 + 30} ${sy + 76} l30 -34 l20 20 l18 -24 l28 38 Z`, { fill: P.blue }));
    p.push(rect(cx0 + 16, sy + 104, 100, 8, P.ink, { r: 2 }));
    p.push(rect(cx0 + 16, sy + 122, 150, 5, P.edge, { r: 2 }));
    [
      [cx0, sy],
      [cx0 + cw, sy],
      [cx0, sy + 150],
      [cx0 + cw, sy + 150],
    ].forEach(([hx, hy]) =>
      p.push(rect(hx - 6, hy - 6, 12, 12, P.white, { stroke: P.blue, sw: 2 }))
    );
    p.push(rect(cx0, sy + 170, cw, 110, P.paper, { stroke: P.edge, sw: 1.5 }));
    [0, 1, 2].forEach((i) =>
      p.push(rect(cx0 + 16 + i * 56, sy + 190, 44, 44, P.white, { stroke: P.edge, sw: 1.5 }))
    );
    p.push(rect(cx0 + 16, sy + 248, 120, 6, P.edge, { r: 2 }));
  }

  // Column 3 — custom build: a component grid above a code layer.
  p.push(plate(xs[2]));
  {
    const x = xs[2];
    const gx = x + 20;
    const gw = colW - 40;
    // header component
    p.push(rect(gx, top + 20, gw, 40, P.paper, { stroke: P.ink, sw: 1.5 }));
    p.push(rect(gx + 12, top + 34, 36, 12, P.ink, { r: 2 }));
    [0, 1, 2].forEach((i) =>
      p.push(rect(gx + gw - 110 + i * 32, top + 37, 20, 6, P.edge, { r: 2 }))
    );
    // hero component
    p.push(rect(gx, top + 72, gw, 100, P.white, { stroke: P.ink, sw: 1.5 }));
    p.push(rect(gx + 14, top + 90, 130, 14, P.ink, { r: 2 }));
    p.push(rect(gx + 14, top + 114, 160, 5, P.edge, { r: 2 }));
    p.push(rect(gx + 14, top + 126, 110, 5, P.edge, { r: 2 }));
    p.push(rect(gx + 14, top + 142, 64, 18, P.blue, { r: 2 }));
    // three-column system
    const cw3 = (gw - 16) / 3;
    [0, 1, 2].forEach((i) => {
      const cx = gx + i * (cw3 + 8);
      p.push(rect(cx, top + 184, cw3, 110, P.white, { stroke: P.ink, sw: 1.5 }));
      p.push(rect(cx + 10, top + 196, cw3 - 20, 40, P.paper, { stroke: P.edge, sw: 1.5 }));
      p.push(rect(cx + 10, top + 248, cw3 - 28, 6, P.ink, { r: 2 }));
      p.push(rect(cx + 10, top + 262, cw3 - 40, 4, P.edge, { r: 2 }));
    });
    // code layer — the custom build's foundation
    const cy = top + 310;
    p.push(rect(gx, cy, gw, h - (cy - top) - 20, P.ink, { r: 2 }));
    const lines = [
      [0, 60],
      [16, 110],
      [32, 80],
      [32, 50],
      [16, 120],
      [0, 40],
    ];
    lines.forEach(([ind, w], i) =>
      p.push(rect(gx + 16 + ind, cy + 18 + i * 18, w, 6, i === 2 ? P.blue : P.mutedDark, { r: 3 }))
    );
  }

  return p;
};

/* -------------------------------------------------------------------------
   C. Ownership and hosting — five assets, each with its own tag, held on
   one ring that belongs to the business. The cobalt card is the domain.
   ------------------------------------------------------------------------- */
const ownershipRing = () => {
  const p = [];
  // The ring: a single ink loop everything is held on.
  const rx = 330;
  const ry = 290;
  const rr = 150;
  p.push(circle(rx, ry, rr, 'none', { stroke: P.ink, sw: 10 }));
  p.push(circle(rx, ry, rr, 'none', { stroke: P.paper, sw: 2 }));
  // Ring opening — the clasp, in cobalt, on the far side from the cards.
  p.push(path(`M${rx - rr} ${ry - 20} V${ry + 20}`, { stroke: P.paper, sw: 14, cap: 'butt' }));
  p.push(path(`M${rx - rr} ${ry - 20} V${ry + 20}`, { stroke: P.blue, sw: 10, cap: 'butt' }));

  // Portability: a dashed route leaving the clasp for an empty, waiting slot.
  p.push(
    path(
      `M${rx - rr} ${ry + 20} C ${rx - 240} ${ry + 60}, ${rx - 250} ${ry + 170}, ${rx - 170} ${ry + 215}`,
      { stroke: P.edge, sw: 2, dash: '6 8' }
    )
  );
  p.push(rect(rx - 160, ry + 185, 120, 60, 'none', { r: 6, stroke: P.edge, sw: 2 }));

  // Five tagged cards hung through their punched holes on the ring, fanned.
  const cards = [
    { fill: P.paper, stroke: P.edge },
    { fill: P.white, stroke: P.ink },
    { fill: P.paper, stroke: P.ink },
    { fill: P.white, stroke: P.ink },
    { fill: P.blue, stroke: P.blue },
  ];
  const w = 300;
  const h = 180;
  cards.forEach((c, i) => {
    const isDomain = i === cards.length - 1;
    const a = ((-78 + i * 21) * Math.PI) / 180; // hole position on the ring
    const hx = rx + Math.cos(a) * rr;
    const hy = ry + Math.sin(a) * rr;
    const rot = -28 + i * 11; // the fan
    const children = [
      rect(0, 0, w, h, c.fill, { r: 8, stroke: c.stroke, sw: 2 }),
      circle(26, 26, 11, P.paper, { stroke: isDomain ? P.white : P.ink, sw: 2 }),
      rect(60, 20, isDomain ? 140 : 110, 12, isDomain ? P.white : P.ink, { r: 2 }),
      rect(60, 44, 180, 5, isDomain ? P.blueSoft : P.edge, { r: 2 }),
      rect(60, 56, 140, 5, isDomain ? P.blueSoft : P.edge, { r: 2 }),
    ];
    if (i === 0) {
      // accounts and access — a key row
      [0, 1, 2].forEach((k) =>
        children.push(rect(60 + k * 60, 96, 44, 44, P.white, { stroke: P.edge, sw: 1.5 }))
      );
      children.push(circle(82, 118, 8, P.ink));
    } else if (i === 1) {
      // content and data — rows
      [0, 1, 2].forEach((k) =>
        children.push(rect(60, 94 + k * 24, 200 - k * 40, 10, P.line, { r: 2 }))
      );
    } else if (i === 2) {
      // the website itself — a tiny page
      children.push(rect(60, 90, 200, 72, P.white, { stroke: P.ink, sw: 1.5 }));
      children.push(rect(72, 102, 80, 8, P.ink, { r: 2 }));
      children.push(rect(72, 120, 170, 4, P.edge, { r: 2 }));
      children.push(rect(72, 132, 120, 4, P.edge, { r: 2 }));
    } else if (i === 3) {
      // hosting — a server stack
      [0, 1, 2].forEach((k) => {
        children.push(rect(60, 90 + k * 26, 200, 20, P.paper, { stroke: P.ink, sw: 1.5 }));
        children.push(circle(246, 100 + k * 26, 3, k === 0 ? P.blue : P.edge));
      });
    } else {
      // the domain — an address line that is unmistakably yours
      children.push(rect(60, 98, 200, 44, P.white, { r: 3 }));
      children.push(rect(74, 114, 120, 12, P.blue, { r: 2 }));
      children.push(circle(236, 120, 8, P.ink));
    }
    p.push(group(`translate(${hx} ${hy}) rotate(${rot}) translate(-26 -26)`, children));
  });

  return p;
};

/* -------------------------------------------------------------------------
   Composition + emission
   ------------------------------------------------------------------------- */
const ART = [
  {
    key: 'cost-factors',
    draw: costFactors,
    title:
      'A website brief branching into six modules of rising size and complexity: layouts, content, functionality, integrations, e-commerce and after-launch care.',
  },
  {
    key: 'platform-architectures',
    draw: threeArchitectures,
    title:
      'Three builds of the same website side by side: a themed block system, a visual canvas with a selected block, and a component grid on a code layer.',
  },
  {
    key: 'ownership-ring',
    draw: ownershipRing,
    title:
      'Five tagged asset cards fanned on one ring, the front card in cobalt, with a dashed route leaving the ring for an empty slot.',
  },
];

/** Place the 1000×560 composition on a W×H stage at `scale`, centred. */
const compose = ({ draw, title }, W, H, scale, dy = 0) => {
  const tx = (W - FRAME.w * scale) / 2;
  const ty = (H - FRAME.h * scale) / 2 + dy;
  const parts = [...stage(W, H), group(`translate(${tx} ${ty}) scale(${scale})`, draw())];
  return svg({ w: W, h: H, title, children: parts.join('\n') });
};

const written = [];
for (const art of ART) {
  const cover = compose(art, 1200, 800, 1.06);
  const wide = compose(art, 1600, 640, 0.96);
  const og = compose(art, 1200, 630, 0.9);
  writeFileSync(resolve(OUT_DIR, `${art.key}-cover.svg`), cover);
  writeFileSync(resolve(OUT_DIR, `${art.key}-wide.svg`), wide);
  await sharp(Buffer.from(og))
    .png({ compressionLevel: 9 })
    .toFile(resolve(OUT_DIR, `${art.key}-og.png`));
  written.push(`${art.key}-cover.svg`, `${art.key}-wide.svg`, `${art.key}-og.png`);
}
process.stdout.write(`${written.map((f) => `public/static/insights/art/${f}`).join('\n')}\n`);
