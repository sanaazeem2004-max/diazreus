import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { Section, Container, Eyebrow, Reveal, ease } from './ui.jsx';
import { TESTIMONIALS } from '../data/site.js';

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = TESTIMONIALS.length;
  const go = d => setI(v => (v + d + n) % n);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => go(1), 8000);
    return () => clearInterval(t);
  }, [paused, reduce]);

  const t = TESTIMONIALS[i];
  return (
    <Section tone="light" aria-labelledby="testimonials-heading">
      <Container className="grid gap-10 lg:grid-cols-12" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
        <Reveal className="lg:col-span-4">
          <Eyebrow>Client Perspective</Eyebrow>
          <h2 id="testimonials-heading" className="mt-5 text-h2 font-medium text-balance">What clients and guides say.</h2>
          <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-ink-500">Independent commentary from Chambers, The Legal 500 and our clients, as published on diazreus.com.</p>
          <div className="mt-10 flex items-center gap-4">
            <button onClick={() => go(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-line hover:bg-ink hover:text-white" aria-label="Previous testimonial"><ArrowLeft className="h-4 w-4" /></button>
            <button onClick={() => go(1)} className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white hover:bg-brand" aria-label="Next testimonial"><ArrowRight className="h-4 w-4" /></button>
            <span className="ml-2 text-sm tabular-nums text-ink-500" aria-live="polite">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
          </div>
        </Reveal>
        <div className="relative min-h-[340px] rounded-xl2 bg-mist p-8 sm:p-12 lg:col-span-8">
          <Quote className="h-10 w-10 text-brand" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.figure key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6, ease }}>
              <blockquote className={`mt-6 font-serif leading-[1.15] tracking-[-0.01em] text-balance ${t.quote.length > 200 ? 'text-2xl sm:text-[28px]' : 'text-3xl sm:text-[40px]'}`}>“{t.quote}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-3 text-sm">
                <span className="h-px w-10 bg-ink" aria-hidden />
                <span className="font-semibold">{t.source}</span>{t.year && <span className="text-ink-500">{t.year}</span>}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <div className="absolute bottom-6 right-8 flex gap-1.5" aria-hidden>
            {TESTIMONIALS.map((_, k) => <span key={k} className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? 'w-6 bg-ink' : 'w-1.5 bg-ink/20'}`} />)}
          </div>
        </div>
      </Container>
    </Section>
  );
}
