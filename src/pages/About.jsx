import { Globe2, Languages, Scale, Users } from 'lucide-react';
import PageHero, { useMeta } from '../components/PageHero.jsx';
import EditorialRow from '../components/EditorialRow.jsx';
import Testimonials from '../components/Testimonials.jsx';
import { Section, Container, Reveal, Eyebrow } from '../components/ui.jsx';
import { FIRM } from '../data/site.js';
import { PEOPLE } from '../data/people.generated.js';
import { PRACTICES } from '../data/practices.js';

export default function About() {
  useMeta('About Us', 'Diaz Reus offers U.S. and international legal services through a multidisciplinary team of attorneys handling high-stakes litigation and precedent-setting matters.');
  const attorneys = PEOPLE.filter(p => p.type === 'attorney').length;
  const stats = [
    { icon: Globe2, v: FIRM.officeCount, l: 'Offices worldwide' },
    { icon: Users, v: attorneys, l: 'Attorneys & counselors' },
    { icon: Scale, v: PRACTICES.length, l: 'Areas of practice' },
    { icon: Languages, v: FIRM.spokenLanguages.length, l: 'Working languages' },
  ];
  return (
    <>
      <PageHero
        eyebrow="About Us" crumbs={[{ label: 'About Us' }]}
        title={'Reach, experience\nand acute know-how.'} accent={['acute', 'know-how.']}
        intro="Diaz Reus offers U.S. and international legal services. Our multidisciplinary team of attorneys provide legal representation in high-stakes litigation and precedent-setting legal matters in various areas of practice."
        image="/images/photos/library-busts.jpg" imageAlt="Classical library with marble busts and bookshelves"
      />

      <Section tone="dark">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow tone="light">Who we are</Eyebrow>
            <p className="mt-6 text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-snug tracking-tight text-balance">
              An entrepreneurial, emerging-markets law firm providing traditional legal services across all industries — <span className="text-white/50">while focusing on promising new business opportunities for its clients.</span>
            </p>
          </Reveal>
          <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal as="li" key={s.l} delay={i * 0.06} className="flex items-center gap-4 rounded-card bg-white p-4 text-ink sm:p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-white"><s.icon className="h-5 w-5" aria-hidden /></span>
                <span><span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-400">{s.l}</span><span className="text-2xl font-semibold tabular-nums tracking-tight">{s.v}</span></span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="grid gap-section">
          <EditorialRow index="01" eyebrow="Practice" title="U.S. & International Practice" image="/images/photos/towers-up.jpg" imageAlt="Looking up at glass office towers" to="/us-international-practice">
            <p>Miami-headquartered Diaz Reus is a global legal practice focused on national and international parallel proceedings and business transactions, with Board Certified lawyers in International Litigation &amp; Arbitration, and International Law.</p>
          </EditorialRow>
          <EditorialRow index="02" eyebrow="Network" title="DRT Alliance" image="/images/photos/earth-night.jpg" imageAlt="City lights across the Earth at night" to="/drt-alliance" reverse>
            <p>DRT International Law Firm &amp; Alliance is a global network of law offices that provides clients seamless access to legal services in major business centers throughout the U.S., Latin America, Eastern and Western Europe, Asia, Africa and the Middle East.</p>
          </EditorialRow>
          <EditorialRow index="03" eyebrow="Track record" title="Representative Matters" image="/images/photos/pa-litigation.jpg" imageAlt="Neoclassical courthouse columns" to="/representative-matters">
            <p>Diaz Reus’s extensive international legal experience spans the globe—from the US to Latin America and the Caribbean, from Western and Eastern Europe to the Middle East and Asia. Our multicultural, multilingual attorneys provide deft international legal representation in high-stakes litigation, precedent-setting legal matters and business transactions.</p>
          </EditorialRow>
          <EditorialRow index="04" eyebrow="Recognition" title="Honors & Recognitions" image="/images/photos/justice-2.jpg" imageAlt="Statue of Lady Justice" to="/honors-recognitions" reverse>
            <p>Diaz Reus maintains leadership positions in professional and community organizations, being recognized for their abilities, professionalism, and high ethical standards, which are also reflected in the premier-quality legal product, value, and services for which the law firm is noted.</p>
          </EditorialRow>
        </Container>
      </Section>

      <Section tone="mist" className="!py-14">
        <Container>
          <p className="text-eyebrow font-semibold uppercase text-ink-400">Our attorneys, solicitors and foreign legal consultants speak</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {FIRM.spokenLanguages.map(l => <li key={l} className="rounded-full bg-white px-4 py-2 text-[15px]">{l}</li>)}
          </ul>
        </Container>
      </Section>
      <Testimonials />
    </>
  );
}
