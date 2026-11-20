import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, MapPin, Phone, Mail, ArrowUpRight, Users } from 'lucide-react';
import PageHero, { useMeta } from '../components/PageHero.jsx';
import { Section, Container, ease } from '../components/ui.jsx';
import WorldMap from '../components/WorldMap.jsx';
import { OFFICES, REGIONS } from '../data/offices.generated.js';
import { PEOPLE } from '../data/people.generated.js';

const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function OfficeCard({ o, active, onFocus }) {
  const count = PEOPLE.filter(p => p.office === o.slug).length;
  return (
    <motion.article
      layout id={`office-${o.slug}`} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.35, ease }}
      onMouseEnter={() => onFocus(o.slug)}
      className={`flex h-full flex-col rounded-card p-6 transition-colors duration-300 ${active ? 'bg-ink text-white' : 'bg-mist'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-eyebrow font-semibold uppercase ${active ? 'text-white/50' : 'text-ink-400'}`}>{o.hq ? 'Headquarters' : o.region}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">{o.city}</h3>
          <p className={`text-[14px] ${active ? 'text-white/60' : 'text-ink-500'}`}>{o.country}</p>
        </div>
        <MapPin className={`h-5 w-5 shrink-0 ${active ? 'text-brand-light' : 'text-brand'}`} aria-hidden />
      </div>
      <address className={`mt-5 text-[14px] not-italic leading-relaxed ${active ? 'text-white/75' : 'text-ink-600'}`}>{o.address}</address>
      <ul className="mt-5 grid gap-2 text-[14px]">
        <li><a href={`tel:${o.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2 hover:underline"><Phone className="h-4 w-4 opacity-60" aria-hidden />{o.phone}</a></li>
        {o.email && <li><a href={`mailto:${o.email}`} className="inline-flex items-center gap-2 break-all hover:underline"><Mail className="h-4 w-4 shrink-0 opacity-60" aria-hidden />{o.email}</a></li>}
      </ul>
      <div className={`mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4 text-[13px] font-medium ${active ? 'border-white/15' : 'border-line'}`} style={{ marginTop: 'auto' }}>
        <a href={o.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">View on Google Maps <ArrowUpRight className="h-3.5 w-3.5" /></a>
        {count > 0 && <Link to={`/attorneys?office=${o.slug}`} className="inline-flex items-center gap-1 hover:underline"><Users className="h-3.5 w-3.5" />{count} {count === 1 ? 'attorney' : 'attorneys'}</Link>}
      </div>
    </motion.article>
  );
}

export default function Offices() {
  useMeta('Offices Around the World', 'Diaz Reus has 41 offices in key business centers across North America, Latin America, Europe, the Middle East, Asia and Africa.');
  const [params, setParams] = useSearchParams();
  const region = params.get('region') || 'All';
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState(params.get('office') || 'miami');
  const listRef = useRef(null);

  useEffect(() => {
    const slug = params.get('office');
    if (!slug) return;
    setFocus(slug);
    const t = setTimeout(() => document.getElementById(`office-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 500);
    return () => clearTimeout(t);
  }, [params]);

  const setRegion = r => { const n = new URLSearchParams(params); r === 'All' ? n.delete('region') : n.set('region', r); n.delete('office'); setParams(n, { replace: true }); };
  const list = useMemo(() => OFFICES.filter(o => (region === 'All' || o.region === region) && (!q || norm(`${o.city} ${o.country} ${o.address}`).includes(norm(q)))), [region, q]);
  const focused = OFFICES.find(o => o.slug === focus);

  const select = o => {
    setFocus(o.slug);
    document.getElementById(`office-${o.slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      <PageHero
        eyebrow="Global Offices" crumbs={[{ label: 'Global Offices' }]}
        title={'Offices around\nthe world.'} accent={['the', 'world.']}
        intro="Diaz Reus international offices in key business centers offer legal services in the USA, Canada, Latin America, Europe, Asia, Africa and the Middle East."
      />

      <Section tone="dark" className="!py-12 md:!py-16">
        <Container>
          <div className="relative rounded-xl2 bg-white/[0.03] p-3 ring-1 ring-white/10 sm:p-8">
            <WorldMap activeRegion={region} activeOffice={focus} onSelect={select} onHover={o => o && setFocus(o.slug)} />
            <AnimatePresence mode="wait">
              {focused && (
                <motion.div key={focused.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                  className="mt-4 rounded-2xl bg-white p-4 text-ink sm:absolute sm:bottom-8 sm:left-8 sm:mt-0 sm:max-w-xs">
                  <p className="text-eyebrow font-semibold uppercase text-ink-400">{focused.hq ? 'Headquarters' : focused.region}</p>
                  <p className="mt-1 font-semibold">{focused.city}, <span className="font-normal text-ink-500">{focused.country}</span></p>
                  <p className="mt-1 text-[13px] text-ink-500">{focused.address}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="no-scrollbar flex gap-2 overflow-x-auto" role="tablist" aria-label="Filter offices by region">
              {['All', ...REGIONS].map(r => (
                <button key={r} role="tab" aria-selected={region === r} onClick={() => setRegion(r)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${region === r ? 'bg-ink text-white' : 'bg-mist text-ink-600 hover:bg-mist-200'}`}>
                  {r} <span className="ml-1 text-xs opacity-60">{r === 'All' ? OFFICES.length : OFFICES.filter(o => o.region === r).length}</span>
                </button>
              ))}
            </div>
            <label className="relative block md:w-80">
              <span className="sr-only">Search offices</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
              <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search city, country or address" className="h-11 w-full rounded-full border border-line pl-11 pr-4 text-sm focus:border-ink focus:outline-none" />
            </label>
          </div>
          <p className="mt-6 text-sm text-ink-500" aria-live="polite">{list.length} {list.length === 1 ? 'office' : 'offices'}</p>
          <motion.div ref={listRef} layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            <AnimatePresence mode="popLayout">
              {list.map(o => <OfficeCard key={o.slug} o={o} active={focus === o.slug} onFocus={setFocus} />)}
            </AnimatePresence>
          </motion.div>
          {list.length === 0 && <p className="rounded-card bg-mist py-14 text-center text-ink-500">No office matches “{q}”.</p>}
          <p className="mt-14 max-w-3xl border-t border-line pt-6 text-[13px] leading-relaxed text-ink-500">
            Diaz, Reus &amp; Targ LLP is an international legal practice providing client services worldwide through its member firms and affiliates. Any reference to a “partner” means a person who is a partner, member, consultant, or employee with equivalent standing and qualifications in one of Diaz Reus’ member firms or affiliates.
          </p>
        </Container>
      </Section>
    </>
  );
}
