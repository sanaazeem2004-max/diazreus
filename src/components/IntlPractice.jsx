import { Gavel, Scale, Handshake, Building, Languages, Network } from 'lucide-react';
import { Section, Container, Eyebrow, Reveal, RevealImage, TextLink } from './ui.jsx';
import { FIRM } from '../data/site.js';

const HIGHLIGHTS = [
  { icon: Gavel, t: 'Cross-border litigation', d: 'National and international parallel proceedings.' },
  { icon: Scale, t: 'International arbitration', d: 'Board Certified in International Litigation & Arbitration.' },
  { icon: Handshake, t: 'Business transactions', d: 'Contracts and structures across legal cultures.' },
  { icon: Building, t: 'Multinational representation', d: 'Corporations, institutions and government entities.' },
  { icon: Languages, t: 'Multilingual expertise', d: `${FIRM.spokenLanguages.length} working languages, from Spanish to Mandarin.` },
  { icon: Network, t: 'Global coordination', d: 'Boots-on-the-ground counsel through the DRT Alliance.' },
];

export default function IntlPractice() {
  return (
    <Section tone="mist" aria-labelledby="intl-heading">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>US &amp; International Practice</Eyebrow>
            <h2 id="intl-heading" className="mt-5 text-h2 font-medium text-balance">
              International Perspective. <span className="font-serif font-normal italic text-brand">Strategic</span> Legal Counsel.
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-600 text-pretty">
              Miami-headquartered Diaz Reus is a global legal practice focused on national and international parallel proceedings and business transactions in all areas of the law, with Board Certified lawyers in International Litigation &amp; Arbitration, and International Law.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal as="li" key={h.t} delay={i * 0.05} className="flex gap-4 border-t border-line pt-5">
                <h.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                <div>
                  <p className="font-semibold tracking-tight">{h.t}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink-500">{h.d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-10"><TextLink to="/us-international-practice">Discover our US &amp; International Practice</TextLink></Reveal>
        </div>
        <div className="relative lg:col-span-6">
          <RevealImage src="/images/photos/towers-mono.jpg" alt="Glass office towers converging into the sky" className="h-[440px] rounded-xl2 sm:h-[560px]" />
          <Reveal delay={0.25} className="absolute -bottom-6 left-4 right-4 rounded-card bg-white p-5 shadow-[0_30px_60px_-30px_rgba(15,15,16,0.4)] sm:left-auto sm:right-6 sm:w-[300px]">
            <p className="text-eyebrow font-semibold uppercase text-ink-400">We serve</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">Multinational corporations, financial institutions, government entities, family offices, entrepreneurs, athletes and entertainers.</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
