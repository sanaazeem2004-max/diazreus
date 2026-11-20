// Practice areas — names, slugs and copy transcribed from diazreus.com/areas-of-practice (2026-11-18).
// `services` are concise restatements of capabilities named in each official practice page.
import { Scale, ShieldAlert, SearchCheck, ClipboardCheck, Handshake, Globe2, Bitcoin, LineChart, Landmark, Trophy, Lightbulb, Palmtree, Coins, Building2, Users, Plane } from 'lucide-react';

const img = name => `/images/photos/${name}.jpg`;

export const PRACTICES = [
  {
    slug: 'international-litigation-arbitration',
    title: 'International Litigation & Arbitration',
    short: 'Complex, multi-jurisdictional cases and parallel proceedings for noted multinational corporations.',
    icon: Scale, image: img('pa-litigation'), group: 'Disputes',
    body: [
      'Diaz Reus international litigators resolve complex transnational business, contractual and commercial disputes in Latin America, Asia, the Middle East, Europe and the United States. Our international litigators have successfully handled complex, multi-jurisdictional cases and parallel proceedings for noted multinational corporations such as Tyco International, Oracle, and Fujitsu and the governments of China, Brazil, Venezuela, Honduras, El Salvador, and more.',
      'Our broad commercial dispute, trial and arbitration experience brings our commercial clients and in-house corporate-counsel positive outcomes without wasted expense. Our Miami-based commercial litigators work to resolve domestic and cross-border commercial disputes in finance, banking, energy, oil, utilities, manufacturing, customs, shipping, trade, construction, real estate, infrastructure and power-engineering, entertainment, and telecommunications.',
      'Diaz Reus is repeatedly recognized by international ranking-organizations for its abilities, leadership, professionalism, and high ethical standards.',
    ],
    services: ['Transnational business, contractual & commercial disputes', 'Multi-jurisdictional cases & parallel proceedings', 'International & commercial arbitration', 'Representation of multinationals and sovereign governments', 'Industry disputes: finance, energy, shipping, construction, telecoms'],
  },
  {
    slug: 'white-collar-crime-government-sanctions',
    title: 'White Collar Crime & Government Sanctions',
    short: 'Positive outcomes in high-profile cases for multinational corporations, executives and officials.',
    icon: ShieldAlert, image: img('pa-whitecollar'), group: 'Disputes',
    body: [
      'Diaz Reus internationally renowned white-collar criminal defense attorneys know white-collar crime in depth—as former federal and state prosecutors and as white-collar defense counsel. Our noted white-collar criminal defense team has achieved positive outcomes in high-profile cases for multinational corporations, businesspeople, professionals and government officials, in both domestic and international white-collar criminal investigations and prosecutions.',
      'We also help U.S. companies, multinational corporations, and international financial institutions comply with U.S. government and foreign government regulations at all levels, as well as to establish and maintain through corporate governance their global commercial operations compliant with banking and anti-money laundering regulations, OFAC, CAATSA, GLOMAG, Magnitsky and other sanctions programs. Additionally, our white-collar team is adept at pre-indictment and grand jury investigations, post-indictment defense and sentencing guidelines. Our team has a track record in the delisting of persons and entities from the OFAC sanctions list.',
      'From Russia and China to the Middle East, Latin America and the United States, our clients trust our team. We are well known and highly regarded speakers at national and international conferences.',
    ],
    services: ['Domestic & international white-collar defense', 'Pre-indictment & grand jury investigations', 'Post-indictment defense & sentencing', 'OFAC, CAATSA, GLOMAG & Magnitsky sanctions programs', 'OFAC SDN list delisting'],
    quote: { q: 'We engaged the firm on an investigation and, within days, the firm had gathered all the relevant details and provided a clear view of the potential impact. I was very impressed by the personal, hands-on approach – they made me feel like a top client every time we met.', src: 'GIR 100, 2025 edition' },
  },
  {
    slug: 'international-fraud-and-asset-recovery',
    title: 'International Fraud & Asset Recovery',
    short: 'Representing victims of high-stakes international financial fraud to search for and secure assets.',
    icon: SearchCheck, image: img('pa-fraud'), group: 'Disputes',
    body: [
      'Diaz Reus’ international fraud and asset recovery attorneys frequently represent victims of high-stakes massive international financial fraud. They possess vast experience in international fraud and asset recovery, employing our global network of attorneys, solicitors, investigators and consultants to search and secure assets for victims of international fraud schemes.',
      'We have handled high-profile international fraud cases—in Argentina, the Dominican Republic, Colombia, the Turks and Caicos, British Virgin Islands, Gibraltar, Honduras, Costa Rica, China, Guatemala, Peru, Bolivia, Venezuela, and Nicaragua—and have also represented the Republics of Venezuela, China, and Honduras in fraud and asset-recovery actions.',
      'Diaz Reus’ attorneys, solicitors, investigators, and consultants are frequent speakers and authors on fraud, asset recovery, and related legal topics at conferences, symposia, and universities in the U.S. and abroad.',
    ],
    services: ['Representation of victims of international financial fraud', 'Global asset tracing & recovery', 'Sovereign fraud & asset-recovery actions', 'Coordination with investigators & consultants worldwide'],
    quote: { q: 'Javier Coronado and Michael Diaz each brought their own expertise to the table, and I felt I had an outstanding team representing our best interests.', src: 'GIR 100, 2025 edition' },
  },
  {
    slug: 'regulatory-and-corporate-investigations-governance-and-compliance',
    title: 'Regulatory & Corporate Investigations, Governance and Compliance',
    short: 'Keeping global commercial operations compliant with U.S. regulations and sanctions programs.',
    icon: ClipboardCheck, image: img('pa-regulatory'), group: 'Regulatory',
    body: [
      'We help our clients comply with U.S. government regulations at all levels, as well as to establish and maintain their global commercial operations compliant with banking and anti-money laundering regulations, OFAC, CAATSA, GLOMAG, Magnitsky and other sanctions programs.',
      'We conduct due-diligence of our clients’ operations to determine potential money-laundering, terrorist finance and corruption risks and design and implement comprehensive prevention systems.',
      'We offer litigation defense in civil and criminal forfeiture actions, as well as administrative prosecutions before all courts and regulatory and investigatory bodies in international and domestic jurisdictions.',
    ],
    services: ['Banking & anti-money laundering compliance', 'Sanctions compliance programs', 'Money-laundering, terrorist-finance & corruption risk due diligence', 'Civil & criminal forfeiture defense', 'Administrative prosecutions before regulators'],
  },
  {
    slug: 'corporate-ma',
    title: 'Corporate / M&A',
    short: 'Mergers, acquisitions, joint ventures, strategic investments and corporate governance.',
    icon: Handshake, image: img('pa-ma'), group: 'Transactions',
    body: [
      'Diaz Reus’ attorneys possess a mastery of mergers and acquisitions, joint ventures, strategic investments, reorganizations, as well as issues concerning corporate governance and director and officer fiduciary responsibility. Our range of experience across industries, continents and deal sizes is what gives us the competitive edge in successfully advising our clients on how best to achieve their strategic business decisions.',
      'Our firm’s long history of representing clients in cross-border transactions from our offices in the U.S. as well as around the globe, provides unique capabilities, unmatched by most law firms. Diaz Reus lawyers are experienced in acquisitions and dispositions in a wide range of industries, including those that are highly regulated.',
      'A key element of the firm’s mergers and acquisitions practice is our deep understanding of the many corporate governance aspects of transactions. Our corporate and litigation teams effectively counsel boards of directors in difficult and sensitive situations, thereby avoiding future litigation whenever possible. And, when litigation is inevitable, Diaz Reus lawyers have our clients’ backs, whether in the boardroom or in the courtroom.',
    ],
    services: ['Mergers & acquisitions', 'Joint ventures & strategic investments', 'Reorganizations', 'Corporate governance & fiduciary duties', 'Board counsel in sensitive situations'],
  },
  {
    slug: 'corporate-business-transactions-international-trade',
    title: 'Corporate, Business Transactions & International Trade',
    short: 'Helping businesses expand into emerging markets, protect assets and reach their goals.',
    icon: Globe2, image: img('pa-trade'), group: 'Transactions',
    body: [
      'We help clients and their businesses increase their profits, protect their assets and reach their specific goals.',
      'Diaz Reus international commercial attorneys, solicitors and consultants negotiate and draft successful contracts and agreements across diverse legal and cultural environments. From the US, Latin America, Western and Eastern Europe, the Middle East, and Far East, our attorneys will structure sophisticated international contracts, legal structures and agreements that enable growth, profitability, and security.',
      'Our international experience in commercial law extends to industries as diverse as manufacturing, publishing, aviation, finance and banking, retail, logistics, energy, mining, infrastructure, government and more.',
    ],
    services: ['Expansion into emerging markets', 'Identifying the most suitable local partner', 'Eliminating costly litigation', 'Resolving government investigations', 'Protecting assets, proprietary rights & legacies'],
  },
  {
    slug: 'blockchain-and-cryptocurrency',
    title: 'Blockchain & Cryptocurrency',
    short: 'A dedicated “Cryptocurrency Team” for individuals, businesses and financial institutions.',
    icon: Bitcoin, image: img('pa-blockchain'), group: 'Regulatory',
    body: [
      'Diaz Reus’ “Cryptocurrency Team” advises and represents private individuals, businesses, and financial institutions on matters relating to cryptocurrency and blockchain technology.',
      'Comprised of Certified Anti-Money Laundering Specialists, former Federal and State Prosecutors, and former Federal Law Enforcement Agents, Diaz Reus has the depth and expertise required to navigate the uncharted legal landscape of cryptocurrency and blockchain related transactions.',
      'With decades of experience in the areas of white-collar criminal defense, regulatory investigations, corporate governance, and international litigation, Diaz Reus provides top-tier legal representation for clients requiring assistance in this sophisticated area of law.',
    ],
    services: ['Cryptocurrency & blockchain transactions', 'Regulatory investigations', 'Anti-money laundering (CAMS-certified team)', 'White-collar defense in digital-asset matters'],
  },
  {
    slug: 'drrt',
    title: 'DRRT — Global Loss Recovery',
    short: 'Litigation funding, claims filing and securities-loss recovery for institutional investors.',
    icon: LineChart, image: img('pa-drrt'), group: 'Disputes',
    body: [
      'Diaz Reus’ offices through DRRT provide services as a litigation funder, class action settlement claims filer, and represents globally diversified institutional investors in securities litigations relating to investment losses caused by misstatements by public companies. DRRT clients include sovereign wealth and pension funds, mutual fund companies, and (re-) insurance companies, as well as other asset managers from around the world with collective assets under management of over $13 trillion.',
      'DRRT has been pioneering investor protection globally through loss recovery efforts in all major corporate scandals for over 15 years. DRRT’s track record includes record-breaking hallmark results in Europe (Fortis/Ageas – €1.3 billion; Royal Bank of Scotland – £800 million and Royal Dutch Shell – $385 million) as well as Asia (Olympus – ¥11 billion), plus numerous U.S. class or private actions.',
      'DRRT is an industry-leading class action settlement claims filing provider for U.S./Canadian and all other collective action settlements, guaranteeing complete coverage of all securities class action settlements, SEC disgorgement settlements, and other collective settlement situations (including Australian and Dutch settlements) along with large global insolvency matters.',
    ],
    services: ['Litigation funding', 'Class action settlement claims filing', 'Securities litigation for institutional investors', 'SEC disgorgement & collective settlements'],
    external: { label: 'Visit drrt.com', href: 'https://www.drrt.com', phone: '786-235-5000' },
  },
  {
    slug: 'estate-and-tax-planning',
    title: 'Estate & Tax Planning',
    short: 'Cross-border estate plans, trusts, tax plans and business-succession strategies.',
    icon: Landmark, image: img('pa-estate'), group: 'Private Clients',
    body: [
      'Diaz Reus’ estate planners, international tax attorneys and global consultants craft cross-border estate plans, trusts, tax plans, business-succession strategies, and estate-administration initiatives to maximize assets and minimize taxes across international jurisdictions and legal systems.',
      'Diaz Reus’ attorneys formulate complex holdings to avoid legal problems and assure impact of your assets to benefit you, your family, your charities, your business, and other designees and help you understand your options, seize opportunities, and plan ahead.',
    ],
    services: ['Cross-border estate plans', 'Trusts', 'International tax planning', 'Business-succession strategies', 'Estate administration'],
  },
  {
    slug: 'athlete-representation-and-entertainment-law',
    title: 'Athlete Representation & Entertainment Law',
    short: 'Protecting every aspect of an athlete’s or entertainer’s career, brand and legal concerns.',
    icon: Trophy, image: img('pa-athlete'), group: 'Private Clients',
    body: [
      'Diaz Reus provides a team to protect all aspects of the athlete’s or entertainer’s career, brand, and related legal concerns.',
      'We work with agility, precision and experience to help you understand your options, seize opportunities and plan ahead.',
      'We will analyze possible risks and anticipate potential pitfalls where your career or personal objectives may be at stake. Our counsel is comprehensive and tailored to your needs, whether you are a seasoned athlete or entertainer, or just starting out the gate.',
    ],
    services: ['Career & brand protection', 'Risk analysis & planning', 'Tailored counsel for athletes & entertainers'],
    quote: { q: 'They deliver exactly what they promise and what they advise is exactly what happens. They deliver results.', src: 'Chambers Latin America' },
  },
  {
    slug: 'intellectual-property',
    title: 'Intellectual Property',
    short: 'Protecting intellectual property assets globally for companies across four continents.',
    icon: Lightbulb, image: img('pa-ip'), group: 'Transactions',
    body: [
      'Diaz Reus’ intellectual property law practice represents companies based in the US, Asia, Latin America and Western and Eastern Europe, protecting their intellectual property assets globally.',
      'Our multilingual, multicultural legal team successfully fights product counterfeiting, trade-secret theft, and trademark and copyright infringements in courts worldwide. We are also expert in all aspects of trademark and copyright applications, both domestically and worldwide.',
      'From Dubai to Peru, from Chicago to Costa Rica, and from China to Venezuela, our globally savvy intellectual property attorneys deftly negotiate and prepare cross-border license and franchise agreements and manage international brand-protection programs for our worldwide clients in telecommunications, business solutions, technology, manufacturing, publishing, and more.',
    ],
    services: ['Anti-counterfeiting & trade-secret litigation', 'Trademark & copyright infringement', 'Trademark & copyright applications worldwide', 'Cross-border license & franchise agreements', 'International brand-protection programs'],
    quote: { q: 'They deliver exactly what they promise and what they advise is exactly what happens. They deliver results.', src: 'Chambers Latin America' },
  },
  {
    slug: 'cuba-practice',
    title: 'Cuba Practice',
    short: 'Help with the political and logistical issues associated with doing business in Cuba.',
    icon: Palmtree, image: img('pa-cuba'), group: 'Transactions',
    body: [
      'Our team’s work is beyond just legal services, and instead helps clients deal with the political and logistical issues associated with doing business in Cuba.',
    ],
    services: ['Political & logistical guidance for doing business in Cuba'],
  },
  {
    slug: 'bankruptcy-and-asset-recovery',
    title: 'Bankruptcy & Asset Recovery',
    short: 'Helping creditors recoup assets dispersed or secreted across multiple countries.',
    icon: Coins, image: img('pa-bankruptcy'), group: 'Disputes',
    body: [
      'The growth in cross-border commerce and, subsequently, multinational bankruptcies and liquidations requires sophisticated international know-how to help creditors recoup assets dispersed or secreted in various countries.',
      'At Diaz Reus, we bring our creditors’ rights clients unparalleled experience in international asset recovery and financial fraud cases to assist creditors, liquidators, trustees, and acquirers of distressed assets to identify, locate, and seize financial and other assets around the world.',
      'Through insolvency-related investigation, litigation, discovery proceedings, and negotiation, we provide our international and domestic clients an array of proven asset-recovery strategies. Further, you get the personal attention and responsiveness of a top Diaz Reus litigator and consultant.',
    ],
    services: ['Creditors’ rights', 'Cross-border insolvency & liquidation', 'Asset identification, location & seizure', 'Insolvency investigation, litigation & discovery'],
    quote: { q: 'I was very impressed by the personal, hands-on approach – they made me feel like a top client every time we met. They took the time to understand me and my business.', src: 'GIR 100, 2025 edition' },
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    short: 'Development to sale, acquisition to disposition — residential and commercial, worldwide.',
    icon: Building2, image: img('pa-realestate'), group: 'Transactions',
    body: [
      'Diaz Reus attorneys in the Real Estate Department have decades of extensive experience in advising on all of the many legal issues faced by the real estate industry, ranging from development to sale, acquisition to disposition. Our attorneys have handled some of the most challenging real estate transactions, as well as disputes, in the U.S. and around the globe.',
      'We’ve represented developers, financiers, real estate investment trusts, landlords, tenants, purchasers, sellers, brokerages, realtor associations, sovereign wealth funds, to name just a few. Our deal history involves commercial, industrial, residential, multi-family, public-private partnerships and mixed-use projects.',
    ],
    services: ['Development, acquisition & disposition', 'Commercial, industrial & residential transactions', 'Public-private partnerships & mixed-use projects', 'Real estate disputes'],
  },
  {
    slug: 'family-law',
    title: 'Family Law',
    short: 'Multicultural family-law matters across international borders and legal systems.',
    icon: Users, image: img('pa-family'), group: 'Private Clients',
    body: [
      'Sensitive and multilingual, Diaz Reus’ multicultural family law attorneys and solicitors operate successfully across international borders and legal systems in divorce, prenuptial agreements, child custody and other multicultural family-law matters.',
      'We work hand-in-hand with you to help you understand your options, so you maintain the utmost control over your future and that of your family. Our multicultural family law attorneys draw on extensive experience in international asset-tracing, business valuation, real estate, tax, immigration, and finance to materially impact divorce settlements.',
      'We fight with tenacity to win justice for you and provide for your children, while striving to reach a fair settlement without the punitive costs—both financial and emotional—of going to court, exploring alternative dispute resolution methods such as mediation.',
    ],
    services: ['International divorce', 'Prenuptial agreements', 'Child custody', 'Mediation & alternative dispute resolution'],
    quote: { q: 'They deliver exactly what they promise and what they advise is exactly what happens. They deliver results.', src: 'Chambers Latin America' },
  },
  {
    slug: 'immigration-for-businesses-and-individuals',
    title: 'Immigration for Businesses & Individuals',
    short: 'Employment-based and investor visas, EB-5, naturalization and global mobility.',
    icon: Plane, image: img('pa-immigration'), group: 'Private Clients',
    body: [
      'Diaz Reus’ immigration lawyers expedite employer immigration-compliance, employment-based immigrant visas, EB-5 investor matters, family-based immigrant visas, naturalization, and non-immigrant visas, globally.',
      'Our immigration lawyers help global businesses and individuals speed the relocation of employees, new hires, and their families between countries worldwide. Savvy in accommodating major treaty provisions and international protocols, our multilingual, culturally sensitive immigration lawyers and solicitors work in concert with our worldwide network of offices and affiliates.',
      'For U.S. immigration issues, we work with representatives from the Department of Homeland Security, State Department, Justice Department, and U.S. embassies and consulates worldwide to speed your immigration matters and help advance your personal or business goals.',
    ],
    services: ['Employer immigration compliance', 'Employment-based immigrant visas', 'EB-5 investor matters', 'Family-based visas & naturalization', 'Non-immigrant visas'],
  },
];

export const PRACTICE_GROUPS = ['Disputes', 'Regulatory', 'Transactions', 'Private Clients'];
export const getPractice = slug => PRACTICES.find(p => p.slug === slug);
