// ---------------------------------------------------------------------------
// UI Forge Studio — favicon generator
//
// Carves the favicon set out of the brand mark (public/static/brand/logo/
// ui-forge-mark.svg) so every icon is derived from ONE source:
//   node scripts/generate-favicons.mjs
//
// Emits into src/app/ (Next.js file-convention metadata, linked automatically):
//   icon.svg        — rounded ink tile, served as the modern SVG favicon
//   favicon.ico     — 16/32/48 px PNG-in-ICO fallback for Safari / legacy UAs
//   apple-icon.png  — 180 px square tile (iOS applies its own corner mask)
//
// Everything emitted is STATIC. See the no-animation mandate.
// ---------------------------------------------------------------------------

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MARK = resolve(ROOT, 'public/static/brand/logo/ui-forge-mark.svg');
const OUT = resolve(ROOT, 'src/app');

const TILE = '#0E1626';
/** The frame is ink in the master mark; on the ink tile it reverses to white. */
const FRAME_ON_TILE = { '#0E1626': '#FFFFFF' };
const SIZE = 64;
const RADIUS = 14;
/** Mark occupies the middle 60% of the tile. */
const SCALE = 0.6;

const markPaths = () => {
  const svg = readFileSync(MARK, 'utf8');
  const paths = [...svg.matchAll(/<path fill="([^"]+)" d="([^"]+)"\/>/g)];
  if (paths.length !== 2) throw new Error(`Expected 2 paths in ${MARK}, found ${paths.length}`);
  return paths.map(([, fill, d]) => ({ fill, d }));
};

const tile = ({ rounded }) => {
  const inset = (SIZE * (1 - SCALE)) / 2;
  const paths = markPaths()
    .map(({ fill, d }) => `    <path fill="${FRAME_ON_TILE[fill] ?? fill}" d="${d}" />`)
    .join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}"${rounded ? ` rx="${RADIUS}"` : ''} fill="${TILE}" />
  <g transform="translate(${inset} ${inset}) scale(${(SIZE * SCALE) / 100})">
${paths}
  </g>
</svg>
`;
};

const png = (svg, size) =>
  sharp(Buffer.from(svg), { density: 600 }).resize(size, size).png().toBuffer();

/** Wrap PNG buffers in an ICO container (PNG-in-ICO; all modern UAs). */
const ico = (entries) => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);

  let offset = 6 + 16 * entries.length;
  const dir = entries.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });

  return Buffer.concat([header, ...dir, ...entries.map((e) => e.data)]);
};

const run = async () => {
  const rounded = tile({ rounded: true });
  const square = tile({ rounded: false });

  writeFileSync(resolve(OUT, 'icon.svg'), rounded);

  const sizes = [16, 32, 48];
  const entries = await Promise.all(
    sizes.map(async (size) => ({ size, data: await png(rounded, size) }))
  );
  writeFileSync(resolve(OUT, 'favicon.ico'), ico(entries));

  writeFileSync(resolve(OUT, 'apple-icon.png'), await png(square, 180));

  console.log(
    'favicons written to src/app: icon.svg, favicon.ico (16/32/48), apple-icon.png (180)'
  );
};

run();
