// Verifies the hero background video reveal timing and captures frames.
import { chromium } from '@playwright/test';
const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:5174/', { waitUntil: 'load' });
const poster = p.locator('section[aria-labelledby="hero-title"] img[src*="hero-video-poster"]');
for (const t of [2, 4, 6, 9]) {
  await p.waitForTimeout(t === 2 ? 2000 : t === 4 ? 2000 : t === 6 ? 2000 : 3000);
  const op = await poster.evaluate(e => getComputedStyle(e).opacity);
  console.log(`${t}s poster opacity`, op);
  await p.screenshot({ path: `screenshots/yt-${t}.png`, clip: { x: 80, y: 138, width: 1280, height: 760 } });
}
await b.close();
