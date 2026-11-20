import { Link } from 'react-router-dom';

/** Official Diaz Reus lockup (drt mark + wordmark). `variant="light"` for dark backgrounds. */
export default function Logo({ variant = 'dark', className = '' }) {
  const src = variant === 'light' ? '/images/brand/header-logo.png' : '/images/brand/firm-logo.png';
  return (
    <Link to="/" aria-label="Diaz Reus International Law Firm — home" className={`inline-flex shrink-0 items-center ${className}`}>
      <img src={src} alt="Diaz Reus International Law Firm" width="1330" height="432" className="h-11 w-auto sm:h-[52px]" />
    </Link>
  );
}
