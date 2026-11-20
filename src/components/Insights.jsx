import { Section, Container, SectionHeading, Button } from './ui.jsx';
import InsightCard from './InsightCard.jsx';
import { INSIGHTS } from '../data/site.js';

export default function Insights() {
  return (
    <Section tone="dark" aria-labelledby="insights-heading">
      <Container>
        <SectionHeading
          id="insights-heading" tone="light" eyebrow="Insights & News" align="split"
          title="Latest from the firm."
          intro="Legal developments, regulatory analysis, publications and firm announcements."
          aside={<Button to="/insights" variant="light">View all insights</Button>}
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {INSIGHTS.slice(0, 3).map((it, i) => <InsightCard key={it.href} item={it} index={i} tone="dark" />)}
        </div>
      </Container>
    </Section>
  );
}
