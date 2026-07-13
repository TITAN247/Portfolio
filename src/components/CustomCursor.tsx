import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only set up on non-mobile
    if (window.innerWidth <= 768) return;

    let requestRef: number;
    let mouseX = 0;
    let mouseY = 0;
    
    // For smooth trailing effect on the ring
    let ringX = 0;
    let ringY = 0;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.magnetic')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const render = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(${isHovering ? 0 : 1})`;
      }
      
      if (ringRef.current) {
        // Lerp for smooth trailing effect
        ringX += (mouseX - ringX) * 0.2;
        ringY += (mouseY - ringY) * 0.2;
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px) scale(${isHovering ? 1.5 : 1})`;
      }
      
      requestRef = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    requestRef = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(requestRef);
    };
  }, [isHovering]);

  // Don't render on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  return (
    <>
      {/* Small dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full mix-blend-screen transition-transform duration-100 ease-out"
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#D7E2EA',
        }}
      />
      {/* Outer glowing ring / trail */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-screen transition-all duration-300 ease-out"
        style={{
          width: '40px',
          height: '40px',
          border: '1px solid rgba(215,226,234,0.4)',
          backgroundColor: isHovering ? 'rgba(215,226,234,0.1)' : 'transparent',
          boxShadow: isHovering ? '0 0 20px rgba(215,226,234,0.3)' : '0 0 10px rgba(215,226,234,0.1)',
        }}
      />
    </>
  );
};

export default CustomCursor;
