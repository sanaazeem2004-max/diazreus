import { chromium } from '@playwright/test';
import fs from 'fs';

const b = await chromium.launch({ channel: 'msedge' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' });
const p = await ctx.newPage();

// Dribbble reference
try {
  await p.goto('https://dribbble.com/shots/26219639-Law-Firm-Website', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await p.waitForTimeout(4000);
  const drib = await p.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('.shot-description-container, [class*=description]')?.innerText?.slice(0, 1500),
    imgs: [...document.querySelectorAll('img, video, source')].map(e => e.currentSrc || e.src || e.getAttribute('data-src') || e.poster).filter(s => s && /cdn\.dribbble|dribbble\.com\/userupload/.test(s)),
  }));
  fs.writeFileSync('audit/dribbble.json', JSON.stringify(drib, null, 2));
  await p.screenshot({ path: 'audit/dribbble-page.png', fullPage: false });
  console.log('dribbble ok', drib.imgs.length);
} catch (e) { console.log('dribbble fail', e.message); }

// Diaz Reus homepage
await p.goto('https://diazreus.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(4000);
const links = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href]')].map(a => a.href.split('#')[0]))].filter(h => h.includes('diazreus.com')));
const nav = await p.evaluate(() => [...document.querySelectorAll('header a, nav a')].map(a => ({ t: a.innerText.trim(), h: a.href })));
fs.writeFileSync('audit/links.json', JSON.stringify({ links, nav }, null, 2));
console.log(links.length, 'links');
await b.close();
