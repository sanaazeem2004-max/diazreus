import { chromium } from '@playwright/test';
import fs from 'fs';
const people = JSON.parse(fs.readFileSync('audit/people.json', 'utf8'));
const regionOf = { 'attorneys-conselors/': 'North America', 'latin-america': 'Latin America', 'europa': 'Europe', 'middle-east-asia': 'Middle East & Asia', 'investigators': 'Investigators' };
const map = new Map();
for (const [u, list] of Object.entries(people)) {
  if (u.endsWith('#raw')) continue;
  const region = Object.entries(regionOf).find(([k]) => u.endsWith(k) || u.includes(k))[1];
  for (const x of list) {
    if (!x.link?.includes('/people/')) continue;
    const key = x.img.split('/').pop().replace(/-1024x842|-1(?=-)/, '').toLowerCase();
    const name = x.text.split(/\s+/).slice(0, Math.ceil(x.text.split(/\s+/).length / 2)).join(' ');
    const cur = map.get(x.link) || { link: x.link, img: x.img, regions: [] };
    if (!cur.regions.includes(region)) cur.regions.push(region);
    map.set(x.link, cur);
  }
}
const list = [...map.values()];
console.log(list.length, 'profiles');
const b = await chromium.launch({ channel: 'msedge' });
const queue = [...list];
async function worker() {
  const p = await b.newPage();
  while (queue.length) {
    const item = queue.shift();
    try {
      await p.goto(item.link, { waitUntil: 'domcontentloaded', timeout: 90000 });
      await p.waitForTimeout(1200);
      Object.assign(item, await p.evaluate(() => {
        const m = document.querySelector('main, #main, .site-content, #content') || document.body;
        const t = m.innerText.split('Headquarters:')[0];
        const lines = t.split('\n').map(s => s.trim()).filter(Boolean);
        const i = lines.findIndex(l => l === 'Contact') + 1;
        const bioIdx = lines.findIndex(l => /^Biography$/i.test(l));
        const bio = bioIdx > -1 ? lines.slice(bioIdx + 1).filter(l => l.length > 120 && !l.startsWith('*')).slice(0, 3) : lines.slice(i + 2).filter(l => l.length > 160).slice(0, 2);
        const quotes = [];
        for (let k = 0; k < lines.length - 1; k++) if (/^[“"]/.test(lines[k]) && /^[-–]\s?/.test(lines[k + 1])) quotes.push({ q: lines[k].replace(/^[“"]\s*|[”"]\s*$/g, ''), src: lines[k + 1].replace(/^[-–]\s*/, '') });
        const email = (t.match(/[\w.+-]+@diazreus\.com/i) || [])[0];
        const phone = (t.match(/\+\s?\d[\d\s().-]{7,}\d/) || [])[0];
        const pa = [...m.querySelectorAll('a[href*="/areas-of-practice/"]')].map(a => a.getAttribute('href').split('/areas-of-practice/')[1]?.replace(/\/$/, '')).filter(Boolean);
        return { name: lines[i], title: lines[i + 1], address: lines[i + 2]?.startsWith('mailto') ? '' : lines[i + 2], email, phone: phone?.trim(), bio, quotes: quotes.slice(0, 3), linkedin: [...m.querySelectorAll('a[href*="linkedin.com/in"]')].map(a => a.href)[0], practiceSlugs: [...new Set(pa)] };
      }));
      console.log('ok', item.name);
    } catch (e) { console.log('ERR', item.link, e.message.slice(0, 80)); }
  }
  await p.close();
}
await Promise.all([1, 2, 3, 4, 5, 6].map(worker));
fs.writeFileSync('audit/profiles.json', JSON.stringify(list, null, 2));
await b.close();
