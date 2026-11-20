import { useState } from 'react';
import { Section, Container, SectionHeading, Button } from './ui.jsx';
import Carousel from './Carousel.jsx';
import AttorneyCard from './AttorneyCard.jsx';
import AttorneyDrawer from './AttorneyDrawer.jsx';
import { PEOPLE } from '../data/people.generated.js';
import { REGIONS } from '../data/offices.generated.js';

const ATTORNEYS = PEOPLE.filter(p => p.type === 'attorney');
const REGION_TABS = ['Leadership', ...REGIONS.filter(r => ATTORNEYS.some(a => a.region === r))];
const LEADERSHIP = ['Global Managing Partner', 'Administrative Managing Partner', 'Founding Partner', 'Partner'];

export default function Attorneys() {
  const [tab, setTab] = useState('Leadership');
  const [open, setOpen] = useState(null);
  const list = tab === 'Leadership' ? ATTORNEYS.filter(a => LEADERSHIP.includes(a.title)) : ATTORNEYS.filter(a => a.region === tab);

  return (
    <Section tone="dark" aria-labelledby="team-heading">
      <Container>
        <SectionHeading
          id="team-heading" tone="light" eyebrow="Attorneys & Counselors" align="center"
          title="Meet the attorneys behind our global practice."
          intro="From our Miami headquarters and offices around the world, Diaz Reus attorneys help companies, government entities and individuals transact business and resolve disputes at home and abroad."
        />
        <div className="no-scrollbar mx-auto mt-10 flex max-w-full justify-start gap-2 overflow-x-auto sm:justify-center" role="tablist" aria-label="Filter attorneys">
          {REGION_TABS.map(r => (
            <button key={r} role="tab" aria-selected={tab === r} onClick={() => setTab(r)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${tab === r ? 'bg-white text-ink' : 'bg-white/[0.07] text-white/70 hover:text-white'}`}>{r}</button>
          ))}
        </div>
        <div className="mt-10">
          <Carousel tone="dark" label="Attorneys" resetKey={tab}>
            {list.map((p, i) => <AttorneyCard key={p.slug} person={p} index={i} tone="dark" onOpen={setOpen} />)}
          </Carousel>
        </div>
        <div className="mt-12 flex justify-center"><Button to="/attorneys" variant="light">View the full directory</Button></div>
      </Container>
      <AttorneyDrawer person={open} onClose={() => setOpen(null)} />
    </Section>
  );
}
