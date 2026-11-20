import { chromium } from '@playwright/test';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage();
await p.goto(process.argv[2], { waitUntil: 'domcontentloaded', timeout: 90000 });
await p.waitForTimeout(2500);
console.log(await p.evaluate(() => { const m = document.querySelector('main, #main, .site-content, #content') || document.body; return m.innerText.split('Headquarters:')[0].slice(0, 3500); }));
console.log(await p.evaluate(() => [...document.querySelectorAll('a[href^=mailto], a[href^=tel], a[href*=linkedin], a[href$=".pdf"], a[href*="vcard"], a[href*=".vcf"]')].map(a => a.innerText.trim() + ' -> ' + a.href).join('\n')));
await b.close();
