import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import CertificationsPage from './pages/CertificationsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';

function App() {
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
        className="font-kanit flex flex-col min-h-screen"
        style={{
          background: '#0C0C0C',
          overflowX: 'clip',
          visibility: loading ? 'hidden' : 'visible',
        }}
      >
        {/* Global fixed Navbar */}
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
