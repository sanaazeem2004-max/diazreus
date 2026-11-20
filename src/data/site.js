// Firm-level content transcribed from diazreus.com (inspected 2026-11-18). Nothing here is invented:
// each item maps to text, a logo, or a link published on the official site.

export const FIRM = {
  name: 'Diaz Reus',
  legalName: 'Diaz, Reus & Targ, LLP',
  tagline: 'Global Reach. Local Grasp.',
  hq: {
    building: 'Miami Tower at International Place',
    street: '100 S.E. Second Street, Suite 3400',
    city: 'Miami, FL 33131',
  },
  phones: [
    { label: 'Toll free', display: '+1 (877) 247-9277', href: 'tel:+18772479277' },
    { label: 'Miami', display: '+1 (305) 375-9220', href: 'tel:+13053759220' },
  ],
  email: 'info@diazreus.com',
  disclaimerPdf: 'https://diazreus.com/wp-content/uploads/2020/08/Disclaimer.pdf',
  film: 'https://www.youtube.com/watch?v=faWfmo9kwWQ',
  languages: [
    { code: 'EN', label: 'English', href: '/' },
    { code: 'ES', label: 'Español', href: 'https://diazreus.com/es/' },
    { code: 'RU', label: 'Русский', href: 'https://diazreus.com/ru/' },
  ],
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/diaz-reus-&-targ-llp/' },
    { label: 'X / Twitter', href: 'https://twitter.com/DRT_Alliance' },
    { label: 'Facebook', href: 'https://www.facebook.com/MichaelDiazJr/' },
  ],
  officeCount: 41,
  spokenLanguages: ['English', 'Spanish', 'Czech', 'Mandarin Chinese', 'Russian', 'Arabic', 'Hindi', 'Italian', 'French', 'Portuguese', 'Dutch', 'German'],
};

export const CONTACT_DISCLAIMER =
  'Please note that contacting Diaz Reus through this form does not establish an attorney-client relationship. If the nature of your communication is confidential, please call us directly at 877.247.9277. Thank you.';

export const IMPERSONATION_NOTICE = {
  title: 'Impersonation of Diaz Reus International Law Firm',
  body: 'Diaz Reus International Law Firm (“DRT”) issues this notice to alert the community concerning impersonation attempts. Scammers have sought to misuse our name, as well as the names of DRT attorneys, to falsely offer professional services. Please note that DRT never requests personal information through unofficial websites. Authentic communications originate only from email addresses ending in @diazreus.com or phone numbers listed on diazreus.com. If you are uncertain about the source of any communication using our name, please contact us immediately at info@diazreus.com or +1 (305) 375-9220.',
};

export const NAV = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us', to: '/about-us',
    children: [
      { label: 'About the Firm', to: '/about-us', desc: 'Reach, experience and acute know-how.' },
      { label: 'DRT Alliance', to: '/drt-alliance', desc: 'A global organization of law offices.' },
      { label: 'Representative Matters', to: '/representative-matters', desc: 'Highly publicized cases.' },
      { label: 'Honors & Recognitions', to: '/honors-recognitions', desc: 'Chambers, Legal 500, GIR 100 and more.' },
      { label: 'Investigators', to: '/investigators', desc: 'Investigations & business intelligence.' },
    ],
  },
  { label: 'Our Practice', to: '/us-international-practice' },
  { label: 'Areas of Practice', to: '/areas-of-practice', mega: true },
  { label: 'Attorneys', to: '/attorneys' },
  { label: 'Global Offices', to: '/offices' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

export const BOARD_CERTIFICATIONS = [
  { name: 'The Florida Bar Board Certified — International Litigation and Arbitration', logo: '/images/awards/fl-bar-intl-litigation.png' },
  { name: 'The Florida Bar Board Certified — International Law', logo: '/images/awards/fl-bar-intl-law.png' },
];

// Award badges exactly as displayed in the official "Our Earned Awards" slider.
export const AWARDS = [
  { name: 'Chambers — Ranked in USA 2026', logo: '/images/awards/slide-13.webp' },
  { name: 'Chambers USA 2026, Global 2026, Latin America 2027', logo: '/images/awards/slide-11.webp' },
  { name: 'Legal 500 — Top Tier Firm, United States 2026', logo: '/images/awards/slide-07.webp' },
  { name: 'Legal 500 — Leading Firm, Latin America 2027', logo: '/images/awards/slide-05.webp' },
  { name: 'Legal 500 — US City Elite 2026', logo: '/images/awards/slide-14.webp' },
  { name: 'GIR 100 — 2025', logo: '/images/awards/slide-01.webp' },
  { name: 'GIR — Women in Investigations 2025', logo: '/images/awards/slide-15.webp' },
  { name: 'Latinvex — Latin America’s Top 100 Lawyers 2026', logo: '/images/awards/slide-00.webp' },
  { name: 'Latinvex — Latin America’s Top Law Firms 2026', logo: '/images/awards/slide-08.webp' },
  { name: 'Latinvex — Latin America’s Top Female Lawyers 2026', logo: '/images/awards/slide-09.webp' },
  { name: 'Leaders League — Ranked Firm 2026', logo: '/images/awards/slide-06.webp' },
  { name: 'Leaders League Alliance Summit — Winner 2025', logo: '/images/awards/slide-12.webp' },
  { name: 'Best Lawyers', logo: '/images/awards/slide-02.webp' },
  { name: 'Super Lawyers 2025', logo: '/images/awards/slide-03.webp' },
  { name: 'Law360 — Diversity Snapshot 2025', logo: '/images/awards/slide-04.webp' },
  { name: 'Prestigious Women Awards 2020', logo: '/images/awards/slide-10.webp' },
];

// "Our Earned Awards" text list from /honors-recognitions
export const HONORS_LIST = [
  { org: 'Chambers', items: ['Chambers U.S.A.: Corporate Investigations and White-Collar Criminal Defense: Advice to Individuals, Florida; Litigation: General Commercial, Florida', 'Chambers Latin America: Corporate Crime & Investigations, International Counsel', 'Chambers Global: Corporate Investigations, Latin America-wide'] },
  { org: 'Legal 500', items: ['Legal500 USA: International Litigation; Corporate Investigations & White-Collar Criminal Defense; City Elite Miami: White-Collar and Commercial Disputes', 'Legal500 Latin America: Corporate and M&A (Colombia)', 'Legal500 Latin America: Compliance & White-Collar (Colombia)', 'Legal500 Latin America: Miami Firms; Compliance & Investigations'] },
  { org: 'Global Investigations Review', items: ['GIR100'] },
  { org: 'Latinvex', items: ['Litigation (band 1); FCPA & Fraud (band 2); Trade & Sanctions (band 2)', 'Ranked #1 firm in Latin America for Litigation; #7 for FCPA & Fraud; #6 for Trademarks and IPR; #8 for Trade & Sanctions', 'Top 25 international law firms in Latin America', 'Top 100 Lawyers in Latin America: FCPA & fraud, and Litigation & Arbitration', 'Latin America’s Top 100 Female Lawyers'] },
  { org: 'Leaders League', items: ['Best Florida Litigation Law Firm 2025', 'Leaders League USA: Investigations & White-Collar Crime; and Commercial Litigation', 'Leaders League Colombia: White-Collar Crime; and Compliance'] },
  { org: 'Best Lawyers®', items: ['USA: Tier 1 Firm in Miami for International Arbitration – Governmental & Commercial; Tier 2 Firm in Miami for White-Collar; Tier 3 National Firm for Arbitration – Commercial & Governmental', 'Best Lawyers® Panama: Corporate & M&A'] },
  { org: 'Florida Bar Certification', items: ['International Litigation & Arbitration Law; International Law; and Immigration Law'] },
  { org: 'Further recognition', items: ['Law360: #1 firm for minority attorneys', 'Member of the Board of Advisors of Latin America Advisor, a publication of The Dialogue, Leadership for the Americas', 'Bar Register of Preeminent Lawyers', 'Florida Super Lawyers', 'Top Law Firm and Top Lawyers, South Florida Legal Guide', 'Most Effective Lawyers – International, Daily Business Review', 'International Commercial Litigation and Arbitration Lawyer of the Year, Lawyer Monthly, Women in Law', '“100 Latinos – Miami”', 'Top 30 Foreign Lawyer in Latin America, Latin Business Chronicle', 'International Business Leadership Award for Business Excellence, Miami Chamber of Commerce', 'Top 100 Minority Business Awards, Greater Miami Chamber of Commerce', 'Business Leader of the Year and Power Players, International Law Category, Business Leader Media', 'Hot 100: The hottest lawyers, Asian Legal Business Magazine'] },
];

// Client logos from the official "Clients" slider.
export const CLIENTS = [
  { name: '3M', logo: '/images/clients/slide-01.webp' },
  { name: 'Allianz', logo: '/images/clients/slide-06.webp' },
  { name: 'American Airlines', logo: '/images/clients/slide-10.webp' },
  { name: 'Dubai Islamic Bank', logo: '/images/clients/slide-03.webp' },
  { name: 'China CITIC Bank International', logo: '/images/clients/slide-07.webp' },
  { name: 'CAMC', logo: '/images/clients/slide-09.webp' },
  { name: 'Banco Promerica', logo: '/images/clients/slide-04.webp' },
  { name: 'Nodus Bank', logo: '/images/clients/slide-02.webp' },
  { name: 'CoreCo Private Equity', logo: '/images/clients/slide-05.webp' },
  { name: 'Active RE', logo: '/images/clients/slide-08.webp' },
  { name: 'Boston Agrex', logo: '/images/clients/slide-00.webp' },
  { name: 'GreenBiofuels', logo: '/images/clients/slide-11.webp' },
];

// Testimonials published on diazreus.com (source attribution as shown there).
export const TESTIMONIALS = [
  { quote: 'This is by far the best law firm I’ve ever worked with. In one word: perfection.', source: 'Legal 500 USA', year: '2022' },
  { quote: 'Their main strength is the way they manage the relationship with clients, establishing a mutual confidence in order to understand the problems and focus on the best solution.', source: 'Chambers USA' },
  { quote: 'There are plenty of firms that claim being “multicultural” but … what makes Diaz Reus unique is that it is really diverse and international. They of course have multilingual practitioners, but also understand culture, fee approaches and the way of working with European and Ibero-American multinationals. I strongly recommend them.', source: 'Legal 500 Latin America', year: '2024' },
  { quote: 'They deliver exactly what they promise and what they advise is exactly what happens. They deliver results.', source: 'Chambers Latin America' },
  { quote: 'Reliable, responsive and reasonable. They are consistently good.', source: 'Client testimonial' },
  { quote: 'The customer service was excellent, they were knowledgeable, and they always offered alternative solutions to every issue.', source: 'Chambers Latin America' },
];

// /representative-matters (deduplicated)
export const MATTERS = [
  { tag: 'Mahindra', title: 'Mahindra & Mahindra USA', area: 'Commercial Litigation', body: 'Diaz Reus successfully represented 30 American automobile dealerships in two parallel actions filed in the United States District Court for the Northern District of Georgia and in Georgia State Court in Fulton County, seeking damages resulting from Mahindra and Mahindra USA’s failure to certify and import its light trucks and SUVs from India into the United States.' },
  { tag: 'Argentina', title: 'Seijas, et al. v. The Republic of Argentina', area: 'Sovereign Debt', body: 'Diaz Reus represents bondholders against the Republic of Argentina, which defaulted on its sovereign debt in 2001. Plaintiffs settled their class action lawsuits against Argentina. The class actions involved holders of approximately US $700 million of defaulted Argentine bonds.' },
  { tag: 'FIFA', title: 'FIFA Corruption Scandal', area: 'White Collar Defense', body: 'Diaz Reus represents a media rights company executive in a criminal indictment in connection with the FIFA soccer corruption scandal. Through its efforts, Diaz Reus negotiated a resolution of the criminal case.' },
  { tag: 'OFAC', title: 'OFAC SDN Delisting — Cuellar Silva', area: 'Sanctions', body: 'Diaz Reus successfully represented Mexican citizen and businessman John Freddy Cuellar Silva, who was listed by the US Office of Foreign Assets Control (OFAC) on its SDN list. Diaz Reus successfully de-listed and removed Cuellar Silva from the OFAC list.' },
  { tag: 'Rosenthal', title: 'United States v. Rosenthal (S.D.N.Y.)', area: 'White Collar Defense', body: 'Diaz Reus represents former Honduran presidential candidate, lawyer, banker and businessman Yani Rosenthal in federal court in the Southern District of New York. Diaz Reus negotiated a resolution including a dismissal of the more serious money laundering charges in exchange for a plea of guilty to reduced charges.' },
  { tag: 'Ferrominera', title: 'CGV Ferrominera Orinoco C.A.', area: 'Arbitration & Maritime', body: 'Diaz Reus represented CGV Ferrominera Orinoco C.A. (FMO), an organ of the Bolivarian Republic of Venezuela, in a Rule B maritime attachment action before the U.S. District Court for the Southern District of New York and in six arbitration forums in the US and Europe, involving complex issues of sovereign immunity and maritime jurisdiction.' },
];

// News & Events + Articles & Publications (latest items, linking to the original posts)
const N = 'https://diazreus.com/';
export const INSIGHTS = [
  { type: 'Article', category: 'Investigations', title: 'United States: Sanctions, Whistleblowers and AI Drive Corporate Investigations Agenda', excerpt: 'By Michael Diaz, Jr.; Javier Coronado; Isabela Hernandez-Peredo — general context, key principles and hot topics in U.S. corporate investigations.', date: '2026-11-16', image: '/images/news/Untitled-15-November-2026-at-11.55.42.jpeg', href: N + 'united-states-sanctions-whistleblowers-and-ai-drive-corporate-investigations-agenda/' },
  { type: 'Article', category: 'Publications', title: 'Chambers White-Collar Crime USA Practice Guide 2026', excerpt: 'Isabela Hernandez-Peredo, Michael Diaz, Jr., and Javier Coronado Diaz contribute expert insights on regulatory authorities and companies’ legal obligations.', date: '2026-11-12', image: '/images/news/Chambers-DRT.jpeg', href: N + 'chambers-white-collar-crime-usa-practice-guide/' },
  { type: 'News', category: 'Recognition', title: 'Head of Bogotá Office Marcela Cristina Blanco Recognized by The Best Lawyers in Colombia© 2027', excerpt: 'Recognized in the area of Corporate and Mergers and Acquisitions Law in the 2027 edition.', date: '2026-11-10', image: '/images/news/Marcela-Best-Lawyers.jpeg', href: N + 'head-of-bogota-office-marcela-cristina-blanco-recognized-by-the-best-lawyers-in-colombia-2027/' },
  { type: 'News', category: 'Recognition', title: 'Marta Colomar-Garcia and Marcela Cristina Blanco Among the Latinvex Top 100 Female Lawyers', excerpt: 'Named among the Latinvex Top 100 Female Lawyers specializing in Latin America.', date: '2026-11-09', image: '/images/news/LatinvexTop100FemaleLawyers2026.png', href: N + 'marta-colomar-garcia-and-marcela-cristina-blanco-among-the-latinvex-top-100-female-lawyers-5/' },
  { type: 'News', category: 'Firm News', title: 'Diaz Reus Secures Deletion of INTERPOL Red Notice and Related Data for Client Celestino Ignacio Díaz Fernández', excerpt: 'INTERPOL has deleted the Red Notice and associated data concerning the firm’s client following a decision by the Commission.', date: '2026-11-02', image: '/images/news/new-Diaz.-Reus-logo.jpg', href: N + 'diaz-reus-secures-deletion-of-interpol-red-notice-and-related-data-for-client-celestino-ignacio-diaz-fernandez/' },
  { type: 'News', category: 'Recognition', title: 'Diaz Reus Colombia Recognized by The Legal 500 Latin America 2027', excerpt: 'Diaz Reus Colombia, Marcela Blanco, Javier Coronado and Alejandra Martínez recognized in the Colombia chapter.', date: '2026-11-01', image: '/images/news/Legal500-Colombia-2027.jpeg', href: N + 'diaz-reus-colombia-recognized-by-the-legal-500-latin-america-2027/' },
  { type: 'News', category: 'Recognition', title: 'Diaz Reus USA Recognized by The Legal 500 Latin America 2027', excerpt: 'Five US attorneys — Marta Colomar-Garcia, Michael Diaz, Jr., Robert Targ, Gary Davidson and Javier Coronado — recognized.', date: '2026-11-01', image: '/images/news/Legal500-Latam-2027_DRT-MIami.jpeg', href: N + 'diaz-reus-usa-recognized-by-the-legal-500-latin-america-2027/' },
  { type: 'Article', category: 'Regulatory', title: 'Will Mexico’s Anti-Money Laundering Rules Be Effective?', excerpt: 'Isabela Hernández-Peredo Martínez: Mexico’s new anti-money laundering requirements are significant for businesses engaged in designated “vulnerable activities.”', date: '2026-10-21', image: '/images/news/Isabela-Dialogue.jpeg', href: N + 'will-mexicos-anti-money-laundering-rules-be-effective/' },
  { type: 'Article', category: 'Webinar', title: 'Webinar: Terrorist Designations and Corporate Risk — What General Counsel Need to Know', excerpt: 'A GC Elite webinar featuring Javier Coronado Diaz, Pedro Fragoso Pires, Isabela Hernández Peredo Martínez and investigations researcher Brian Smith.', date: '2026-10-20', image: '/images/news/Terrorist-designations.jpeg', href: N + 'webinar-terrorist-designations-and-corporate-risk-what-general-counsel-need-to-know/' },
  { type: 'News', category: 'Firm News', title: 'Diaz Reus Promotes Prince-Alex Iwu and Mitchell Jagodinski to Partners in Miami', excerpt: 'The Miami-based global law firm announced the promotion of two attorneys to partner.', date: '2026-10-13', image: '/images/news/Prince-Mitch.jpeg', href: N + 'diaz-reus-promotes-prince-alex-iwu-and-mitchell-jagodinski-to-partners-in-miami/' },
  { type: 'News', category: 'Firm News', title: 'Diaz Reus Adds Talent in Miami with Julianne Bagley', excerpt: 'Associate Attorney Julianne Bagley has joined the firm’s Miami headquarters.', date: '2026-10-07', image: '/images/news/Julianne.jpeg', href: N + 'diaz-reus-adds-talent-in-miami-with-julianne-bagley/' },
  { type: 'Article', category: 'Technology', title: 'Who Is Watching the Drone? Privacy, Security and Liability in an Era of Autonomous Flight', excerpt: 'Nicolle Lafosse explores legal challenges from the growing use of drones — privacy, data protection, surveillance and liability.', date: '2026-09-29', image: '/images/news/Untitled-29-September-2026-at-20.20.59.jpeg', href: N + 'who-is-watching-the-drone-privacy-security-and-liability-in-an-era-of-autonomous-flight/' },
  { type: 'Article', category: 'Sanctions', title: 'Blocked or Rejected? The Answer Determines Reporting Duties and Available Remedies', excerpt: 'By John Foster for The GC Elite — U.S. persons holding blocked property must file the 2026 Annual Report of Blocked Property.', date: '2026-09-22', image: '/images/news/Untitled-22-September-2026-at-17.29.18.jpeg', href: N + 'blocked-or-rejected-the-answer-determines-reporting-duties-and-available-remedies/' },
];

export const MORE_NEWS = 'https://diazreus.com/news-events/';
export const MORE_ARTICLES = 'https://diazreus.com/articles-publications/';
