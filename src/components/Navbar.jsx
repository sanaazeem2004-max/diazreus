import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Menu, X, ChevronDown, Phone, Globe, ArrowRight, ArrowUpRight } from 'lucide-react';
import Logo from './Logo.jsx';
import SearchOverlay from './SearchOverlay.jsx';
import { NAV, FIRM } from '../data/site.js';
import { PRACTICES, PRACTICE_GROUPS } from '../data/practices.js';
import { ease } from './ui.jsx';

function UtilityBar() {
  return (
    <div className="hidden border-b border-line bg-mist/70 text-[13px] text-ink-500 lg:block">
      <div className="container-x flex h-9 items-center justify-between">
        <div className="flex items-center gap-6">
          <a href={FIRM.phones[0].href} className="inline-flex items-center gap-1.5 hover:text-ink"><Phone className="h-3.5 w-3.5" aria-hidden /> {FIRM.phones[0].display}</a>
        </div>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5" aria-label="Language">
            <Globe className="h-3.5 w-3.5" aria-hidden />
            {FIRM.languages.map((l, i) => (
              <a key={l.code} href={l.href} hrefLang={l.code.toLowerCase()} className={`px-1 ${i === 0 ? 'font-semibold text-ink' : 'hover:text-ink'}`} aria-label={l.label}>{l.code}</a>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

function MegaPractice({ onNavigate }) {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-4 flex flex-col justify-between rounded-card bg-ink p-7 text-white">
        <div>
          <span className="eyebrow eyebrow-light">16 practice areas</span>
          <p className="mt-5 text-2xl font-medium leading-tight">Reach, experience and acute know-how — across borders.</p>
        </div>
        <Link to="/areas-of-practice" onClick={onNavigate} className="group mt-8 inline-flex items-center gap-2 text-sm font-medium">
          <span className="link-underline">View all areas of practice</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-6">
        {PRACTICE_GROUPS.map(g => (
          <div key={g}>
            <p className="mb-2 text-eyebrow font-semibold uppercase text-ink-400">{g}</p>
            <ul className="space-y-0.5">
              {PRACTICES.filter(p => p.group === g).map(p => (
                <li key={p.slug}>
                  <Link to={`/areas-of-practice/${p.slug}`} onClick={onNavigate} className="group flex items-center justify-between gap-3 rounded-lg py-1.5 text-[14px] text-ink-600 hover:text-ink">
                    <span className="link-underline">{p.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dropdown({ items, onNavigate }) {
  return (
    <ul className="grid gap-1">
      {items.map(c => (
        <li key={c.label}>
          <Link to={c.to} onClick={onNavigate} className="group block rounded-xl px-4 py-3 transition-colors hover:bg-mist">
            <span className="flex items-center justify-between text-[15px] font-medium">{c.label}<ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" aria-hidden /></span>
            {c.desc && <span className="mt-0.5 block text-[13px] text-ink-500">{c.desc}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef();
  const headerRef = useRef(null);
  const { pathname } = useLocation();

  // The header stays in place at the top of the page (it does not follow the scroll).
  // Its height is exposed as --header-total so the hero can fill the first screen below it.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--header-total', `${el.offsetHeight}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  useEffect(() => { setOpenMenu(null); setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);
  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearchOpen(true); }
      if (e.key === 'Escape') setOpenMenu(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const enter = label => { clearTimeout(closeTimer.current); setOpenMenu(label); };
  const leave = () => { closeTimer.current = setTimeout(() => setOpenMenu(null), 140); };
  const isActive = item => (item.to === '/' ? pathname === '/' : pathname.startsWith(item.to) || item.children?.some(c => pathname.startsWith(c.to)));
  const desktopItems = NAV.filter(n => n.label !== 'Home' && n.label !== 'Contact');

  return (
    <>
      <header ref={headerRef} className="relative z-50">
        <UtilityBar />
        <div className="border-b border-line bg-white">
          <nav aria-label="Primary" className="container-x relative flex h-[var(--header-h)] items-center justify-between gap-6">
            <Logo />
            <ul className="hidden items-center gap-1 lg:flex" onMouseLeave={leave}>
              {desktopItems.map(item => {
                const hasPanel = item.children || item.mega;
                const open = openMenu === item.label;
                return (
                  <li key={item.label} onMouseEnter={() => (hasPanel ? enter(item.label) : setOpenMenu(null))} className="static">
                    <div className="flex items-center">
                      <NavLink
                        to={item.to}
                        className={`group relative flex items-center gap-1 rounded-full px-3 py-2 text-[14px] font-medium transition-colors xl:px-3.5 ${isActive(item) ? 'text-ink' : 'text-ink-500 hover:text-ink'}`}
                      >
                        {item.label}
                        <span className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-500 ease-premium ${isActive(item) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} aria-hidden />
                      </NavLink>
                      {hasPanel && (
                        <button
                          aria-label={`${item.label} menu`} aria-expanded={open} aria-haspopup="true"
                          onClick={() => setOpenMenu(open ? null : item.label)}
                          className="-ml-2 rounded-full p-1 text-ink-400 hover:text-ink"
                        >
                          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          onMouseEnter={() => enter(item.label)}
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.3, ease }}
                          className={`absolute top-full z-50 pt-3 ${item.mega ? 'left-0 right-0' : ''}`}
                        >
                          <div className={`rounded-xl2 border border-line bg-white p-3 shadow-[0_30px_80px_-30px_rgba(15,15,16,0.35)] ${item.mega ? 'p-6' : 'w-80'}`}>
                            {item.mega ? <MegaPractice onNavigate={() => setOpenMenu(null)} /> : <Dropdown items={item.children} onNavigate={() => setOpenMenu(null)} />}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)} className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink" aria-label="Search (Ctrl+K)">
                <Search className="h-[18px] w-[18px]" />
              </button>
              <Link to="/contact" className="btn btn-dark hidden !py-3 sm:inline-flex">Contact Us</Link>
              <button onClick={() => setMobileOpen(true)} className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white lg:hidden" aria-label="Open menu" aria-expanded={mobileOpen} aria-controls="mobile-menu">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu"
            className="fixed inset-0 z-[70] flex flex-col bg-ink text-white lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="container-x flex h-[var(--header-h)] shrink-0 items-center justify-between">
              <Logo variant="light" />
              <button onClick={() => setMobileOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink" aria-label="Close menu"><X className="h-5 w-5" /></button>
            </div>
            <div className="container-x flex-1 overflow-y-auto pb-10 pt-4">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {NAV.map((item, i) => {
                  const sub = item.children || (item.mega ? [{ label: 'All Areas of Practice', to: '/areas-of-practice' }, ...PRACTICES.map(p => ({ label: p.title, to: `/areas-of-practice/${p.slug}` }))] : null);
                  const expanded = mobileSection === item.label;
                  return (
                    <motion.li key={item.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.04, duration: 0.5, ease }}>
                      <div className="flex items-center justify-between">
                        <Link to={item.to} className="flex-1 py-4 text-2xl font-medium tracking-tight">{item.label}</Link>
                        {sub && (
                          <button onClick={() => setMobileSection(expanded ? null : item.label)} aria-expanded={expanded} aria-label={`Show ${item.label} links`} className="grid h-10 w-10 place-items-center rounded-full border border-white/20">
                            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>
                      <AnimatePresence initial={false}>
                        {sub && expanded && (
                          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }} className="overflow-hidden">
                            {sub.map(c => (
                              <li key={c.label}><Link to={c.to} className="block py-2 pl-1 text-[15px] text-white/70 hover:text-white">{c.label}</Link></li>
                            ))}
                            <li className="h-3" aria-hidden />
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="mt-8 grid gap-3 text-sm text-white/70">
                {FIRM.phones.map(p => <a key={p.href} href={p.href} className="inline-flex items-center gap-2"><Phone className="h-4 w-4" />{p.display}</a>)}
                <div className="mt-2 flex gap-4">{FIRM.languages.map(l => <a key={l.code} href={l.href} className="underline-offset-4 hover:underline">{l.label}</a>)}</div>
              </div>
              <Link to="/contact" className="btn btn-light mt-8 w-full">Contact Us <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
