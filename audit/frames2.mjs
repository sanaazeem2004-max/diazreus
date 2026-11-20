import { chromium } from '@playwright/test';
const src = 'https://cdn.dribbble.com/userupload/43922535/file/large-afd3d1f7f8a7088d9101e30c6ea1e8f9.mp4';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport: { width: 1600, height: 1300 } });
await p.setContent(`<body style="margin:0;background:#000"><video id=v src="${src}" muted preload=auto crossorigin style="width:1600px;display:block"></video></body>`);
const dur = await p.evaluate(() => new Promise(r => { const v = document.getElementById('v'); v.onloadeddata = () => r([v.duration, v.videoWidth, v.videoHeight]); v.onerror = () => r('err ' + v.error?.code); setTimeout(() => r('timeout'), 40000); }));
console.log(dur);
if (!Array.isArray(dur) || !dur[1]) process.exit(1);
const n = 30;
for (let i = 0; i < n; i++) {
  const t = (dur[0] * (i + 0.5)) / n;
  await p.evaluate(t => new Promise(r => { v.onseeked = () => r(); v.currentTime = t; setTimeout(r, 4000); }), t);
  await p.waitForTimeout(250);
  await p.locator('#v').screenshot({ path: `audit/frames/d${String(i).padStart(2, '0')}.png` });
}
await b.close();
