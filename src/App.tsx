import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';
import CertificationsPage from './pages/CertificationsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <div
      className="font-kanit flex flex-col min-h-screen"
      style={{
        background: '#0C0C0C',
        overflowX: 'clip',
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;
