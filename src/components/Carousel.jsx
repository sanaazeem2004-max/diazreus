import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/** Scroll-snap carousel with arrows + progress bar (keyboard and touch friendly). */
export default function Carousel({ children, tone = 'light', label = 'Carousel', itemClass = 'w-[78%] sm:w-[44%] lg:w-[calc((100%-60px)/4)]', resetKey }) {
  const track = useRef(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const dark = tone === 'dark';

  const update = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setAtStart(el.scrollLeft < 4);
    setAtEnd(el.scrollLeft > max - 4);
  };
  useEffect(() => { track.current?.scrollTo({ left: 0 }); update(); }, [resetKey]);
  useEffect(() => { window.addEventListener('resize', update); return () => window.removeEventListener('resize', update); }, []);

  const step = dir => {
    const el = track.current;
    const card = el.querySelector('[data-slide]');
    el.scrollBy({ left: dir * ((card?.offsetWidth || 300) + 20), behavior: 'smooth' });
  };

  const items = Array.isArray(children) ? children : [children];
  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={track} onScroll={update} className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-2">
        {items.map((c, i) => <div key={i} data-slide className={`shrink-0 snap-start ${itemClass}`}>{c}</div>)}
      </div>
      <div className="mt-8 flex items-center gap-6">
        <div className={`relative h-px flex-1 ${dark ? 'bg-white/15' : 'bg-line'}`}>
          <div className={`absolute left-0 top-[-0.5px] h-[2px] transition-[width] duration-300 ${dark ? 'bg-white' : 'bg-ink'}`} style={{ width: `${Math.max(8, progress * 100)}%` }} />
        </div>
        <div className="flex gap-2">
          {[[-1, ArrowLeft, 'Previous', atStart], [1, ArrowRight, 'Next', atEnd]].map(([d, Icon, l, disabled]) => (
            <button key={l} onClick={() => step(d)} disabled={disabled} aria-label={l}
              className={`grid h-11 w-11 place-items-center rounded-full border transition-colors disabled:opacity-30 ${dark ? 'border-white/25 hover:bg-white hover:text-ink' : 'border-line hover:bg-ink hover:text-white'} ${d === 1 && !disabled ? (dark ? 'bg-white text-ink' : 'bg-ink text-white') : ''}`}>
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
