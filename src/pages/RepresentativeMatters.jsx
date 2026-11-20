import { Quote } from 'lucide-react';
import PageHero, { useMeta } from '../components/PageHero.jsx';
import { Section, Container, SectionHeading, Reveal } from '../components/ui.jsx';
import { MATTERS } from '../data/site.js';

export default function RepresentativeMatters() {
  useMeta('Representative Matters', 'Highly publicized cases handled by Diaz Reus, from sovereign debt and OFAC delisting to international arbitration and white-collar defense.');
  return (
    <>
      <PageHero
        eyebrow="Representative Matters" crumbs={[{ label: 'About Us', to: '/about-us' }, { label: 'Representative Matters' }]}
        title={'Highly publicized\ncases.'} accent={['cases.']}
        intro="Diaz Reus’s extensive international legal experience spans the globe — from the US to Latin America and the Caribbean, from Western and Eastern Europe to the Middle East and Asia."
        image="/images/photos/pa-litigation.jpg" imageAlt="Neoclassical courthouse columns"
      />
      <Section tone="light" className="!pt-0">
        <Container>
          <Reveal as="figure" className="mx-auto max-w-4xl text-center">
            <Quote className="mx-auto h-8 w-8 text-brand" aria-hidden />
            <blockquote className="mt-5 font-serif text-[clamp(1.6rem,3vw,2.5rem)] leading-tight text-balance">“Diaz, Reus &amp; Targ boasts a team of former police officers and FBI agents as well as experienced white-collar lawyers, making the firm a natural choice for executives under fire.”</blockquote>
            <figcaption className="mt-5 text-sm text-ink-500">— GIR 100</figcaption>
          </Reveal>
        </Container>
      </Section>
      <Section tone="mist">
        <Container>
          <SectionHeading eyebrow="Significant case examples" title="Precedent-setting work for corporate, public and private clients." align="split"
            intro="An international legal powerhouse, Diaz Reus employs skilled international attorneys to help clients conduct international business successfully, cost effectively and efficiently." />
          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {MATTERS.map((m, i) => (
              <Reveal as="li" key={m.tag} delay={(i % 3) * 0.06} className="group flex h-full flex-col rounded-card bg-white p-6 transition-colors duration-500 hover:bg-ink hover:text-white sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="eyebrow group-hover:bg-white group-hover:text-ink">{m.area}</span>
                  <span className="text-sm tabular-nums text-ink-400 group-hover:text-white/50">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-snug tracking-tight">{m.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600 transition-colors group-hover:text-white/70">{m.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
}
