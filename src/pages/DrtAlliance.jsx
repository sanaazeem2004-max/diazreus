import PageHero, { useMeta } from '../components/PageHero.jsx';
import { Section, Container, Reveal, RevealImage, Eyebrow, Button } from '../components/ui.jsx';
import WorldMap from '../components/WorldMap.jsx';
import { OFFICES, REGIONS } from '../data/offices.generated.js';

const GUIDES = ['Chambers', 'Legal 500', 'Global Investigations Review (GIR)', 'Latinvex', 'Leaders League', 'Law360', 'BestLawyers®', 'Super Lawyers'];

export default function DrtAlliance() {
  useMeta('DRT Alliance', 'DRT Alliance is a global organization of law offices providing seamless access to legal services in major business centers worldwide.');
  return (
    <>
      <PageHero
        eyebrow="DRT Alliance" crumbs={[{ label: 'About Us', to: '/about-us' }, { label: 'DRT Alliance' }]}
        title={'A global organization\nof law offices.'} accent={['law', 'offices.']}
        intro="DRT Alliance provides clients seamless access to legal services in major business centers throughout the U.S., Canada, Latin America, Eastern and Western Europe, Asia, and the Middle East."
      />
      <Section tone="light" className="!pt-0">
        <Container className="grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="flex items-center justify-center rounded-xl2 bg-mist p-10 lg:col-span-5 lg:h-full">
            <img src="/images/brand/drt-alliance.png" alt="DRT Alliance" className="w-full max-w-sm" />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>Shared values</Eyebrow>
            <div className="prose-dr mt-6">
              <p>Whether a part of the headquarters firm of Diaz, Reus &amp; Targ, LLP in Miami, Florida, or independently owned and operated, each member of the DRT Alliance has been thoroughly vetted as offering boots on the ground, top-quality legal talent and experience while sharing the same values, strategic vision, and dedication to client service.</p>
              <p>The members of DRT Alliance are recognized by Chambers, Legal 500, Global Investigations Review (GIR), Latinvex, Leaders League, Law360, BestLawyers®, Super Lawyers, and have received awards from many distinguished publications.</p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">{GUIDES.map(g => <li key={g} className="rounded-full border border-line px-3 py-1.5 text-[13px]">{g}</li>)}</ul>
          </Reveal>
        </Container>
      </Section>
      <Section tone="dark">
        <Container className="grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow tone="light">The network</Eyebrow>
            <h2 className="mt-5 text-h2 font-medium">{OFFICES.length} locations across {REGIONS.length} regions.</h2>
            <div className="mt-8"><Button to="/offices" variant="light">Explore our locations</Button></div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8"><WorldMap /></Reveal>
        </Container>
      </Section>
      <Section tone="light">
        <Container className="grid gap-5 md:grid-cols-2">
          <RevealImage src="/images/photos/meeting.jpg" alt="Attorneys meeting around a conference table" className="h-[320px] rounded-xl2 md:h-[420px]" />
          <RevealImage src="/images/photos/office-glass.jpg" alt="Bright modern office interior" className="h-[320px] rounded-xl2 md:h-[420px]" delay={0.1} />
        </Container>
      </Section>
    </>
  );
}
