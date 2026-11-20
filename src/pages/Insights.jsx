import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import PageHero, { useMeta } from '../components/PageHero.jsx';
import { Section, Container, Reveal } from '../components/ui.jsx';
import InsightCard, { formatDate } from '../components/InsightCard.jsx';
import { INSIGHTS, MORE_NEWS, MORE_ARTICLES } from '../data/site.js';

const TABS = [{ k: 'All', l: 'All' }, { k: 'Article', l: 'Articles & Publications' }, { k: 'News', l: 'News & Events' }];

export default function Insights() {
  useMeta('Insights', 'Legal developments, regulatory analysis, publications and firm news from Diaz Reus International Law Firm.');
  const [tab, setTab] = useState('All');
  const list = INSIGHTS.filter(i => tab === 'All' || i.type === tab);
  const [feature, ...rest] = list;
  return (
    <>
      <PageHero
        eyebrow="Insights" crumbs={[{ label: 'Insights' }]}
        title={'News, articles\n& publications.'} accent={['&', 'publications.']}
        intro="Legal developments, international business and regulatory updates, publications and firm announcements from our attorneys worldwide."
      />
      <Section tone="light" className="!pt-0">
        <Container>
          <div className="no-scrollbar flex gap-2 overflow-x-auto" role="tablist" aria-label="Insight type">
            {TABS.map(t => (
              <button key={t.k} role="tab" aria-selected={tab === t.k} onClick={() => setTab(t.k)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${tab === t.k ? 'bg-ink text-white' : 'bg-mist text-ink-600 hover:bg-mist-200'}`}>{t.l}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              {feature && (
                <a href={feature.href} target="_blank" rel="noopener noreferrer" className="group mt-10 grid overflow-hidden rounded-xl2 bg-ink text-white lg:grid-cols-12">
                  <div className="aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto lg:h-full">
                    <img src={feature.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col p-7 sm:p-10 lg:col-span-5">
                    <span className="eyebrow eyebrow-light w-fit">{feature.category}</span>
                    <h2 className="mt-6 text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium leading-tight tracking-tight">{feature.title}</h2>
                    <p className="mt-4 text-white/65">{feature.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between pt-10 text-sm">
                      <time dateTime={feature.date} className="text-white/50">{formatDate(feature.date)} · {feature.type}</time>
                      <span className="inline-flex items-center gap-1 font-medium"><span className="link-underline">Read more</span><ArrowUpRight className="h-4 w-4" /></span>
                    </div>
                  </div>
                </a>
              )}
              <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((it, i) => <InsightCard key={it.href} item={it} index={i} />)}
              </div>
            </motion.div>
          </AnimatePresence>
          <Reveal className="mt-14 flex flex-wrap justify-center gap-3">
            <a href={MORE_NEWS} target="_blank" rel="noopener noreferrer" className="btn btn-outline">News & Events archive <ArrowUpRight className="h-4 w-4" /></a>
            <a href={MORE_ARTICLES} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Articles & Publications archive <ArrowUpRight className="h-4 w-4" /></a>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
