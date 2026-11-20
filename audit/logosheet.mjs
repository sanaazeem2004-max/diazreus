import { chromium } from '@playwright/test';
import fs from 'fs';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport: { width: 1600, height: 800 } });
const dirs = ['awards', 'clients', 'brand'];
const html = dirs.flatMap(d => fs.readdirSync('public/images/' + d).map(f => `<figure><img src="data:image/${f.endsWith('png') ? 'png' : 'webp'};base64,${fs.readFileSync(`public/images/${d}/${f}`).toString('base64')}"><figcaption>${d}/${f}</figcaption></figure>`)).join('');
await p.setContent(`<style>body{margin:0;display:grid;grid-template-columns:repeat(6,1fr);gap:8px;font:12px sans-serif;background:#ddd}figure{margin:0;background:#fff;padding:6px}img{width:100%;height:150px;object-fit:contain;display:block;background:repeating-conic-gradient(#eee 0 25%,#fff 0 50%) 0 0/16px 16px}</style>${html}`);
await p.screenshot({ path: 'audit/logosheet.png', fullPage: true });
await b.close();
