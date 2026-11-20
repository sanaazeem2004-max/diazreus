import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import PageHero, { useMeta } from '../components/PageHero.jsx';
import { Section, Container } from '../components/ui.jsx';
import AttorneyCard from '../components/AttorneyCard.jsx';
import AttorneyDrawer from '../components/AttorneyDrawer.jsx';
import { PEOPLE } from '../data/people.generated.js';
import { OFFICES, REGIONS } from '../data/offices.generated.js';
import { PRACTICES } from '../data/practices.js';

const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function Select({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <select value={value} onChange={e => onChange(e.target.value)} className="mt-1.5 h-11 w-full cursor-pointer rounded-full border border-line bg-white px-4 text-sm focus:border-ink focus:outline-none focus:ring-0">
        {children}
      </select>
    </label>
  );
}

export function Directory({ people, title = 'attorneys' }) {
  const [params, setParams] = useSearchParams();
  const region = params.get('region') || '';
  const office = params.get('office') || '';
  const practice = params.get('practice') || '';
  const q = params.get('q') || '';
  const [open, setOpen] = useState(null);

  const setParam = (k, v) => {
    const next = new URLSearchParams(params);
    v ? next.set(k, v) : next.delete(k);
    if (k === 'region') next.delete('office');
    next.delete('person');
    setParams(next, { replace: true });
  };

  useEffect(() => {
    const slug = params.get('person');
    if (slug) setOpen(people.find(p => p.slug === slug) || null);
  }, [params, people]);

  const officesWithPeople = OFFICES.filter(o => people.some(p => p.office === o.slug) && (!region || o.region === region));
  const list = useMemo(() => people.filter(p =>
    (!region || p.region === region) &&
    (!office || p.office === office) &&
    (!practice || p.practices.includes(practice)) &&
    (!q || norm(`${p.name} ${p.title}`).includes(norm(q)))
  ), [people, region, office, practice, q]);
  const active = [region, office, practice, q].filter(Boolean).length;

  return (
    <>
      <div className="rounded-xl2 bg-mist p-4 sm:p-6">
        <div className="flex items-center gap-2 text-sm font-medium"><SlidersHorizontal className="h-4 w-4" aria-hidden /> Filter the directory</div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className="field-label">Name</span>
            <span className="relative mt-1.5 block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
              <input type="search" value={q} onChange={e => setParam('q', e.target.value)} placeholder="Search by name" className="h-11 w-full rounded-full border border-line bg-white pl-11 pr-4 text-sm focus:border-ink focus:outline-none focus:ring-0" />
            </span>
          </label>
          <Select label="Region" value={region} onChange={v => setParam('region', v)}>
            <option value="">All regions</option>
            {REGIONS.filter(r => people.some(p => p.region === r)).map(r => <option key={r} value={r}>{r}</option>)}
          </Select>
          <Select label="Office" value={office} onChange={v => setParam('office', v)}>
            <option value="">All offices</option>
            {officesWithPeople.map(o => <option key={o.slug} value={o.slug}>{o.city}, {o.country}</option>)}
          </Select>
          <Select label="Practice area" value={practice} onChange={v => setParam('practice', v)}>
            <option value="">All practice areas</option>
            {PRACTICES.map(p => <option key={p.slug} value={p.slug}>{p.title}</option>)}
          </Select>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-500" aria-live="polite">{list.length} {list.length === 1 ? title.replace(/s$/, '') : title}</p>
        {active > 0 && <button onClick={() => setParams({}, { replace: true })} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm hover:border-ink"><X className="h-3.5 w-3.5" />Clear filters ({active})</button>}
      </div>

      <motion.ul layout className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.li key={p.slug} id={p.slug} layout exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}>
              <AttorneyCard person={p} index={i} onOpen={setOpen} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {list.length === 0 && (
        <div className="rounded-card bg-mist py-16 text-center">
          <p className="text-lg font-medium">No {title} match these filters.</p>
          <button onClick={() => setParams({}, { replace: true })} className="btn btn-outline mt-5">Reset filters</button>
        </div>
      )}
      <AttorneyDrawer person={open} onClose={() => { setOpen(null); if (params.get('person')) { const n = new URLSearchParams(params); n.delete('person'); setParams(n, { replace: true }); } }} />
    </>
  );
}

export default function AttorneysPage() {
  useMeta('Attorneys & Counselors', 'Diaz Reus attorneys and counselors in North America, Latin America, Europe and the Middle East & Asia. Filter by region, office, practice area and name.');
  const attorneys = PEOPLE.filter(p => p.type === 'attorney');
  return (
    <>
      <PageHero
        eyebrow="Attorneys & Counselors" crumbs={[{ label: 'Attorneys' }]}
        title={'Reach, experience,\nacute know-how.'} accent={['acute', 'know-how.']}
        intro="From our Miami, Florida headquarters and offices around the world, Diaz Reus attorneys help companies, government entities and individuals transact business and resolve disputes at home and abroad."
      />
      <Section tone="light" className="!pt-0">
        <Container>
          <Directory people={attorneys} />
          <p className="mt-16 max-w-3xl border-t border-line pt-6 text-[13px] leading-relaxed text-ink-500">
            Diaz, Reus &amp; Targ LLP is an international legal practice providing client services worldwide through its member firms and affiliates. Any reference to a “partner” means a person who is a partner, member, consultant, or employee with equivalent standing and qualifications in one of Diaz Reus’ member firms or affiliates. Practice-area filters are matched from each attorney’s published biography.
          </p>
        </Container>
      </Section>
    </>
  );
}
