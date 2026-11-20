import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import PageHero, { useMeta } from '../components/PageHero.jsx';
import { Section, Container } from '../components/ui.jsx';
import PracticeCard from '../components/PracticeCard.jsx';
import { PRACTICES, PRACTICE_GROUPS } from '../data/practices.js';

export default function AreasOfPractice() {
  useMeta('Areas of Practice', 'Explore Diaz Reus areas of practice: international litigation and arbitration, white collar crime, fraud and asset recovery, compliance, M&A, blockchain, IP, real estate, immigration and more.');
  const [q, setQ] = useState('');
  const [group, setGroup] = useState('All');
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return PRACTICES.filter(p => (group === 'All' || p.group === group) && (!t || (p.title + ' ' + p.short + ' ' + p.services.join(' ')).toLowerCase().includes(t)));
  }, [q, group]);

  return (
    <>
      <PageHero
        eyebrow="Areas of Practice" crumbs={[{ label: 'Areas of Practice' }]}
        title={'Sixteen practices.\nOne global team.'} accent={['One', 'global', 'team.']}
        intro="Diaz Reus offers U.S. and international legal services. Multicultural, multilingual attorneys provide international legal representation in high-stakes litigation and precedent-setting legal matters in various areas of practice."
      />
      <Section tone="light" className="!pt-0">
        <Container>
          <div className="sticky top-2 z-20 -mx-2 flex flex-col gap-3 rounded-2xl bg-white/90 p-2 backdrop-blur-md md:flex-row md:items-center md:justify-between">
            <div className="no-scrollbar flex gap-2 overflow-x-auto" role="tablist" aria-label="Practice groups">
              {['All', ...PRACTICE_GROUPS].map(g => (
                <button key={g} role="tab" aria-selected={group === g} onClick={() => setGroup(g)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${group === g ? 'bg-ink text-white' : 'bg-mist text-ink-600 hover:bg-mist-200'}`}>{g}</button>
              ))}
            </div>
            <label className="relative block md:w-80">
              <span className="sr-only">Search practice areas</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
              <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search practice areas" className="h-11 w-full rounded-full border border-line bg-white pl-11 pr-10 text-sm focus:border-ink focus:outline-none" />
              {q && <button onClick={() => setQ('')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-400 hover:text-ink" aria-label="Clear search"><X className="h-4 w-4" /></button>}
            </label>
          </div>
          <p className="mt-6 text-sm text-ink-500" aria-live="polite">Showing {list.length} of {PRACTICES.length} practice areas</p>
          <motion.ul layout className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.li key={p.slug} layout exit={{ opacity: 0, scale: 0.97 }}><PracticeCard practice={p} index={i} /></motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
          {list.length === 0 && (
            <div className="rounded-card bg-mist py-16 text-center">
              <p className="text-lg font-medium">No practice areas match “{q}”.</p>
              <button onClick={() => { setQ(''); setGroup('All'); }} className="btn btn-outline mt-5">Reset filters</button>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
