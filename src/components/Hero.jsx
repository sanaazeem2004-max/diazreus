import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Pause, Play, Globe2, Languages, MapPin, ArrowUpRight } from 'lucide-react';
import { Container, Button, SplitHeadline, ease } from './ui.jsx';
import { FIRM } from '../data/site.js';

// Background loop used on the current diazreus.com homepage ("Homepage Loop 2022", Diaz Reus YouTube channel).
const VIDEO_ID = '4-1EvOdf8n8';
const VIDEO_SRC = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&disablekb=1&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&enablejsapi=1`;
const POSTER = '/images/brand/hero-video-poster.jpg';
const REGIONS_LINE = ['U.S.', 'Canada', 'Latin America', 'Europe', 'Asia', 'Africa', 'Middle East'];

function BackgroundVideo({ playing }) {
  const reduce = useReducedMotion();
  const frame = useRef(null);
  const [ready, setReady] = useState(false);

  // The poster covers the player whenever YouTube is not actively playing, so its own UI
  // (buffering spinner, big play button, prev/next, end screen, title bar) is never visible.
  // It is revealed only after playback has run steadily for a moment (3.5s the first time,
  // while the start-up title fades; 1.2s after a buffer or loop restart).
  useEffect(() => {
    if (reduce) return;
    let reveal;
    let firstPlay = true;
    const onMessage = e => {
      let host;
      try { host = new URL(e.origin).hostname; } catch { return; }
      if (!/youtube(-nocookie)?\.com$/.test(host)) return;
      let data;
      try { data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch { return; }
      const state = data?.info?.playerState;
      if (state === undefined) return;
      if (state === 1) {
        if (!reveal) reveal = setTimeout(() => setReady(true), firstPlay ? 3500 : 1200);
        firstPlay = false;
      } else {
        clearTimeout(reveal); reveal = undefined;
        setReady(false);
      }
    };
    window.addEventListener('message', onMessage);
    return () => { window.removeEventListener('message', onMessage); clearTimeout(reveal); };
  }, [reduce]);

  const send = (func) => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: [] }), '*');
  useEffect(() => { send(playing ? 'playVideo' : 'pauseVideo'); }, [playing]);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ containerType: 'size' }} aria-hidden>
      {!reduce && (
        <iframe
          ref={frame}
          src={`${VIDEO_SRC}&origin=${encodeURIComponent(window.location.origin)}`}
          title="Diaz Reus background video"
          tabIndex={-1}
          allow="autoplay; encrypted-media"
          onLoad={() => frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 'hero-bg' }), '*')}
          className="pointer-events-none absolute left-1/2 top-1/2 border-0"
          style={{ width: 'max(100cqw, 177.78cqh)', height: 'max(100cqh, 56.25cqw)', transform: 'translate(-50%, -50%) scale(1.18)' }}
        />
      )}
      <img
        src={POSTER} alt="" fetchpriority="high"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity ${ready && playing ? 'opacity-0 duration-[1200ms]' : 'opacity-100 duration-0'}`}
      />
      {/* Legibility overlays: dark wash, vignette and a brand-blue tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/45 to-ink/80" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_45%,transparent_0%,rgba(15,15,16,0.35)_100%)]" />
      <div className="absolute inset-0 bg-brand/20 mix-blend-multiply" />
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90]);
  const contentO = useTransform(scrollYProgress, [0, 0.7], reduce ? [1, 1] : [1, 0]);
  const fade = (d = 0) => ({ initial: reduce ? false : { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease, delay: d } });

  const stats = [
    { icon: Globe2, v: String(FIRM.officeCount), l: 'Offices across the Americas, Europe, the Middle East, Asia & Africa' },
    { icon: Languages, v: String(FIRM.spokenLanguages.length), l: 'Working languages, from Spanish and Portuguese to Mandarin and Arabic' },
    { icon: MapPin, v: 'Miami', l: 'Headquarters · Miami Tower at International Place' },
  ];

  return (
    <section ref={ref} className="bg-paper pb-section pt-4 md:pt-6" aria-labelledby="hero-title">
      <Container>
        <motion.div
          className="relative isolate flex h-[calc(100svh-var(--header-total,var(--header-h))-40px)] min-h-[600px] max-h-[880px] flex-col overflow-hidden rounded-xl2 bg-ink text-white"
          initial={reduce ? false : { clipPath: 'inset(6% 4% 6% 4% round 24px)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
          transition={{ duration: 1.3, ease }}
        >
          <BackgroundVideo playing={playing} />

          <motion.div style={{ y: contentY, opacity: contentO }} className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center sm:px-10">
            <motion.p {...fade(0.2)} className="eyebrow eyebrow-light">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              <span className="hidden sm:inline">Miami-headquartered · </span>International law firm
            </motion.p>
            <SplitHeadline
              id="hero-title"
              text={'Global Reach.\nLocal Grasp.'}
              accent={['Local', 'Grasp']}
              accentClass="text-brand-light"
              delay={0.35}
              className="mt-7 text-display font-medium [text-shadow:0_2px_30px_rgba(0,0,0,0.25)]"
            />
            <motion.p {...fade(0.75)} className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-white/80 md:text-lg text-pretty">
              Strategic legal representation across borders. Diaz Reus delivers sophisticated international legal solutions for businesses, institutions and individuals navigating complex global challenges.
            </motion.p>
            <motion.div {...fade(0.9)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button to="/areas-of-practice" variant="light">Explore Our Practice</Button>
              <Button to="/attorneys" variant="outline-light">Meet Our Attorneys</Button>
            </motion.div>
          </motion.div>

          {/* Bottom bar: the original site's regions line + video controls */}
          <motion.div {...fade(1.1)} className="relative z-10 flex items-end justify-between gap-4 p-4 sm:p-6">
            <p className="hidden max-w-xl text-[13px] font-medium uppercase tracking-[0.14em] text-white/70 md:block">
              {REGIONS_LINE.join(' · ')}
            </p>
            <div className="ml-auto flex items-center gap-2">
              <a href={FIRM.film} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white hover:text-ink">
                Watch the film <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              {!reduce && (
                <button
                  onClick={() => setPlaying(p => !p)}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white hover:text-ink"
                  aria-label={playing ? 'Pause background video' : 'Play background video'}
                  aria-pressed={!playing}
                >
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Credential strip on the shared 12-col grid */}
        <div className="mt-4 grid gap-4 md:mt-5 md:grid-cols-12 md:gap-5">
          <motion.div {...fade(1)} className="flex items-center gap-5 rounded-xl2 bg-mist p-5 md:col-span-12 lg:col-span-5">
            <div className="flex shrink-0 gap-2">
              <img src="/images/awards/fl-bar-intl-litigation.png" alt="Florida Bar Board Certified — International Litigation and Arbitration" className="h-16 w-16 rounded-xl bg-white object-contain p-1.5" />
              <img src="/images/awards/fl-bar-intl-law.png" alt="Florida Bar Board Certified — International Law" className="h-16 w-16 rounded-xl bg-white object-contain p-1.5" />
            </div>
            <p className="text-[15px] leading-snug"><span className="block font-semibold">Florida Bar Board Certified</span><span className="text-ink-500">International Litigation &amp; Arbitration · International Law</span></p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-3 md:col-span-12 md:gap-5 lg:col-span-7">
            {stats.map((s, i) => (
              <motion.div key={s.l} {...fade(1.05 + i * 0.05)} className="flex flex-col justify-between rounded-xl2 bg-mist p-5">
                <s.icon className="h-4 w-4 text-brand" aria-hidden />
                <p className="mt-4 text-3xl font-medium tracking-tight">{s.v}</p>
                <p className="mt-1 text-[13px] leading-snug text-ink-500">{s.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
