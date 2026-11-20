import { chromium } from '@playwright/test';
import fs from 'fs';
const files = fs.readdirSync('audit/frames').filter(f => f.startsWith('d')).sort();
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport: { width: 1600, height: 800 } });
for (let s = 0; s < files.length; s += 6) {
  const imgs = files.slice(s, s + 6).map(f => `<img src="data:image/png;base64,${fs.readFileSync('audit/frames/' + f).toString('base64')}">`).join('');
  await p.setContent(`<style>body{margin:0;display:grid;grid-template-columns:repeat(3,1fr);gap:4px;background:#000}img{width:100%;display:block}</style>${imgs}`);
  await p.screenshot({ path: `audit/sheet${s / 6}.png`, fullPage: true });
}
await b.close();
