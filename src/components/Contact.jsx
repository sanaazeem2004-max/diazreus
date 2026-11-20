import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { Section, Container, Eyebrow, Reveal } from './ui.jsx';
import ContactForm from './ContactForm.jsx';
import { FIRM } from '../data/site.js';
import { OFFICES, REGIONS } from '../data/offices.generated.js';

export function ContactDetails() {
  return (
    <ul className="grid gap-5 text-[15px]">
      <li className="flex gap-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
        <span><span className="font-semibold">Headquarters</span><br /><span className="text-ink-600">{FIRM.hq.building}<br />{FIRM.hq.street}<br />{FIRM.hq.city}</span></span>
      </li>
      <li className="flex gap-4"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
        <span className="grid">{FIRM.phones.map(p => <a key={p.href} href={p.href} className="link-underline w-fit">{p.display} <span className="text-ink-400">· {p.label}</span></a>)}</span>
      </li>
      <li className="flex gap-4"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden /><a href={`mailto:${FIRM.email}`} className="link-underline w-fit">{FIRM.email}</a></li>
    </ul>
  );
}

export default function Contact() {
  return (
    <Section tone="light" id="contact" aria-labelledby="contact-heading">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="flex flex-col lg:col-span-5">
          <Eyebrow>Contact</Eyebrow>
          <h2 id="contact-heading" className="mt-5 text-h2 font-medium text-balance">Let’s navigate your next challenge <span className="font-serif font-normal italic text-brand">together.</span></h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-500">Tell us about your matter and the right attorney in our global network will respond. For confidential communications, please call us directly.</p>
          <div className="mt-10"><ContactDetails /></div>
          <div className="mt-10 border-t border-line pt-6">
            <p className="text-eyebrow font-semibold uppercase text-ink-400">Regional offices</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {REGIONS.map(r => (
                <li key={r}><Link to={`/offices?region=${encodeURIComponent(r)}`} className="group inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-[13px] hover:border-ink">{r} <span className="text-ink-400">{OFFICES.filter(o => o.region === r).length}</span><ArrowUpRight className="h-3 w-3" aria-hidden /></Link></li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7"><ContactForm /></Reveal>
      </Container>
    </Section>
  );
}
