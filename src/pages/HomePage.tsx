import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../sections/HeroSection';
import MarqueeSection from '../sections/MarqueeSection';
import AboutSection from '../sections/AboutSection';
import ServicesSection from '../sections/ServicesSection';
import ProjectsSection from '../sections/ProjectsSection';
import Footer from '../components/Footer';

// Hook to handle scroll to element from hash on mount/navigation
const useScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Delay slightly to ensure component has mounted and rendered fully
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      // Scroll to top if no hash is present
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);
};

const HomePage: React.FC = () => {
  useScrollToHash();

  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <Footer />
    </>
  );
};

export default HomePage;
