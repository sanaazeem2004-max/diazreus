import { chromium } from '@playwright/test';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport: { width: 1440, height: 1200 } });
await p.goto('https://unsplash.com/s/photos/lady-justice', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(5000);
console.log(await p.title());
console.log((await p.evaluate(() => [...document.images].map(i => i.src.slice(0, 120)))).slice(0, 25).join('\n'));
await b.close();
