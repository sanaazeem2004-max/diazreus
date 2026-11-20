import PageHero, { useMeta } from '../components/PageHero.jsx';
import { Section, Container, SectionHeading, Reveal } from '../components/ui.jsx';
import { LogoWall } from '../components/Awards.jsx';
import { AWARDS, BOARD_CERTIFICATIONS, HONORS_LIST } from '../data/site.js';

export default function Honors() {
  useMeta('Honors & Recognitions', 'Diaz Reus is recognized by Chambers, The Legal 500, GIR 100, Latinvex, Leaders League, Best Lawyers, Super Lawyers and Law360.');
  return (
    <>
      <PageHero
        eyebrow="Honors & Recognitions" crumbs={[{ label: 'About Us', to: '/about-us' }, { label: 'Honors & Recognitions' }]}
        title={'Recognized for\nexcellence.'} accent={['excellence.']}
        intro="Diaz Reus maintains leadership positions in professional and community organizations, being recognized for their abilities, professionalism, and high ethical standards, which are also reflected in the premier-quality legal product, value, and services for which the law firm is noted."
      />
      <Section tone="light" className="!pt-0">
        <Container className="grid gap-5 lg:grid-cols-12">
          <div className="grid grid-cols-2 gap-4 lg:col-span-4 lg:grid-cols-1">
            {BOARD_CERTIFICATIONS.map(b => (
              <Reveal key={b.name} className="flex flex-col items-center justify-center rounded-card bg-mist p-6 text-center">
                <img src={b.logo} alt="" className="h-36 w-auto object-contain" />
                <p className="mt-4 text-[13px] font-medium leading-snug">{b.name}</p>
              </Reveal>
            ))}
          </div>
          <div className="lg:col-span-8"><LogoWall items={AWARDS} cols="grid-cols-2 sm:grid-cols-4" imgClass="h-[72px]" label="Awards" /></div>
        </Container>
      </Section>
      <Section tone="mist">
        <Container>
          <SectionHeading eyebrow="Our Earned Awards" title="Rankings and distinctions." align="split" intro="As listed on the official Honors & Recognitions page." />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {HONORS_LIST.map((h, i) => (
              <Reveal key={h.org} delay={(i % 2) * 0.05} className={`rounded-card bg-white p-6 sm:p-8 ${h.org === 'Further recognition' ? 'md:col-span-2' : ''}`}>
                <h3 className="text-lg font-semibold tracking-tight">{h.org}</h3>
                <ul className={`mt-4 grid gap-3 text-[15px] leading-relaxed text-ink-600 ${h.org === 'Further recognition' ? 'md:grid-cols-2 md:gap-x-10' : ''}`}>
                  {h.items.map(it => <li key={it} className="border-t border-line pt-3">{it}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
