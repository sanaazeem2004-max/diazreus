import { motion } from 'framer-motion';
import { Section, Container, SectionHeading, TextLink, Reveal, ease } from './ui.jsx';
import { AWARDS, BOARD_CERTIFICATIONS, CLIENTS } from '../data/site.js';

export function LogoWall({ items, cols = 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8', imgClass = 'h-16', label }) {
  return (
    <ul className={`grid ${cols} border-l border-t border-line`} aria-label={label}>
      {items.map((a, i) => (
        <motion.li
          key={a.name}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: (i % 8) * 0.05 }}
          className="group relative flex aspect-[4/3] items-center justify-center border-b border-r border-line bg-paper p-4"
        >
          <img src={a.logo} alt={a.name} title={a.name} loading="lazy" className={`${imgClass} w-auto max-w-full object-contain grayscale transition-all duration-500 ease-premium group-hover:scale-105 group-hover:grayscale-0`} />
          <span className="pointer-events-none absolute inset-x-2 bottom-2 translate-y-1 text-center text-[10px] leading-tight text-ink-500 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">{a.name}</span>
        </motion.li>
      ))}
    </ul>
  );
}

export default function Awards() {
  return (
    <Section tone="light" aria-labelledby="awards-heading">
      <Container>
        <SectionHeading
          id="awards-heading" eyebrow="Honors & Recognitions" align="split"
          title="Recognized by the world’s leading legal guides."
          intro="Diaz Reus maintains leadership positions in professional and community organizations, recognized for its abilities, professionalism, and high ethical standards."
          aside={<TextLink to="/honors-recognitions">All honors &amp; recognitions</TextLink>}
        />
        <Reveal className="mt-12 grid items-center gap-6 rounded-card bg-mist p-6 sm:p-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-eyebrow font-semibold uppercase text-ink-400">Board Certification</p>
            <p className="mt-4 max-w-xl text-[clamp(1.25rem,2vw,1.75rem)] font-medium leading-snug tracking-tight">Florida Bar Board Certified lawyers in International Litigation &amp; Arbitration and International Law.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:col-span-5">
            {BOARD_CERTIFICATIONS.map(b => (
              <div key={b.name} className="flex h-40 items-center justify-center rounded-2xl bg-white p-4">
                <img src={b.logo} alt={b.name} loading="lazy" className="max-h-full w-auto object-contain" />
              </div>
            ))}
          </div>
        </Reveal>
        <div className="mt-5">
          <LogoWall items={AWARDS} cols="grid-cols-2 sm:grid-cols-4 lg:grid-cols-8" imgClass="h-[76px]" label="Awards" />
        </div>
      </Container>
    </Section>
  );
}

export function Clients() {
  return (
    <Section tone="mist" aria-labelledby="clients-heading">
      <Container>
        <SectionHeading id="clients-heading" eyebrow="Clients" align="center" title="Trusted by multinationals and financial institutions." intro="A selection of the clients featured on diazreus.com." />
        <div className="mt-12"><LogoWall items={CLIENTS} cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" imgClass="h-[80%] w-[80%]" label="Clients" /></div>
      </Container>
    </Section>
  );
}
