import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ease } from './ui.jsx';

export const formatDate = iso => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default function InsightCard({ item, index = 0, tone = 'light' }) {
  const dark = tone === 'dark';
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.7, ease, delay: (index % 3) * 0.08 }} className="h-full"
    >
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-ink-700">
          <img src={item.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105" />
          <span className="absolute left-3 top-3 eyebrow eyebrow-light">{item.category}</span>
        </div>
        <div className={`flex flex-1 flex-col border-b pb-5 pt-5 ${dark ? 'border-white/15' : 'border-line'}`}>
          <h3 className="line-clamp-3 text-[18px] font-semibold leading-snug tracking-tight">{item.title}</h3>
          <p className={`mt-2 line-clamp-2 text-[14px] leading-relaxed ${dark ? 'text-white/60' : 'text-ink-500'}`}>{item.excerpt}</p>
          <div className={`mt-auto flex items-center justify-between pt-5 text-[12px] font-medium uppercase tracking-[0.08em] ${dark ? 'text-white/50' : 'text-ink-400'}`}>
            <time dateTime={item.date}>{formatDate(item.date)} · {item.type}</time>
            <span className={`inline-flex items-center gap-1 normal-case tracking-normal ${dark ? 'text-white' : 'text-ink'}`}>
              <span className="link-underline text-[13px]">Read more</span><ArrowUpRight className="h-4 w-4" aria-hidden />
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}
