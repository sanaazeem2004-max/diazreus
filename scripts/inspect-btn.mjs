import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:5174/', { waitUntil: 'load' });
await p.waitForTimeout(1500);
console.log(await p.getByRole('link', { name: 'Meet Our Attorneys' }).first().evaluate(e => ({ cls: e.className, border: getComputedStyle(e).borderTopWidth + ' ' + getComputedStyle(e).borderTopColor, bg: getComputedStyle(e).backgroundColor })));
await b.close();
