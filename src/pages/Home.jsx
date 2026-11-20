import Hero from '../components/Hero.jsx';
import IntlPractice from '../components/IntlPractice.jsx';
import PracticeAreas from '../components/PracticeAreas.jsx';
import GlobalPresence from '../components/GlobalPresence.jsx';
import Attorneys from '../components/Attorneys.jsx';
import Awards, { Clients } from '../components/Awards.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Insights from '../components/Insights.jsx';
import Contact from '../components/Contact.jsx';
import { useMeta } from '../components/PageHero.jsx';

export default function Home() {
  useMeta(null, 'Diaz Reus is a Miami-headquartered international law firm with 41 offices across the Americas, Europe, the Middle East, Asia and Africa — cross-border litigation, arbitration, white-collar defense, asset recovery and corporate counsel.');
  return (
    <>
      <Hero />
      <IntlPractice />
      <PracticeAreas />
      <GlobalPresence />
      <Awards />
      <Attorneys />
      <Clients />
      <Testimonials />
      <Insights />
      <Contact />
    </>
  );
}
