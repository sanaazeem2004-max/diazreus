import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowUpRight, FileText, Lock } from 'lucide-react';
import PageHero, { useMeta } from '../components/PageHero.jsx';
import { Section, Container, Reveal } from '../components/ui.jsx';
import ContactForm from '../components/ContactForm.jsx';
import { ContactDetails } from '../components/Contact.jsx';
import { FIRM, IMPERSONATION_NOTICE } from '../data/site.js';
import { OFFICES, REGIONS } from '../data/offices.generated.js';

export default function ContactPage() {
  useMeta('Contact Us', 'Contact Diaz Reus International Law Firm — Miami Tower, 100 S.E. Second Street, Suite 3400, Miami, FL 33131. +1 (877) 247-9277 · info@diazreus.com');
  return (
    <>
      <PageHero
        eyebrow="Contact" crumbs={[{ label: 'Contact' }]}
        title={'Let’s navigate your next\nchallenge together.'} accent={['challenge', 'together.']}
        intro="Tell us about your matter and the right attorney in our global network will respond. If the nature of your communication is confidential, please call us directly at 877.247.9277."
      />
      <Section tone="light" className="!pt-0">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal><ContactDetails /></Reveal>
            <Reveal delay={0.05} className="mt-10 rounded-card border border-line p-6" id="impersonation">
              <div className="flex items-center gap-2 text-[15px] font-semibold"><ShieldAlert className="h-5 w-5 text-brand" aria-hidden />{IMPERSONATION_NOTICE.title}</div>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-600">{IMPERSONATION_NOTICE.body}</p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7"><ContactForm /></Reveal>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-h2 font-medium">Global office links</h2>
            <Link to="/offices" className="group inline-flex items-center gap-1 text-sm font-medium"><span className="link-underline">Full office directory</span><ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {REGIONS.map(r => (
              <Reveal key={r} className="rounded-card bg-white p-5">
                <p className="text-[15px] font-semibold">{r}</p>
                <ul className="mt-3 grid gap-1.5 text-[14px] text-ink-600">
                  {OFFICES.filter(o => o.region === r).map(o => <li key={o.slug}><Link to={`/offices?office=${o.slug}`} className="hover:text-ink hover:underline">{o.city}</Link></li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="light" className="!py-16">
        <Container className="grid gap-6 md:grid-cols-2">
          <div id="legal" className="scroll-mt-32 rounded-card bg-mist p-6">
            <p className="flex items-center gap-2 font-semibold"><FileText className="h-4 w-4" aria-hidden />Legal notice</p>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-600">Contacting Diaz Reus through this website does not establish an attorney-client relationship. Please read the firm’s published disclaimer.</p>
            <a href={FIRM.disclaimerPdf} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline">Read the disclaimer (PDF) <ArrowUpRight className="h-3.5 w-3.5" /></a>
          </div>
          <div id="privacy" className="scroll-mt-32 rounded-card bg-mist p-6">
            <p className="flex items-center gap-2 font-semibold"><Lock className="h-4 w-4" aria-hidden />Privacy</p>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-600">Please do not include confidential information in the contact form. If the nature of your communication is confidential, please call us directly at 877.247.9277. For questions about your information, write to <a href={`mailto:${FIRM.email}`} className="underline">{FIRM.email}</a>.</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
