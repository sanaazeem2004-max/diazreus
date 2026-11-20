import { chromium } from '@playwright/test';
import fs from 'fs';

const { links } = JSON.parse(fs.readFileSync('audit/links.json', 'utf8'));
const pages = [...new Set(links.filter(l => l.startsWith('https://diazreus.com/') && !/\/(es|ru)\/$/.test(l) && !l.endsWith('.pdf')).map(l => l.replace(/\/$/, '')))];
const MAIN = ['https://diazreus.com', 'https://diazreus.com/about-us', 'https://diazreus.com/us-international-practice', 'https://diazreus.com/areas-of-practice', 'https://diazreus.com/areas-of-practice/international-litigation-arbitration', 'https://diazreus.com/attorneys-conselors', 'https://diazreus.com/offices', 'https://diazreus.com/contact'];
const WIDTHS = [1440, 1280, 768, 390];
fs.mkdirSync('audit/shots', { recursive: true });
fs.mkdirSync('audit/pages', { recursive: true });

const b = await chromium.launch({ channel: 'msedge' });
const results = [];
const queue = [...pages];
async function worker() { while (queue.length) { const url = queue.shift();
  const slug = url.replace('https://diazreus.com', '').replace(/\//g, '_') || '_home';
  const widths = MAIN.includes(url) ? WIDTHS : [1440];
  const entry = { url, slug, metrics: {} };
  for (const w of widths) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    const p = await ctx.newPage();
    const consoleErrors = [];
    p.on('console', m => m.type() === 'error' && consoleErrors.push(m.text().slice(0, 200)));
    try {
      const t0 = Date.now();
      await p.goto(url + '/', { waitUntil: 'domcontentloaded', timeout: 90000 });
      entry.loadMs = entry.loadMs ?? Date.now() - t0;
      // trigger lazy loading
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
      await p.waitForTimeout(1500);
      const m = await p.evaluate(() => {
        const de = document.documentElement;
        const overflowers = [...document.querySelectorAll('body *')].filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.right > de.clientWidth + 2; }).slice(0, 8).map(el => `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 2).join('.')} right=${Math.round(el.getBoundingClientRect().right)}`);
        const imgs = [...document.images];
        const cs = s => { const el = document.querySelector(s); if (!el) return null; const c = getComputedStyle(el); return { font: c.fontFamily, size: c.fontSize, weight: c.fontWeight, color: c.color, lh: c.lineHeight }; };
        return {
          docWidth: de.scrollWidth, viewport: de.clientWidth, height: de.scrollHeight,
          hOverflow: de.scrollWidth > de.clientWidth, overflowers,
          brokenImgs: imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.src).slice(0, 10),
          imgsNoAlt: imgs.filter(i => !i.alt).length, imgCount: imgs.length,
          h1: [...document.querySelectorAll('h1')].map(h => h.innerText.trim()),
          body: cs('body'), h1s: cs('h1'), h2s: cs('h2'), p: cs('p'),
          smallTextCount: [...document.querySelectorAll('p, li, a, span')].filter(e => e.innerText?.trim() && parseFloat(getComputedStyle(e).fontSize) < 12).length,
          hamburgerVisible: !!([...document.querySelectorAll('[class*=toggle], [class*=hamburger], [class*=mobile-menu], .menu-toggle')].find(e => e.offsetParent)),
        };
      });
      m.consoleErrors = consoleErrors.slice(0, 5);
      entry.metrics[w] = m;
      if (w === 1440) {
        const data = await p.evaluate(() => {
          const main = document.querySelector('main, #main, .site-content, #content') || document.body;
          return {
            title: document.title,
            metaDesc: document.querySelector('meta[name=description]')?.content,
            headings: [...document.querySelectorAll('h1,h2,h3,h4')].map(h => `${h.tagName}: ${h.innerText.trim()}`).filter(s => s.length > 4),
            text: main.innerText.replace(/\n{3,}/g, '\n\n').slice(0, 30000),
            images: [...document.images].map(i => ({ src: i.currentSrc || i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight })).filter(i => i.w > 40),
            bgImages: [...document.querySelectorAll('*')].map(e => getComputedStyle(e).backgroundImage).filter(s => s.includes('url(')).slice(0, 30),
            forms: [...document.querySelectorAll('form')].map(f => ({ action: f.action, method: f.method, id: f.id, cls: f.className, fields: [...f.querySelectorAll('input,textarea,select')].map(i => ({ name: i.name, type: i.type, ph: i.placeholder, req: i.required })) })),
            links: [...document.querySelectorAll('a[href]')].map(a => ({ t: a.innerText.trim().slice(0, 80), h: a.href })).filter(a => a.t),
            footer: document.querySelector('footer')?.innerText,
            header: document.querySelector('header')?.innerText,
          };
        });
        fs.writeFileSync(`audit/pages/${slug}.json`, JSON.stringify(data, null, 2));
      }
      if (MAIN.includes(url)) {
        await p.screenshot({ path: `audit/shots/${slug}-${w}.png`, fullPage: w === 1440 || w === 390 });
        if (w === 390) { await p.screenshot({ path: `audit/shots/${slug}-${w}-fold.png` }); }
      }
    } catch (e) { entry.metrics[w] = { error: e.message.slice(0, 200) }; }
    await ctx.close();
  }
  results.push(entry);
  fs.writeFileSync('audit/metrics.json', JSON.stringify(results, null, 2));
  console.log('done', slug);
} }
await Promise.all([1,2,3,4,5].map(worker));
await b.close();
