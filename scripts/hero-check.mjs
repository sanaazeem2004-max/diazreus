// Captures the hero with motion enabled after the background video has had time to start.
import { chromium } from '@playwright/test';
const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:5174/', { waitUntil: 'load' });
  await p.waitForTimeout(6000);
  const vid = await p.frameLocator('iframe[title="Diaz Reus background video"]').locator('video').evaluate(v => ({ paused: v.paused, t: v.currentTime, w: v.videoWidth })).catch(e => 'no video: ' + e.message.slice(0, 80));
  console.log(w, JSON.stringify(vid), 'errors:', errs.length);
  await p.screenshot({ path: `screenshots/hero-video-${w}.png` });
  await p.close();
}
await b.close();
