import { Reveal, RevealImage, Eyebrow, TextLink } from './ui.jsx';

/** Alternating image/text row on the 12-col grid. Image and text share the same row height. */
export default function EditorialRow({ eyebrow, title, children, image, imageAlt = '', to, linkLabel = 'Learn more', reverse = false, index }) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
      <RevealImage src={image} alt={imageAlt} className={`h-[300px] rounded-xl2 sm:h-[420px] lg:col-span-6 ${reverse ? 'lg:col-start-7 lg:row-start-1' : ''}`} />
      <Reveal delay={0.1} className={`lg:col-span-5 ${reverse ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8'}`}>
        <div className="flex items-center gap-3">
          {index && <span className="text-sm tabular-nums text-ink-400">{index}</span>}
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        </div>
        <h2 className="mt-5 text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-[1.1] tracking-tight text-balance">{title}</h2>
        <div className="prose-dr mt-5">{children}</div>
        {to && <div className="mt-7"><TextLink to={to}>{linkLabel}</TextLink></div>}
      </Reveal>
    </div>
  );
}
