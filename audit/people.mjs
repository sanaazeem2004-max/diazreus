import { chromium } from '@playwright/test';
import fs from 'fs';
const urls = ['https://diazreus.com/attorneys-conselors/', 'https://diazreus.com/attorneys-conselors/attorneys-counselors-latin-america/', 'https://diazreus.com/attorneys-conselors/attorneys-counselors-europa/', 'https://diazreus.com/attorneys-conselors/attorneys-counselors-middle-east-asia/', 'https://diazreus.com/investigators/'];
const b = await chromium.launch({ channel: 'msedge' });
const out = {};
await Promise.all(urls.map(async url => {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await p.waitForTimeout(4000);
  out[url] = await p.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')].filter(i => /uploads\/20/.test(i.src) && !/logo/i.test(i.src));
    return imgs.map(img => {
      // climb to the card container that holds text
      let el = img, card = null;
      for (let k = 0; k < 7 && el; k++) { el = el.parentElement; if (el && el.textContent.replace(/\s+/g, ' ').trim().length > 15) { card = el; break; } }
      const section = img.closest('section, .vc_tta-panel, .elementor-section, .wpb_row');
      const heading = section?.querySelector('h1,h2,h3,h4,.vc_tta-title-text')?.textContent.trim();
      return {
        img: img.src,
        text: card ? card.textContent.replace(/\s+/g, ' ').trim().slice(0, 400) : '',
        link: card?.querySelector('a[href]')?.href || img.closest('a')?.href,
        group: heading,
      };
    });
  });
  // also gather headings of country groups in order with text
  out[url + '#raw'] = await p.evaluate(() => (document.querySelector('main, #main, .site-content, #content') || document.body).textContent.replace(/[\t ]+/g, ' ').replace(/\n\s*\n+/g, '\n').slice(0, 12000));
  await p.close();
}));
fs.writeFileSync('audit/people.json', JSON.stringify(out, null, 2));
await b.close();
