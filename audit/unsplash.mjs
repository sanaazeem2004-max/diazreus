import { chromium } from '@playwright/test';
import fs from 'fs';
const queries = process.argv.slice(2);
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport: { width: 1440, height: 1200 }, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' });
const out = {};
for (const q of queries) {
  await p.goto('https://unsplash.com/s/photos/' + encodeURIComponent(q.replace(/ /g, '-')) + '?license=free&orientation=landscape', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForTimeout(3500);
  out[q] = await p.evaluate(() => [...document.querySelectorAll('figure img[src*="images.unsplash.com/photo-"]')].map(i => ({ id: i.src.split('?')[0].split('/').pop(), alt: i.alt?.slice(0, 80) })).filter((v, i, a) => a.findIndex(x => x.id === v.id) === i).slice(0, 8));
  console.log('==', q); out[q].forEach(r => console.log(r.id, '|', r.alt));
}
fs.writeFileSync('audit/unsplash.json', JSON.stringify(out, null, 2));
await b.close();
