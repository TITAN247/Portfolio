import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ContactButtonProps {
  id?: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({ id = 'contact-button' }) => {
  const navigate = useNavigate();

  return (
    <button
      id={id}
      onClick={() => navigate('/contact')}
      className="
        rounded-full font-medium uppercase tracking-widest
        px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
        text-xs sm:text-sm md:text-base
        transition-all duration-300 hover:scale-105 hover:brightness-110
      "
      style={{
        fontFamily: "'Kanit', sans-serif",
        color: '#fff8e7',
        background:
          'linear-gradient(135deg, #3b1a04 0%, #7a3b0a 25%, #c47a1a 55%, #e8a830 80%, #c47a1a 100%)',
        boxShadow:
          '0 0 0 1.5px rgba(228,168,48,0.6), 0 4px 20px rgba(180,100,10,0.5), inset 0 1px 0 rgba(255,220,100,0.3), inset 0 -2px 6px rgba(60,20,0,0.4)',
        textShadow: '0 1px 4px rgba(0,0,0,0.6)',
        outline: '1.5px solid rgba(240,180,60,0.4)',
        outlineOffset: '2px',
      }}
    >
      Contact Me
    </button>
  );
};

export default ContactButton;
