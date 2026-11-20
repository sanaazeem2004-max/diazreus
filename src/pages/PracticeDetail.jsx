import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Quote, ArrowLeft, ExternalLink, Phone } from 'lucide-react';
import PageHero, { useMeta } from '../components/PageHero.jsx';
import { Section, Container, SectionHeading, Reveal, Eyebrow, Button, TextLink } from '../components/ui.jsx';
import PracticeCard from '../components/PracticeCard.jsx';
import AttorneyCard from '../components/AttorneyCard.jsx';
import AttorneyDrawer from '../components/AttorneyDrawer.jsx';
import Carousel from '../components/Carousel.jsx';
import { PRACTICES, getPractice } from '../data/practices.js';
import { PEOPLE } from '../data/people.generated.js';
import NotFound from './NotFound.jsx';

export default function PracticeDetail() {
  const { slug } = useParams();
  const practice = getPractice(slug);
  const [open, setOpen] = useState(null);
  useMeta(practice?.title, practice?.short);
  if (!practice) return <NotFound />;

  const Icon = practice.icon;
  const team = PEOPLE.filter(p => p.type === 'attorney' && p.practices.includes(practice.slug));
  const related = PRACTICES.filter(p => p.group === practice.group && p.slug !== practice.slug).concat(PRACTICES.filter(p => p.group !== practice.group)).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={practice.group} crumbs={[{ label: 'Areas of Practice', to: '/areas-of-practice' }, { label: practice.title }]}
        title={practice.title} intro={practice.short}
        image={practice.image} imageAlt=""
      >
        <div className="flex flex-wrap gap-3"><Button to="/contact">Discuss your matter</Button>{team.length > 0 && <Button href="#team" variant="outline" icon={null}>Meet the team</Button>}</div>
      </PageHero>

      <Section tone="light" className="!pt-0">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
              <Reveal className="rounded-card bg-mist p-6 sm:p-7">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white"><Icon className="h-5 w-5" aria-hidden /></span>
                <h2 className="mt-6 text-eyebrow font-semibold uppercase text-ink-400">Legal services</h2>
                <ul className="mt-4 grid gap-3">
                  {practice.services.map(s => (
                    <li key={s} className="flex gap-3 text-[15px] leading-snug"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />{s}</li>
                  ))}
                </ul>
                {practice.external && (
                  <div className="mt-6 grid gap-2 border-t border-line pt-5 text-sm">
                    <a href={practice.external.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium hover:text-brand"><ExternalLink className="h-4 w-4" />{practice.external.label}</a>
                    <a href={`tel:+1${practice.external.phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 text-ink-600 hover:text-ink"><Phone className="h-4 w-4" />DRRT {practice.external.phone}</a>
                  </div>
                )}
              </Reveal>
              <Reveal delay={0.1} className="mt-4"><TextLink to="/areas-of-practice"><ArrowLeft className="mr-1 inline h-4 w-4" />All areas of practice</TextLink></Reveal>
            </div>
          </aside>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <Eyebrow>Practice overview</Eyebrow>
              <p className="mt-6 text-[clamp(1.2rem,1.5vw,1.4rem)] font-medium leading-relaxed tracking-tight text-pretty">{practice.body[0]}</p>
            </Reveal>
            {practice.body.length > 1 && (
              <Reveal delay={0.05} className="prose-dr mt-8">
                {practice.body.slice(1).map((p, i) => <p key={i}>{p}</p>)}
              </Reveal>
            )}
            {practice.quote && (
              <Reveal as="figure" className="mt-12 rounded-xl2 bg-ink p-8 text-white sm:p-10">
                <Quote className="h-7 w-7 text-brand-light" aria-hidden />
                <blockquote className="mt-4 font-serif text-2xl leading-snug sm:text-[28px]">“{practice.quote.q}”</blockquote>
                <figcaption className="mt-5 text-sm text-white/60">— {practice.quote.src}</figcaption>
              </Reveal>
            )}
          </div>
        </Container>
      </Section>

      {team.length > 0 && (
        <Section tone="mist" id="team">
          <Container>
            <SectionHeading eyebrow="Relevant attorneys" title={`Attorneys with ${practice.title.split(' — ')[0]} experience`} align="split"
              intro="Matched from each attorney’s published biography on diazreus.com." aside={<TextLink to={`/attorneys?practice=${practice.slug}`}>View in directory</TextLink>} />
            <div className="mt-12">
              <Carousel label="Relevant attorneys" resetKey={practice.slug}>
                {team.map((p, i) => <AttorneyCard key={p.slug} person={p} index={i} onOpen={setOpen} />)}
              </Carousel>
            </div>
          </Container>
        </Section>
      )}

      <Section tone="light">
        <Container>
          <SectionHeading eyebrow="Related practice areas" title="Explore related areas." align="split" aside={<TextLink to="/areas-of-practice">All practice areas</TextLink>} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {related.map((p, i) => <PracticeCard key={p.slug} practice={p} index={i} />)}
          </div>
        </Container>
      </Section>
      <AttorneyDrawer person={open} onClose={() => setOpen(null)} />
    </>
  );
}
