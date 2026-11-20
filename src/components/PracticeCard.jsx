import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ease } from './ui.jsx';

/** Equal-height practice card: fixed image ratio, 2-line clamp, footer pinned to bottom. */
export default function PracticeCard({ practice, index = 0, compact = false }) {
  const Icon = practice.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -5% 0px' }}
      transition={{ duration: 0.7, ease, delay: (index % 4) * 0.06 }}
      className="h-full"
    >
      <Link
        to={`/areas-of-practice/${practice.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-card bg-mist p-2 transition-colors duration-500 hover:bg-ink hover:text-white"
      >
        <div className={`relative overflow-hidden rounded-[14px] ${compact ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
          <img src={practice.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover grayscale-[35%] transition-all duration-700 ease-premium group-hover:scale-105 group-hover:grayscale-0" />
          <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-ink shadow-sm">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
        </div>
        <div className="flex flex-1 flex-col px-2 pb-2 pt-3 sm:px-3 sm:pb-3 sm:pt-4">
          <h3 className="text-[15px] font-semibold leading-snug tracking-tight sm:text-[17px]">{practice.title}</h3>
          <p className={`mt-2 line-clamp-3 text-[14px] leading-relaxed text-ink-500 transition-colors duration-500 group-hover:text-white/65 ${compact ? 'hidden sm:block' : ''}`}>{practice.short}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-medium">
            <span className="link-underline">Learn more</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
