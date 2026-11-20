const queries = process.argv.slice(2);
for (const q of queries) {
  const u = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=30&gsrsearch=${encodeURIComponent(q + ' filetype:bitmap')}&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=2400`;
  const r = await fetch(u, { headers: { 'User-Agent': 'redesign-asset-research/1.0' } });
  const j = await r.json();
  const rows = Object.values(j.query?.pages || {}).map(p => { const ii = p.imageinfo[0]; const m = ii.extmetadata; return { t: p.title.replace('File:', ''), w: ii.width, h: ii.height, lic: m.LicenseShortName?.value, url: ii.thumburl }; })
    .filter(x => x.w >= 2000 && x.w > x.h && /public domain|cc0|cc by 4|cc by 3|cc by 2|cc by-sa/i.test(x.lic || '')).slice(0, 10);
  console.log('==', q); rows.forEach(x => console.log(`${x.w}x${x.h} [${x.lic}] ${x.t}\n   ${x.url}`));
}
