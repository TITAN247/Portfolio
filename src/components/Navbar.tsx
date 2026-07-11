import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'About', path: '/#about' },
  { name: 'Skills', path: '/#skills' },
  { name: 'Projects', path: '/#projects' },
  { name: 'Resume', path: '/resume' },
  { name: 'Certifications', path: '/certifications' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to apply glassmorphism backdrop
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  const isActive = (path: string) => {
    const [pathPart, hashPart] = path.split('#');
    const isSamePath = location.pathname === pathPart;
    if (hashPart) {
      return isSamePath && location.hash === `#${hashPart}`;
    }
    if (pathPart === '/') {
      return isSamePath && !location.hash;
    }
    return isSamePath;
  };

  const handleLinkClick = (path: string) => {
    setIsOpen(false);

    const [pathPart, hashPart] = path.split('#');
    if (location.pathname === pathPart && hashPart) {
      const el = document.getElementById(hashPart);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, padding 0.35s ease',
        background: scrolled
          ? 'rgba(12, 12, 12, 0.82)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(18px) saturate(1.4)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(1.4)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(215, 226, 234, 0.08)'
          : '1px solid transparent',
        boxShadow: scrolled
          ? '0 4px 32px rgba(0,0,0,0.45)'
          : 'none',
        paddingTop: scrolled ? '12px' : '24px',
        paddingBottom: scrolled ? '12px' : '0px',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => handleLinkClick('/')}
          className="text-[#D7E2EA] font-black tracking-widest text-lg md:text-xl uppercase hover:opacity-80 transition-opacity"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Shivansh
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`
                  text-xs xl:text-sm uppercase tracking-wider font-medium
                  pb-1 transition-all duration-200 hover:opacity-100
                  ${active
                    ? 'text-[#D7E2EA] opacity-100 border-b border-[#D7E2EA]'
                    : 'text-[#D7E2EA] opacity-55 hover:opacity-90'
                  }
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[#D7E2EA] hover:opacity-75 transition-opacity focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            style={{
              overflow: 'hidden',
              background: 'rgba(12,12,12,0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(215,226,234,0.08)',
              borderBottom: '1px solid rgba(215,226,234,0.08)',
              marginTop: '12px',
              marginLeft: '-24px',
              marginRight: '-24px',
            }}
          >
            <nav className="flex flex-col px-8 py-6 gap-5">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`
                      text-sm uppercase tracking-widest font-semibold py-1
                      transition-all duration-200
                      ${active
                        ? 'text-[#D7E2EA] opacity-100 pl-3 border-l-2 border-[#D7E2EA]'
                        : 'text-[#D7E2EA] opacity-55'
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
