import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
const About = lazy(() => import('./pages/About.jsx'));
const InternationalPractice = lazy(() => import('./pages/InternationalPractice.jsx'));
const AreasOfPractice = lazy(() => import('./pages/AreasOfPractice.jsx'));
const PracticeDetail = lazy(() => import('./pages/PracticeDetail.jsx'));
const AttorneysPage = lazy(() => import('./pages/Attorneys.jsx'));
const Offices = lazy(() => import('./pages/Offices.jsx'));
const ContactPage = lazy(() => import('./pages/Contact.jsx'));
const Insights = lazy(() => import('./pages/Insights.jsx'));
const Honors = lazy(() => import('./pages/Honors.jsx'));
const RepresentativeMatters = lazy(() => import('./pages/RepresentativeMatters.jsx'));
const DrtAlliance = lazy(() => import('./pages/DrtAlliance.jsx'));
const Investigators = lazy(() => import('./pages/Investigators.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const location = useLocation();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<div className="min-h-screen" />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/us-international-practice" element={<InternationalPractice />} />
            <Route path="/drt-alliance" element={<DrtAlliance />} />
            <Route path="/representative-matters" element={<RepresentativeMatters />} />
            <Route path="/honors-recognitions" element={<Honors />} />
            <Route path="/areas-of-practice" element={<AreasOfPractice />} />
            <Route path="/areas-of-practice/:slug" element={<PracticeDetail />} />
            <Route path="/attorneys" element={<AttorneysPage />} />
            <Route path="/investigators" element={<Investigators />} />
            <Route path="/offices" element={<Offices />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Legacy diazreus.com URLs */}
            <Route path="/attorneys-conselors/*" element={<Navigate to="/attorneys" replace />} />
            <Route path="/drt-alliance-3" element={<Navigate to="/drt-alliance" replace />} />
            <Route path="/news-events" element={<Navigate to="/insights" replace />} />
            <Route path="/articles-publications" element={<Navigate to="/insights" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}
