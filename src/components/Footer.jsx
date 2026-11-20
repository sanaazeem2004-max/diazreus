import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';
import { FIRM } from '../data/site.js';
import { PRACTICES } from '../data/practices.js';
import { OFFICES, REGIONS } from '../data/offices.generated.js';
import CtaBanner from './CtaBanner.jsx';

const FIRM_LINKS = [
  { label: 'About Us', to: '/about-us' },
  { label: 'US & International Practice', to: '/us-international-practice' },
  { label: 'DRT Alliance', to: '/drt-alliance' },
  { label: 'Representative Matters', to: '/representative-matters' },
  { label: 'Honors & Recognitions', to: '/honors-recognitions' },
  { label: 'Attorneys', to: '/attorneys' },
  { label: 'Investigators', to: '/investigators' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-mist text-ink" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <CtaBanner />
      <div className="container-x pb-10 pt-16 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <img src="/images/brand/footer-logo.png" alt="Diaz Reus International Law Firm — Global reach. Local Grasp." width="300" height="141" className="h-20 w-auto" loading="lazy" />
            <address className="mt-8 space-y-4 not-italic text-[15px] text-ink-600">
              <p className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                <span><span className="font-medium text-ink">Headquarters</span><br />{FIRM.hq.building}<br />{FIRM.hq.street}<br />{FIRM.hq.city}</span>
              </p>
              {FIRM.phones.map(p => (
                <p key={p.href} className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden /><a href={p.href} className="link-underline">{p.display}</a></p>
              ))}
              <p className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden /><a href={`mailto:${FIRM.email}`} className="link-underline">{FIRM.email}</a></p>
            </address>
          </div>
          <nav aria-label="Firm" className="lg:col-span-3">
            <p className="text-eyebrow font-semibold uppercase text-ink-400">The Firm</p>
            <ul className="mt-5 grid gap-2.5 text-[15px]">
              {FIRM_LINKS.map(l => <li key={l.to}><Link to={l.to} className="link-underline text-ink-600 hover:text-ink">{l.label}</Link></li>)}
            </ul>
          </nav>
          <nav aria-label="Practice areas" className="lg:col-span-5">
            <p className="text-eyebrow font-semibold uppercase text-ink-400">Areas of Practice</p>
            <ul className="mt-5 gap-x-8 text-[15px] sm:columns-2">
              {PRACTICES.map(p => <li key={p.slug} className="mb-2.5 break-inside-avoid"><Link to={`/areas-of-practice/${p.slug}`} className="link-underline text-ink-600 hover:text-ink">{p.title}</Link></li>)}
            </ul>
          </nav>
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <div className="flex items-end justify-between gap-6">
            <p className="text-eyebrow font-semibold uppercase text-ink-400">{OFFICES.length} offices worldwide</p>
            <Link to="/offices" className="group inline-flex items-center gap-1.5 text-sm font-medium"><span className="link-underline">All offices</span><ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
            {REGIONS.map(r => (
              <div key={r}>
                <p className="text-[13px] font-semibold">{r}</p>
                <ul className="mt-3 grid gap-1.5 text-[13px] text-ink-500">
                  {OFFICES.filter(o => o.region === r).map(o => (
                    <li key={o.slug}><Link to={`/offices?office=${o.slug}`} className="hover:text-ink">{o.city}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 text-[13px] text-ink-500 md:flex-row md:items-center md:justify-between">
          <p>© {year} {FIRM.legalName}. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li><a href={FIRM.disclaimerPdf} target="_blank" rel="noopener noreferrer" className="hover:text-ink">Disclaimer</a></li>
            <li><Link to="/contact#legal" className="hover:text-ink">Legal Notice</Link></li>
            <li><Link to="/contact#privacy" className="hover:text-ink">Privacy</Link></li>
            {FIRM.social.map(s => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">{s.label}</a></li>)}
            <li>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="grid h-9 w-9 place-items-center rounded-full border border-line hover:border-ink hover:text-ink" aria-label="Back to top"><ArrowUp className="h-4 w-4" /></button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
