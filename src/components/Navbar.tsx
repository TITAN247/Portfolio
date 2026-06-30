import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import FadeIn from './FadeIn';

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

  const isActive = (path: string) => {
    const [pathPart, hashPart] = path.split('#');
    const isSamePath = location.pathname === pathPart;
    if (hashPart) {
      return isSamePath && location.hash === `#${hashPart}`;
    }
    // For '/' without hash, we match if pathname is '/' and hash is empty
    if (pathPart === '/') {
      return isSamePath && !location.hash;
    }
    return isSamePath;
  };

  const handleLinkClick = (path: string) => {
    setIsOpen(false);
    
    // If we're already on target path with hash, scroll to it manually
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
    <FadeIn delay={0} y={-20} className="w-full relative z-50">
      <header className="w-full px-6 md:px-10 pt-6 md:pt-8">
        <div className="flex justify-between items-center max-w-7xl mx-auto border-b border-[#D7E2EA]/10 pb-4">
          {/* Logo / Brand Name */}
          <Link
            to="/"
            onClick={() => handleLinkClick('/')}
            className="text-[#D7E2EA] font-black tracking-widest text-lg md:text-xl uppercase hover:opacity-85 transition-opacity"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Shivansh
          </Link>

          {/* Desktop Navigation Links */}
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
                    pb-1 transition-all duration-200
                    hover:opacity-100
                    ${active ? 'text-[#D7E2EA] opacity-100 border-b border-[#D7E2EA]' : 'text-[#D7E2EA] opacity-60'}
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-[#D7E2EA] hover:opacity-75 transition-opacity focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0C0C0C]/95 backdrop-blur-md border-b border-[#D7E2EA]/15 shadow-xl transition-all duration-300 lg:hidden">
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
                      ${active ? 'text-[#D7E2EA] opacity-100 pl-2 border-l-2 border-[#D7E2EA]' : 'text-[#D7E2EA] opacity-60'}
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>
    </FadeIn>
  );
};

export default Navbar;
