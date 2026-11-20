// Visual review: full-page screenshots of the redesign. Usage: node scripts/shoot.mjs [width] [paths...]
import { chromium } from '@playwright/test';
import fs from 'fs';

const width = Number(process.argv[2] || 1440);
const paths = process.argv.slice(3).length ? process.argv.slice(3) : ['/'];
fs.mkdirSync('screenshots', { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
for (const path of paths) {
  await p.goto('http://localhost:4173' + path, { waitUntil: 'networkidle' });
  // scroll through to trigger whileInView + lazy images
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
  await p.waitForTimeout(800);
  const name = (path === '/' ? 'home' : path.replace(/^\//, '').replace(/[/?=&]/g, '_')) + `-${width}.png`;
  await p.screenshot({ path: 'screenshots/' + name, fullPage: true });
  const dims = await p.evaluate(() => ({ w: document.documentElement.scrollWidth, vw: document.documentElement.clientWidth, h: document.documentElement.scrollHeight }));
  console.log(name, JSON.stringify(dims));
  if (process.env.SEG) { const seg = Number(process.env.SEG); for (let y = 0, k = 0; y < dims.h; y += seg, k++) await p.screenshot({ path: 'screenshots/' + name.replace('.png', '') + '-s' + k + '.png', fullPage: true, clip: { x: 0, y, width, height: Math.min(seg, dims.h - y) } }); }
}
await b.close();
