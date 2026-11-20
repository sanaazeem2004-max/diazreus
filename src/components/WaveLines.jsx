/** Fine flowing contour lines — the decorative motif used in hero and CTA backgrounds. */
export default function WaveLines({ className = '', lines = 26 }) {
  const paths = Array.from({ length: lines }, (_, i) => {
    const o = i * 9;
    return `M-50 ${120 + o} C 150 ${20 + o * 1.4}, 300 ${260 + o * 0.6}, 520 ${110 + o} S 820 ${o * 0.8}, 1050 ${150 + o * 1.1}`;
  });
  return (
    <svg className={className} viewBox="0 0 1000 420" preserveAspectRatio="none" fill="none" aria-hidden>
      {paths.map((d, i) => <path key={i} d={d} stroke="currentColor" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />)}
    </svg>
  );
}
