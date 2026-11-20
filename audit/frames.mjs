import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';

const video = path.resolve('reference/original-872af5e4c79c22ee43631abb50d5950d.mp4');
const html = path.resolve('audit/player.html');
fs.writeFileSync(html, `<body style="margin:0;background:#000"><video id=v src="${pathToFileURL(video).href}" muted preload=auto style="width:1600px;display:block"></video></body>`);

const b = await chromium.launch({ channel: 'msedge', headless: false, args: ['--enable-features=PlatformHEVCDecoderSupport'] });
const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
await p.goto(pathToFileURL(html).href);
const dur = await p.evaluate(() => new Promise(r => {
  const v = document.getElementById('v');
  if (v.readyState >= 1) return r(v.duration);
  v.onloadedmetadata = () => r(v.duration);
  v.onerror = () => r('err ' + v.error?.code);
  setTimeout(() => r('timeout ' + v.readyState), 15000);
}));
console.log('duration', dur);
if (typeof dur !== 'number') { await b.close(); process.exit(1); }
console.log(await p.evaluate(() => [v.videoWidth, v.videoHeight]));
const n = 24;
for (let i = 0; i < n; i++) {
  const t = (dur * (i + 0.5)) / n;
  await p.evaluate(t => new Promise(r => { v.onseeked = () => r(); v.currentTime = t; setTimeout(r, 3000); }), t);
  await p.waitForTimeout(200);
  await p.locator('#v').screenshot({ path: `audit/frames/f${String(i).padStart(2, '0')}.png` });
}
await b.close();
