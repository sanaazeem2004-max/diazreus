import { Section, Container, Button } from '../components/ui.jsx';
import { useMeta } from '../components/PageHero.jsx';

export default function NotFound() {
  useMeta('Page not found');
  return (
    <Section tone="light">
      <Container className="py-10 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-6 text-h1 font-medium">This page could not be found.</h1>
        <p className="mx-auto mt-5 max-w-md text-ink-500">The page may have moved. Explore our practice areas or contact our team.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><Button to="/">Back to home</Button><Button to="/contact" variant="outline">Contact us</Button></div>
      </Container>
    </Section>
  );
}
