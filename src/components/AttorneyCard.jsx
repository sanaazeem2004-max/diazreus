import { motion } from 'framer-motion';
import { Mail, MapPin, Plus } from 'lucide-react';
import { ease } from './ui.jsx';

export default function AttorneyCard({ person, onOpen, index = 0, tone = 'light' }) {
  const dark = tone === 'dark';
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -5% 0px' }}
      transition={{ duration: 0.7, ease, delay: (index % 4) * 0.06 }}
      className="group flex h-full flex-col"
    >
      <button onClick={() => onOpen?.(person)} className="relative block overflow-hidden rounded-card text-left" aria-label={`View profile of ${person.name}`}>
        <div className={`aspect-[4/5] overflow-hidden ${dark ? 'bg-ink-700' : 'bg-mist'}`}>
          <img src={person.photo} alt={`Portrait of ${person.name}`} loading="lazy" decoding="async" className="h-full w-full object-cover object-[50%_22%] transition-transform duration-700 ease-premium group-hover:scale-[1.04]" />
        </div>
        <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-white text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <Plus className="h-4 w-4" aria-hidden />
        </span>
      </button>
      <div className="flex flex-1 flex-col pt-4">
        <p className={`text-[12px] font-medium uppercase tracking-[0.08em] ${dark ? 'text-white/50' : 'text-ink-400'}`}>{person.title}</p>
        <h3 className="mt-1 text-lg font-semibold leading-snug tracking-tight">
          <button onClick={() => onOpen?.(person)} className="link-underline text-left">{person.name}</button>
        </h3>
        <div className={`mt-auto flex items-center justify-between gap-3 pt-3 text-[13px] ${dark ? 'text-white/60' : 'text-ink-500'}`}>
          {person.officeLabel && <span className="inline-flex min-w-0 items-center gap-1.5"><MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden /><span className="truncate">{person.officeLabel}</span></span>}
          {person.email && (
            <a href={`mailto:${person.email}`} className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors ${dark ? 'border-white/15 hover:bg-white hover:text-ink' : 'border-line hover:bg-ink hover:text-white'}`} aria-label={`Email ${person.name}`}>
              <Mail className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
