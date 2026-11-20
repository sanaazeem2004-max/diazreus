import { chromium } from '@playwright/test';
import fs from 'fs';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://diazreus.com/offices/', { waitUntil: 'domcontentloaded', timeout: 90000 });
await p.waitForTimeout(4000);
const d = await p.evaluate(() => [...document.querySelectorAll('a')].filter(a => /google\.[a-z.]+\/maps|maps\.app|goo\.gl\/maps|maps\.google/i.test(a.href) || /View On Google Maps/i.test(a.textContent)).map(a => {
  let el = a; for (let k = 0; k < 6; k++) { el = el.parentElement; if (el.querySelectorAll('a').length >= 2 && el.textContent.trim().length > 60) break; }
  const panel = a.closest('[role=tabpanel], .x-tabs-panel');
  const parts = [...el.querySelectorAll('*')].filter(n => n.children.length === 0 && n.textContent.trim()).map(n => n.textContent.trim());
  return { panel: panel?.id || panel?.getAttribute('aria-labelledby'), parts, maps: a.href, attorneys: [...el.querySelectorAll('a')].find(x => /View Attorneys/i.test(x.textContent))?.href };
}));
const tabs = await p.evaluate(() => [...document.querySelectorAll('[role=tab]')].map(t => ({ id: t.id, controls: t.getAttribute('aria-controls'), t: t.textContent.trim() })));
fs.writeFileSync('audit/offices2.json', JSON.stringify({ tabs, d }, null, 2));
console.log(JSON.stringify(tabs));
d.forEach(x => console.log(x.panel, '|', x.parts.filter(s => !/View/.test(s)).join(' | '), '|', x.maps.slice(0, 90)));
await b.close();
