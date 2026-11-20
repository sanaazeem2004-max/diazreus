import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Mail, Phone, MapPin, Linkedin, ArrowUpRight, Quote } from 'lucide-react';
import { getPractice } from '../data/practices.js';
import { ease } from './ui.jsx';

/** Slide-in attorney profile (bio + contact), with focus management and Esc to close. */
export default function AttorneyDrawer({ person, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    if (!person) return;
    const prev = document.activeElement;
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeRef.current?.focus(), 60);
    const onKey = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); prev?.focus?.(); };
  }, [person, onClose]);

  return (
    <AnimatePresence>
      {person && (
        <motion.div className="fixed inset-0 z-[75] flex justify-end bg-ink/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.aside
            role="dialog" aria-modal="true" aria-labelledby="drawer-name"
            className="flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.55, ease }}
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-white/95 px-6 py-4 backdrop-blur">
              <span className="eyebrow">{person.type === 'investigator' ? 'Investigator' : 'Attorney profile'}</span>
              <button ref={closeRef} onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full border border-line hover:border-ink" aria-label="Close profile"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex gap-5">
                <img src={person.photo} alt={`Portrait of ${person.name}`} className="h-32 w-28 shrink-0 rounded-2xl object-cover object-[50%_22%] sm:h-40 sm:w-32" />
                <div className="min-w-0">
                  <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-400">{person.title}</p>
                  <h2 id="drawer-name" className="mt-1 text-2xl font-medium tracking-tight sm:text-3xl">{person.name}</h2>
                  {person.officeLabel && <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-ink-500"><MapPin className="h-4 w-4" />{person.officeLabel}</p>}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {person.email && <a href={`mailto:${person.email}`} className="btn btn-dark !px-4 !py-2.5"><Mail className="h-4 w-4" />{person.email}</a>}
                {person.phone && <a href={`tel:${person.phone.replace(/[^\d+]/g, '')}`} className="btn btn-outline !px-4 !py-2.5"><Phone className="h-4 w-4" />{person.phone}</a>}
                {person.linkedin && <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline !px-4 !py-2.5" aria-label={`${person.name} on LinkedIn`}><Linkedin className="h-4 w-4" /></a>}
              </div>

              {person.quotes?.length > 0 && (
                <figure className="mt-8 rounded-card bg-mist p-6">
                  <Quote className="h-5 w-5 text-brand" aria-hidden />
                  <blockquote className="mt-3 font-serif text-xl leading-snug">“{person.quotes[0].q}”</blockquote>
                  <figcaption className="mt-3 text-sm text-ink-500">— {person.quotes[0].src}</figcaption>
                </figure>
              )}

              {person.bio?.length > 0 && (
                <section className="prose-dr mt-8" aria-label="Biography">
                  <h3 className="mb-4 text-eyebrow font-semibold uppercase text-ink-400">Biography</h3>
                  {person.bio.map((p, i) => <p key={i}>{p}</p>)}
                </section>
              )}

              {person.practices?.length > 0 && (
                <section className="mt-8">
                  <h3 className="text-eyebrow font-semibold uppercase text-ink-400">Related practice areas</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {person.practices.map(s => getPractice(s)).filter(Boolean).map(p => (
                      <li key={p.slug}><Link to={`/areas-of-practice/${p.slug}`} onClick={onClose} className="inline-block rounded-full bg-mist px-3 py-1.5 text-[13px] hover:bg-ink hover:text-white">{p.title}</Link></li>
                    ))}
                  </ul>
                </section>
              )}

              <a href={person.profileUrl} target="_blank" rel="noopener noreferrer" className="group mt-10 inline-flex items-center gap-1.5 text-sm font-medium">
                <span className="link-underline">Full profile on diazreus.com</span><ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
