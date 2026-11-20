import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, MapPin, ArrowUpRight, Phone } from 'lucide-react';
import { Section, Container, SectionHeading, Button, ease } from './ui.jsx';
import WorldMap from './WorldMap.jsx';
import { OFFICES, REGIONS } from '../data/offices.generated.js';

const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function GlobalPresence() {
  const [region, setRegion] = useState('All');
  const [query, setQuery] = useState('');
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(OFFICES.find(o => o.hq));

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    return OFFICES.filter(o => (region === 'All' || o.region === region) && (!q || norm(`${o.city} ${o.country}`).includes(q)));
  }, [region, query]);

  const focus = hover || selected;

  return (
    <Section tone="dark" id="global-presence" aria-labelledby="global-heading" className="overflow-hidden">
      <Container>
        <SectionHeading
          tone="light"
          eyebrow="Offices Around the World"
          id="global-heading"
          title={<>A global footprint in the world’s <span className="font-serif font-normal italic text-brand-light">business centers.</span></>}
          intro={`${OFFICES.length} offices across North America, Latin America, Europe, the Middle East, Asia and Africa — coordinated from our Miami headquarters.`}
          align="split"
        />

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1" role="tablist" aria-label="Filter by region">
            {['All', ...REGIONS].map(r => (
              <button key={r} role="tab" aria-selected={region === r} onClick={() => setRegion(r)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${region === r ? 'bg-white text-ink' : 'bg-white/[0.07] text-white/70 hover:bg-white/15 hover:text-white'}`}>
                {r}<span className="ml-1.5 text-xs opacity-60">{r === 'All' ? OFFICES.length : OFFICES.filter(o => o.region === r).length}</span>
              </button>
            ))}
          </div>
          <label className="relative block md:w-72">
            <span className="sr-only">Search offices</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search a city or country" className="h-11 w-full rounded-full border border-white/15 bg-white/[0.06] pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none" />
          </label>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-xl2 bg-white/[0.03] p-3 ring-1 ring-white/10 sm:p-6 lg:col-span-8 lg:flex lg:min-h-[520px] lg:items-center">
            <WorldMap activeRegion={region} activeOffice={focus?.slug} onSelect={setSelected} onHover={setHover} />
            <AnimatePresence mode="wait">
              {focus && (
                <motion.div key={focus.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }}
                  className="pointer-events-none absolute bottom-4 left-4 hidden rounded-2xl bg-white px-4 py-3 text-ink shadow-xl sm:bottom-6 sm:left-6 sm:block">
                  <p className="text-eyebrow font-semibold uppercase text-ink-400">{focus.hq ? 'Headquarters' : focus.region}</p>
                  <p className="mt-1 font-semibold">{focus.city}<span className="font-normal text-ink-500">, {focus.country}</span></p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative lg:col-span-4">
          <div className="flex flex-col rounded-xl2 bg-white/[0.04] ring-1 ring-white/10 lg:absolute lg:inset-0">
            <p className="border-b border-white/10 px-5 py-4 text-sm text-white/60" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'office' : 'offices'}</p>
            <ul className="no-scrollbar max-h-[320px] min-h-0 flex-1 overflow-y-auto p-2 lg:max-h-none">
              {filtered.map(o => (
                <li key={o.slug}>
                  <button onClick={() => setSelected(o)} onMouseEnter={() => setHover(o)} onMouseLeave={() => setHover(null)}
                    className={`group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${focus?.slug === o.slug ? 'bg-white/10' : 'hover:bg-white/[0.06]'}`}>
                    <span className="flex items-center gap-3">
                      <MapPin className={`h-4 w-4 ${o.hq ? 'text-white' : 'text-brand-light'}`} aria-hidden />
                      <span><span className="block text-[15px] font-medium">{o.city}</span><span className="block text-[13px] text-white/50">{o.country}</span></span>
                    </span>
                    {o.hq && <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink">HQ</span>}
                  </button>
                </li>
              ))}
              {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-white/50">No office matches “{query}”.</li>}
            </ul>
            {selected && (
              <div className="border-t border-white/10 p-5">
                <p className="text-[15px] font-semibold">{selected.city}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-white/60">{selected.address}</p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
                  <a href={`tel:${selected.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-1.5 text-white/80 hover:text-white"><Phone className="h-3.5 w-3.5" />{selected.phone}</a>
                  <Link to={`/offices?office=${selected.slug}`} className="inline-flex items-center gap-1 text-white hover:underline">Office details <ArrowUpRight className="h-3.5 w-3.5" /></Link>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center"><Button to="/offices" variant="light">Explore our locations</Button></div>
      </Container>
    </Section>
  );
}
