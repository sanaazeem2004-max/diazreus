import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Scale } from 'lucide-react';
import { Reveal } from './ui.jsx';
import WaveLines from './WaveLines.jsx';

/** Dark consultation banner shown above the footer on every page except Contact. */
export default function CtaBanner() {
  const { pathname } = useLocation();
  if (pathname === '/contact' || pathname === '/') return null;
  return (
    <div className="bg-paper pt-14 md:pt-16">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-xl2 bg-ink px-6 py-10 text-white sm:px-10 md:py-12">
          <WaveLines className="pointer-events-none absolute -right-20 top-0 h-full w-[60%] text-white/15" />
          <div className="relative grid items-center gap-8 md:grid-cols-12">
            <div className="flex items-start gap-5 md:col-span-8">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-ink"><Scale className="h-6 w-6" aria-hidden /></span>
              <div>
                <p className="text-2xl font-medium tracking-tight md:text-[28px]">Discuss a cross-border matter with our team</p>
                <p className="mt-2 max-w-xl text-[15px] text-white/60">Board Certified attorneys in International Litigation & Arbitration and International Law, across {41} offices.</p>
              </div>
            </div>
            <div className="flex md:col-span-4 md:justify-end">
              <Link to="/contact" className="btn btn-light">Contact the firm <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
