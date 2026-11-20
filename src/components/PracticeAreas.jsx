import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Container, SectionHeading, Button } from './ui.jsx';
import PracticeCard from './PracticeCard.jsx';
import { PRACTICES, PRACTICE_GROUPS } from '../data/practices.js';

export default function PracticeAreas() {
  const [group, setGroup] = useState('All');
  const list = group === 'All' ? PRACTICES : PRACTICES.filter(p => p.group === group);
  return (
    <Section tone="light" id="practice-areas" aria-labelledby="practice-heading">
      <Container>
        <SectionHeading
          id="practice-heading"
          eyebrow="Areas of Practice"
          title="Acute know-how is the hallmark of our international attorneys."
          intro="Multicultural, multilingual attorneys providing international legal representation in high-stakes litigation and precedent-setting matters."
          align="split"
        />
        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter practice areas">
          {['All', ...PRACTICE_GROUPS].map(g => (
            <button
              key={g} role="tab" aria-selected={group === g} onClick={() => setGroup(g)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${group === g ? 'bg-ink text-white' : 'bg-mist text-ink-600 hover:bg-mist-200'}`}
            >
              {g} <span className={`ml-1 text-xs ${group === g ? 'text-white/60' : 'text-ink-400'}`}>{g === 'All' ? PRACTICES.length : PRACTICES.filter(p => p.group === g).length}</span>
            </button>
          ))}
        </div>
        <motion.ul layout className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.li key={p.slug} layout exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4 }}>
                <PracticeCard practice={p} index={i} compact />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        <div className="mt-12 flex justify-center">
          <Button to="/areas-of-practice" variant="outline">Explore all areas of practice</Button>
        </div>
      </Container>
    </Section>
  );
}
