import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, ArrowUpRight, Scale, User, MapPin, FileText } from 'lucide-react';
import { PRACTICES } from '../data/practices.js';
import { PEOPLE } from '../data/people.generated.js';
import { OFFICES } from '../data/offices.generated.js';
import { NAV } from '../data/site.js';

const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const INDEX = [
  ...NAV.flatMap(n => [n, ...(n.children || [])]).filter((v, i, a) => a.findIndex(x => x.to === v.to && x.label === v.label) === i).map(n => ({ kind: 'Page', label: n.label, sub: n.desc || '', to: n.to, icon: FileText })),
  ...PRACTICES.map(p => ({ kind: 'Practice', label: p.title, sub: p.short, to: `/areas-of-practice/${p.slug}`, icon: Scale })),
  ...PEOPLE.map(p => ({ kind: p.type === 'investigator' ? 'Investigator' : 'Attorney', label: p.name, sub: `${p.title}${p.officeLabel ? ' · ' + p.officeLabel : ''}`, to: p.type === 'investigator' ? `/investigators#${p.slug}` : `/attorneys?person=${p.slug}`, icon: User })),
  ...OFFICES.map(o => ({ kind: 'Office', label: o.city, sub: `${o.country} · ${o.region}`, to: `/offices?office=${o.slug}`, icon: MapPin })),
];

export default function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const t = norm(q.trim());
    if (!t) return INDEX.filter(i => i.kind === 'Practice').slice(0, 6);
    return INDEX.filter(i => norm(i.label + ' ' + i.sub).includes(t)).slice(0, 12);
  }, [q]);

  useEffect(() => { if (open) { setQ(''); setActive(0); setTimeout(() => inputRef.current?.focus(), 50); } }, [open]);
  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
      if (e.key === 'Enter' && results[active]) { go(results[active]); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const go = r => { onClose(); navigate(r.to); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] flex items-start justify-center bg-ink/60 px-4 pt-[12vh] backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            role="dialog" aria-modal="true" aria-label="Search the site"
            className="w-full max-w-2xl overflow-hidden rounded-card bg-white shadow-2xl"
            initial={{ y: 24, scale: 0.98, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search className="h-5 w-5 text-ink-400" aria-hidden />
              <input
                ref={inputRef} value={q} onChange={e => setQ(e.target.value)}
                placeholder="Search practices, attorneys, offices…"
                aria-label="Search" role="combobox" aria-expanded="true" aria-controls="search-results"
                className="h-16 flex-1 border-0 bg-transparent text-lg outline-none placeholder:text-ink-400 focus:ring-0"
              />
              <button onClick={onClose} className="rounded-full p-2 text-ink-500 hover:bg-mist" aria-label="Close search"><X className="h-5 w-5" /></button>
            </div>
            <ul id="search-results" role="listbox" className="max-h-[55vh] overflow-y-auto p-2">
              {!q && <li className="px-3 pb-1 pt-2 text-eyebrow font-semibold uppercase text-ink-400">Areas of practice</li>}
              {results.length === 0 && <li className="px-4 py-10 text-center text-ink-500">No results for “{q}”.</li>}
              {results.map((r, i) => {
                const Icon = r.icon;
                return (
                  <li key={r.kind + r.label + r.to} role="option" aria-selected={i === active}>
                    <button
                      onMouseEnter={() => setActive(i)} onClick={() => go(r)}
                      className={`flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition-colors ${i === active ? 'bg-mist' : ''}`}
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white ring-1 ring-line"><Icon className="h-4 w-4 text-brand" aria-hidden /></span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{r.label}</span>
                        <span className="block truncate text-sm text-ink-500">{r.sub}</span>
                      </span>
                      <span className="hidden text-xs uppercase tracking-wider text-ink-400 sm:block">{r.kind}</span>
                      <ArrowUpRight className="h-4 w-4 text-ink-400" aria-hidden />
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
