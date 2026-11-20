import PageHero, { useMeta } from '../components/PageHero.jsx';
import { Section, Container } from '../components/ui.jsx';
import { Directory } from './Attorneys.jsx';
import { PEOPLE } from '../data/people.generated.js';

export default function Investigators() {
  useMeta('Investigators', 'Diaz Reus investigators and business intelligence consultants supporting international litigation, fraud and asset recovery matters.');
  const people = PEOPLE.filter(p => p.type === 'investigator');
  return (
    <>
      <PageHero
        eyebrow="Investigators" crumbs={[{ label: 'About Us', to: '/about-us' }, { label: 'Investigators' }]}
        title={'Investigations &\nbusiness intelligence.'} accent={['business', 'intelligence.']}
        intro="In 2009, Diaz Reus created an investigatory ancillary, forming DRT Investigations, Governance & Compliance LLP. Together, Diaz Reus’s attorneys and DRT Investigations’ seasoned law enforcement professionals provide a powerful resource for clients who require both sophisticated investigations and legal representation."
      />
      <Section tone="light" className="!pt-0">
        <Container><Directory people={people} title="investigators" /></Container>
      </Section>
    </>
  );
}
