import { motion, useReducedMotion } from 'framer-motion';
import { LAND_PATH, MAP_W, MAP_H, MAP_Y0 } from '../data/map.generated.js';
import { OFFICES } from '../data/offices.generated.js';

const HQ = OFFICES.find(o => o.hq);

/**
 * Interactive world map. Land, markers and arcs come from the same projection
 * (precomputed in scripts/build-data.mjs), so markers are geographically exact.
 */
export default function WorldMap({ activeRegion = 'All', activeOffice, onSelect, onHover, tone = 'dark', showArcs = true, className = '' }) {
  const reduce = useReducedMotion();
  const dark = tone === 'dark';
  const visible = o => activeRegion === 'All' || o.region === activeRegion;

  return (
    <svg viewBox={`0 ${MAP_Y0} ${MAP_W} ${MAP_H}`} className={`h-auto w-full ${className}`} role="img" aria-label={`Map of ${OFFICES.length} Diaz Reus office locations worldwide`}>
      <defs>
        <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.15" fill={dark ? 'rgba(255,255,255,0.22)' : 'rgba(15,15,16,0.22)'} />
        </pattern>
        <clipPath id="land-clip"><path d={LAND_PATH} /></clipPath>
        <radialGradient id="glow"><stop offset="0%" stopColor="#8DBBDD" stopOpacity="0.55" /><stop offset="100%" stopColor="#8DBBDD" stopOpacity="0" /></radialGradient>
      </defs>
      <rect y={MAP_Y0} width={MAP_W} height={MAP_H} fill="url(#dots)" clipPath="url(#land-clip)" />

      {showArcs && OFFICES.filter(o => !o.hq && visible(o)).map((o, i) => {
        const mx = (HQ.x + o.x) / 2;
        const my = Math.min(HQ.y, o.y) - Math.abs(o.x - HQ.x) * 0.22 - 10;
        return (
          <motion.path
            key={'arc' + o.slug + activeRegion}
            d={`M${HQ.x},${HQ.y} Q${mx},${my} ${o.x},${o.y}`}
            fill="none" stroke={dark ? '#8DBBDD' : '#00548B'} strokeWidth="0.7" strokeOpacity={activeOffice === o.slug ? 0.95 : 0.35}
            initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.2 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
          />
        );
      })}

      {OFFICES.map(o => {
        const on = visible(o);
        const active = activeOffice === o.slug;
        return (
          <g
            key={o.slug}
            transform={`translate(${o.x} ${o.y})`}
            className="cursor-pointer focus:outline-none"
            style={{ opacity: on ? 1 : 0.18, transition: 'opacity .5s' }}
            tabIndex={on ? 0 : -1}
            role="button"
            aria-label={`${o.city}, ${o.country}`}
            aria-pressed={active}
            onClick={() => onSelect?.(o)}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onSelect?.(o))}
            onMouseEnter={() => onHover?.(o)}
            onMouseLeave={() => onHover?.(null)}
            onFocus={() => onHover?.(o)}
            onBlur={() => onHover?.(null)}
          >
            <circle r="14" fill="transparent" />
            {(o.hq || active) && !reduce && (
              <circle r="6" fill="url(#glow)">
                <animate attributeName="r" values="6;18;6" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0;1" dur="2.6s" repeatCount="indefinite" />
              </circle>
            )}
            <circle r={o.hq ? 5 : active ? 4.5 : 3} fill={o.hq ? (dark ? '#fff' : '#0F0F10') : dark ? '#8DBBDD' : '#00548B'} stroke={dark ? '#0F0F10' : '#fff'} strokeWidth="1.5" style={{ transition: 'r .3s' }} />
          </g>
        );
      })}
    </svg>
  );
}
