import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import CertificationsPage from './pages/CertificationsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import PageTransition from './components/PageTransition';

function App() {
  const location = useLocation();

  // Show preloader only once per browser session
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem('preloader_done');
  });

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('preloader_done', '1');
    setLoading(false);
  };

  // Prevent body scroll while preloader is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      {/* Cinematic preloader — shown only on first visit per session */}
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      <div
        className="font-kanit flex flex-col min-h-screen relative"
        style={{
          background: '#0C0C0C',
          overflowX: 'clip',
          visibility: loading ? 'hidden' : 'visible',
        }}
      >
        {/* Global fixed Navbar */}
        <Navbar />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/resume" element={<PageTransition><ResumePage /></PageTransition>} />
            <Route path="/certifications" element={<PageTransition><CertificationsPage /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
