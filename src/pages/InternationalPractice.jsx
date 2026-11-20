import { Link } from 'react-router-dom';
import { ArrowUpRight, Quote } from 'lucide-react';
import PageHero, { useMeta } from '../components/PageHero.jsx';
import { Section, Container, SectionHeading, Reveal, RevealImage, Eyebrow, Button } from '../components/ui.jsx';
import WorldMap from '../components/WorldMap.jsx';
import { PRACTICES } from '../data/practices.js';
import { FIRM } from '../data/site.js';
import { OFFICES, REGIONS } from '../data/offices.generated.js';

const CLIENT_TYPES = ['Multinational corporations', 'Import & export companies', 'Manufacturers', 'Technology companies', 'Government entities', 'Heads of state', 'Political parties', 'Public officials', 'Financial institutions', 'Entrepreneurs', 'Family offices', 'High net worth individuals', 'Athletes & entertainers'];

export default function InternationalPractice() {
  useMeta('US & International Practice', 'Miami-headquartered Diaz Reus is a global legal practice focused on national and international parallel proceedings and business transactions in all areas of the law.');
  return (
    <>
      <PageHero
        eyebrow="US & International Practice" crumbs={[{ label: 'About Us', to: '/about-us' }, { label: 'US & International Practice' }]}
        title={'Parallel proceedings.\nAcross every border.'} accent={['every', 'border.']}
        intro="Miami-headquartered Diaz Reus is a global legal practice focused on national and international parallel proceedings and business transactions in all areas of the law, with Board Certified lawyers in International Litigation & Arbitration, and International Law."
      >
        <div className="flex flex-wrap gap-3"><Button to="/areas-of-practice">Areas of practice</Button><Button to="/offices" variant="outline">Our offices</Button></div>
      </PageHero>

      <Section tone="light" className="!pt-0">
        <Container className="grid gap-5 lg:grid-cols-12">
          <RevealImage src="/images/photos/miami-skyline.jpg" alt="Miami skyline, home of the firm's headquarters" className="h-[320px] rounded-xl2 sm:h-[460px] lg:col-span-7" />
          <div className="grid gap-5 lg:col-span-5">
            {[
              { q: 'Their main strength is the way they manage the relationship with clients, establishing a mutual confidence in order to understand the problems and focus on the best solution.', s: 'Client testimonial' },
              { q: '…what makes Diaz Reus unique is that it is really diverse and international. They of course have multilingual practitioners, but also understand culture, fee approaches and the way of working with European and Ibero-American multinationals.', s: 'Legal 500 Latin America 2024' },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.1} className={`flex flex-col justify-between rounded-xl2 p-7 ${i === 0 ? 'bg-ink text-white' : 'bg-mist'}`}>
                <Quote className={`h-6 w-6 ${i === 0 ? 'text-brand-light' : 'text-brand'}`} aria-hidden />
                <blockquote className="mt-4 font-serif text-xl leading-snug sm:text-[22px]">“{t.q}”</blockquote>
                <p className={`mt-5 text-sm ${i === 0 ? 'text-white/60' : 'text-ink-500'}`}>— {t.s}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Who we serve</Eyebrow>
            <h2 className="mt-5 text-h2 font-medium text-balance">Global legal services for distinguished clients.</h2>
            <div className="prose-dr mt-6">
              <p>Diaz Reus is an entrepreneurial, enterprising, emerging-markets law firm providing traditional legal services across all industries while focusing on promising new business opportunities for its clients. The firm is dedicated to growing and protecting its clients’ assets and securing their long-term stability.</p>
              <p>From forty-one offices located throughout Latin America, the US, Canada, Western and Eastern Europe, Asia, and the Middle East, our multicultural lawyers operate seamlessly, giving clients access to boots-on-the-ground, global legal counsel.</p>
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal><p className="text-eyebrow font-semibold uppercase text-ink-400">Diaz Reus serves</p></Reveal>
            <ul className="mt-5 flex flex-wrap gap-2">
              {CLIENT_TYPES.map((c, i) => <Reveal as="li" key={c} delay={i * 0.03} className="rounded-full bg-white px-4 py-2.5 text-[15px]">{c}</Reveal>)}
            </ul>
            <Reveal className="mt-10"><p className="text-eyebrow font-semibold uppercase text-ink-400">Working languages</p></Reveal>
            <ul className="mt-5 flex flex-wrap gap-2">
              {FIRM.spokenLanguages.map(l => <li key={l} className="rounded-full border border-line px-4 py-2 text-[15px]">{l}</li>)}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeading eyebrow="Broad areas" title="Practice areas at a glance." align="split" intro="From our Miami, Florida headquarters and offices around the world, we help individuals, companies, and government entities transact business and resolve disputes at home and abroad." />
          <ul className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICES.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 3) * 0.05} className="border-b border-line">
                <Link to={`/areas-of-practice/${p.slug}`} className="group flex h-full items-center justify-between gap-4 py-5 pr-2 sm:pr-6">
                  <span className="flex items-center gap-4">
                    <span className="text-sm tabular-nums text-ink-400">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[17px] font-medium tracking-tight transition-colors group-hover:text-brand">{p.title}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="dark">
        <Container className="grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow tone="light">Global footprint</Eyebrow>
            <h2 className="mt-5 text-h2 font-medium">{OFFICES.length} offices. {REGIONS.length} regions.</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-white/60">Together, our attorneys work seamlessly from our offices in the U.S., throughout Latin America, Europe, Asia, Africa and the Middle East, winning notable cases in domestic and international tribunals and arbitral bodies around the world.</p>
            <div className="mt-8"><Button to="/offices" variant="light">Explore our locations</Button></div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8"><WorldMap /></Reveal>
        </Container>
      </Section>
    </>
  );
}
