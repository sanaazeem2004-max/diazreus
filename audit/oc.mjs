import { chromium } from '@playwright/test';
import fs from 'fs';
const b = await chromium.launch({ channel: 'msedge' });
for (const u of ['https://diazreus.com/offices/', 'https://diazreus.com/contact/']) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(u, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await p.waitForTimeout(5000);
  const d = await p.evaluate(() => ({
    text: (document.querySelector('main, #main, .site-content, #content') || document.body).textContent.replace(/[\t ]+/g, ' ').replace(/\n\s*\n+/g, '\n').split('Headquarters:')[0],
    forms: [...document.querySelectorAll('form')].map(f => ({ action: f.action, fields: [...f.querySelectorAll('input,textarea,select')].map(i => `${i.name}:${i.type}:${i.placeholder}:${i.required}`), html: f.innerText.slice(0, 800) })),
    iframes: [...document.querySelectorAll('iframe')].map(i => i.src),
  }));
  fs.writeFileSync('audit/' + (u.includes('offices') ? 'offices' : 'contact') + '.json', JSON.stringify(d, null, 2));
  await p.close();
}
await b.close();
