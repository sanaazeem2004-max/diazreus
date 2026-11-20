import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(process.argv[2] || 'http://localhost:5174/', { waitUntil: 'load' });
await p.waitForTimeout(1500);
console.log(await p.evaluate(() => {
  const out = [];
  for (const s of document.styleSheets) { try { for (const r of s.cssRules) { const t = r.cssText; if (t.includes('btn-outline-light') || t.startsWith('.btn ') || t.startsWith('.btn{')) out.push(t.slice(0, 160)); } } catch (e) { out.push('ERR ' + e.message); } }
  return out.join('\n') || 'NO MATCHING RULES (' + document.styleSheets.length + ' sheets)';
}));
await b.close();
