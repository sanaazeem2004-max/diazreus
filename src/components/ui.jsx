import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export const ease = [0.22, 1, 0.36, 1];

/** The one container used by every section on every page. */
export function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  return <Tag className={`container-x ${className}`} {...rest}>{children}</Tag>;
}

/** Section wrapper: consistent vertical rhythm + tone. */
export function Section({ tone = 'light', className = '', id, children, flush = false, ...rest }) {
  const tones = {
    light: 'bg-paper text-ink',
    mist: 'bg-mist text-ink',
    dark: 'grain-dark text-white',
  };
  return (
    <section id={id} className={`${tones[tone]} ${flush ? '' : 'section-y'} ${className}`} {...rest}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, tone = 'dark', className = '' }) {
  const t = tone === 'light' ? 'eyebrow eyebrow-light' : tone === 'outline' ? 'eyebrow eyebrow-outline' : 'eyebrow';
  return <span className={`${t} ${className}`}>{children}</span>;
}

/** Reveal-on-scroll wrapper. Respects reduced motion. */
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div', ...rest }) {
  const reduce = useReducedMotion();
  const M = motion[as] ?? motion.div;
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </M>
  );
}

/** Image that unveils with a clip-path wipe as it enters the viewport. */
export function RevealImage({ src, alt, className = '', imgClassName = '', delay = 0, loading = 'lazy', ...rest }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={reduce ? false : { clipPath: 'inset(12% 8% 12% 8% round 20px)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 20px)', opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.2, ease, delay }}
      {...rest}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
        initial={reduce ? false : { scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease, delay }}
      />
    </motion.div>
  );
}

/**
 * Section heading. `align="split"` puts the title left and the intro/aside right
 * on the same 12-col grid every section uses.
 */
export function SectionHeading({ id, eyebrow, title, intro, align = 'left', tone = 'dark', aside, as: H = 'h2', className = '' }) {
  const introColor = tone === 'light' ? 'text-white/65' : 'text-ink-500';
  if (align === 'center') {
    return (
      <Reveal className={`mx-auto max-w-3xl text-center ${className}`}>
        {eyebrow && <Eyebrow tone={tone === 'light' ? 'light' : 'dark'}>{eyebrow}</Eyebrow>}
        <H id={id} className="mt-5 text-h2 font-medium text-balance">{title}</H>
        {intro && <p className={`mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed ${introColor} text-pretty`}>{intro}</p>}
        {aside && <div className="mt-8 flex justify-center">{aside}</div>}
      </Reveal>
    );
  }
  if (align === 'split') {
    return (
      <div className={`grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10 ${className}`}>
        <Reveal className="lg:col-span-7">
          {eyebrow && <Eyebrow tone={tone === 'light' ? 'light' : 'dark'}>{eyebrow}</Eyebrow>}
          <H id={id} className="mt-5 text-h2 font-medium text-balance">{title}</H>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-6 lg:col-span-5 lg:items-end lg:text-right">
          {intro && <p className={`max-w-md text-[17px] leading-relaxed ${introColor} text-pretty`}>{intro}</p>}
          {aside}
        </Reveal>
      </div>
    );
  }
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow tone={tone === 'light' ? 'light' : 'dark'}>{eyebrow}</Eyebrow>}
      <H id={id} className="mt-5 text-h2 font-medium text-balance">{title}</H>
      {intro && <p className={`mt-5 max-w-2xl text-[17px] leading-relaxed ${introColor} text-pretty`}>{intro}</p>}
    </Reveal>
  );
}

export function Button({ to, href, variant = 'dark', children, icon = 'arrow', className = '', ...rest }) {
  const cls = `btn btn-${variant} group ${className}`;
  const Icon = icon === 'external' ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      <span>{children}</span>
      {icon && <Icon aria-hidden className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5" />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button className={cls} {...rest}>{inner}</button>;
}

export function TextLink({ to, children, className = '', light = false }) {
  return (
    <Link to={to} className={`group inline-flex items-center gap-1.5 text-sm font-medium ${light ? 'text-white' : 'text-ink'} ${className}`}>
      <span className="link-underline pb-0.5">{children}</span>
      <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

/** Staggered word-by-word headline reveal used in heroes. */
export function SplitHeadline({ id, text, className = '', as: H = 'h1', delay = 0, accent, accentClass = 'text-brand' }) {
  const reduce = useReducedMotion();
  const lines = text.split('\n');
  let i = 0;
  return (
    <H id={id} className={className} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.split(' ').map((word, wi) => {
            const idx = i++;
            const isAccent = accent && accent.includes(word.replace(/[.,]/g, ''));
            return (
              <span key={wi} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className={`inline-block ${isAccent ? `font-serif italic font-normal tracking-[-0.01em] ${accentClass}` : ''}`}
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease, delay: delay + idx * 0.06 }}
                >
                  {word}
                </motion.span>
                {wi < line.split(' ').length - 1 && ' '}
              </span>
            );
          })}
        </span>
      ))}
    </H>
  );
}
