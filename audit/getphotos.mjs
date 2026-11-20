import fs from 'fs';
const map = {
  'hero-justice': ['1589829545856-d10d557cf95f', 1800], 'miami-skyline': ['1506966953602-c20cc11f75e3', 2000],
  'towers-mono': ['1511818966892-d7d671e672a2', 2000], 'towers-up': ['1486406146926-c627a92ad1ab', 1800],
  'earth-night': ['1451187580459-43490279c0fa', 2000], 'library-busts': ['1505664194779-8beaceb93744', 1600],
  'library-books': ['1479142506502-19b3a3b7ff33', 1400], 'office-glass': ['1497215728101-856f4ea42174', 1600],
  'newspapers': ['1504711434969-e33886168f5c', 1200], 'justice-2': ['1589994965851-a8f479c573a9', 1400],
  'pa-litigation': ['1453945619913-79ec89a82c51', 1200], 'pa-whitecollar': ['1575505586569-646b2ca898fc', 1200],
  'pa-fraud': ['1526304640581-d334cdbbf45e', 1200], 'pa-regulatory': ['1575320181282-9afab399332c', 1200],
  'pa-ma': ['1521791136064-7986c2920216', 1200], 'pa-trade': ['1436491865332-7a61a109cc05', 1200],
  'pa-blockchain': ['1518546305927-5a555bb7020d', 1200], 'pa-drrt': ['1611974789855-9c2a0a7236a3', 1200],
  'pa-estate': ['1554224155-6726b3ff858f', 1200], 'pa-athlete': ['1461896836934-ffe607ba8211', 1200],
  'pa-ip': ['1550751827-4bd374c3f58b', 1200], 'pa-cuba': ['1500759285222-a95626b934cb', 1200],
  'pa-bankruptcy': ['1567427017947-545c5f8d16ad', 1200], 'pa-realestate': ['1600596542815-ffad4c1539a9', 1200],
  'pa-family': ['1511632765486-a01980e01a18', 1200], 'pa-immigration': ['1488085061387-422e29b40080', 1200],
  'meeting': ['1517048676732-d65bc937f952', 1400], 'signing': ['1450101499163-c8848c66ca85', 1400],
};
await Promise.all(Object.entries(map).map(async ([name, [id, w]]) => {
  const r = await fetch(`https://images.unsplash.com/photo-${id}?w=${w}&q=72&auto=format&fm=jpg&fit=max`);
  if (!r.ok) return console.log('FAIL', name, r.status);
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(`public/images/photos/${name}.jpg`, buf);
  console.log(name, Math.round(buf.length / 1024) + 'KB');
}));
