import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Container, SplitHeadline, ease } from './ui.jsx';
import WaveLines from './WaveLines.jsx';

export function useMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | Diaz Reus International Law Firm` : 'Diaz Reus | International Law Firm';
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
      m.content = description;
    }
  }, [title, description]);
}

/**
 * Shared inner-page hero. Headline left (7 cols), intro right (5 cols) on the same
 * 12-col grid as the sections below; optional full-width image underneath.
 */
export default function PageHero({ eyebrow, title, intro, crumbs = [], image, imageAlt = '', children, accent }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-paper pb-section pt-10 md:pt-14">
      <WaveLines className="pointer-events-none absolute inset-x-0 top-0 h-[380px] w-full text-ink/[0.06]" />
      <Container className="relative">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-500">
            <li><Link to="/" className="hover:text-ink">Home</Link></li>
            {crumbs.map(c => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-ink-400" aria-hidden />
                {c.to ? <Link to={c.to} className="hover:text-ink">{c.label}</Link> : <span aria-current="page" className="text-ink">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10 md:mt-14">
          <div className="lg:col-span-7">
            {eyebrow && (
              <motion.span initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="eyebrow">{eyebrow}</motion.span>
            )}
            <SplitHeadline text={title} accent={accent} className="mt-6 text-h1 font-medium text-balance" delay={0.1} />
          </div>
          <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.35 }} className="lg:col-span-5">
            {intro && <p className="text-[17px] leading-relaxed text-ink-500 text-pretty">{intro}</p>}
            {children && <div className="mt-6">{children}</div>}
          </motion.div>
        </div>
        {image && (
          <motion.div
            className="mt-12 h-[260px] overflow-hidden rounded-xl2 sm:h-[380px] md:mt-16 lg:h-[460px]"
            initial={reduce ? false : { clipPath: 'inset(10% 6% 0% 6% round 24px)', opacity: 0.6 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 24px)', opacity: 1 }}
            transition={{ duration: 1.3, ease, delay: 0.3 }}
          >
            <motion.img src={image} alt={imageAlt} className="h-full w-full object-cover" initial={reduce ? false : { scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.8, ease, delay: 0.3 }} />
          </motion.div>
        )}
      </Container>
    </section>
  );
}
