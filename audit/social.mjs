import { chromium } from '@playwright/test';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage();
await p.goto('https://diazreus.com/', { waitUntil: 'domcontentloaded', timeout: 90000 });
await p.waitForTimeout(2000);
console.log(await p.evaluate(() => [...document.querySelectorAll('a')].filter(a => /facebook|linkedin|twitter|x\.com|instagram|youtube|vimeo/.test(a.href)).map(a => a.href).join('\n')));
console.log(await p.evaluate(() => [...document.querySelectorAll('a[href^=tel]')].map(a => a.href).join(' ')));
console.log(await p.evaluate(() => [...document.querySelectorAll('iframe,video,[data-video], a[href*=youtu], a[href*=vimeo]')].map(a => a.src || a.href || a.dataset.video).join('\n')));
await b.close();
