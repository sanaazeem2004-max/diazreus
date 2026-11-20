import fs from 'fs';
import { chromium } from '@playwright/test';
const ids = fs.readFileSync('audit/cand.txt', 'utf8').split(/\s+/).filter(Boolean);
const ok = [];
await Promise.all(ids.map(async id => {
  const r = await fetch(`https://images.unsplash.com/photo-${id}?w=360&q=60&auto=format&fit=crop&h=240`);
  if (r.ok) { fs.writeFileSync(`audit/cand/${id}.jpg`, Buffer.from(await r.arrayBuffer())); ok.push(id); } else console.log('MISS', id, r.status);
}));
ok.sort();
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport: { width: 1600, height: 800 } });
for (let s = 0; s < ok.length; s += 20) {
  const html = ok.slice(s, s + 20).map(id => `<figure><img src="data:image/jpeg;base64,${fs.readFileSync(`audit/cand/${id}.jpg`).toString('base64')}"><figcaption>${id}</figcaption></figure>`).join('');
  await p.setContent(`<style>body{margin:0;display:grid;grid-template-columns:repeat(5,1fr);gap:6px;font:13px sans-serif}figure{margin:0}img{width:100%;display:block}</style>${html}`);
  await p.screenshot({ path: `audit/cand-sheet${s / 20}.png`, fullPage: true });
}
await b.close();
console.log('ok', ok.length);
