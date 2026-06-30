import React from 'react';

interface LiveProjectButtonProps {
  id?: string;
  text?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  id = 'live-project-button',
  text = 'Live Project',
  href,
  onClick,
  className = '',
}) => {
  const baseClass = `
    rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA]
    font-medium uppercase tracking-widest
    px-8 py-3 sm:px-10 sm:py-3.5
    text-sm sm:text-base
    transition-all duration-200 hover:bg-[#D7E2EA]/10
    inline-block text-center
    ${className}
  `;

  if (href) {
    return (
      <a
        id={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
      >
        {text}
      </a>
    );
  }

  return (
    <button
      id={id}
      onClick={onClick}
      className={baseClass}
    >
      {text}
    </button>
  );
};

export default LiveProjectButton;

