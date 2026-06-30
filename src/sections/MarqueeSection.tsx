import React, { useEffect, useRef, useCallback } from 'react';

const marqueeImages = [
  '/projects/letask-1.png',
  '/projects/letask-2.png',
  '/projects/letask-3.png',
  '/projects/letask-4.png',
  '/projects/kashi1.png',
  '/projects/kashi2.png',
  '/projects/kashi3.png',
  '/projects/jansetu1.png',
  '/projects/jansetu2.png',
  '/projects/jansetu3.png',
  '/projects/jansetu4.png',
  '/projects/stumdiey1.png',
  '/projects/stumdiey2.png',
  '/projects/stumdiey3.png',
  '/projects/screenshot-1.png',
  '/projects/letask-1.png',
  '/projects/letask-2.png',
  '/projects/kashi1.png',
  '/projects/jansetu1.png',
  '/projects/stumdiey1.png',
];

const half = Math.ceil(marqueeImages.length / 2);
const row1Images = [...marqueeImages.slice(0, half), ...marqueeImages.slice(0, half), ...marqueeImages.slice(0, half)];
const row2Images = [...marqueeImages.slice(half), ...marqueeImages.slice(half), ...marqueeImages.slice(half)];


/** Each image card with shine sweep + hover glow */
const MarqueeCard: React.FC<{ src: string; alt: string; delay: number }> = ({ src, alt, delay }) => (
  <div
    className="marquee-card rounded-2xl flex-shrink-0 relative overflow-hidden group"
    style={{
      width: 420,
      height: 270,
      animationDelay: `${delay}s`,
    }}
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
    />
    {/* Shine sweep overlay */}
    <div className="marquee-card-shine absolute inset-0 pointer-events-none rounded-2xl" style={{ animationDelay: `${delay}s` }} />
    {/* Hover glow border */}
    <div
      className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
      style={{
        boxShadow: 'inset 0 0 0 2px rgba(102,126,234,0.5), 0 0 30px rgba(102,126,234,0.2)',
      }}
    />
  </div>
);

const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current || !row1Ref.current || !row2Ref.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
    row1Ref.current.style.transform = `translateX(${offset - 200}px)`;
    row2Ref.current.style.transform = `translateX(${-(offset - 200)}px)`;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section
      id="marquee"
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-10"
      style={{ background: '#0C0C0C', overflow: 'hidden' }}
    >
      {/* Row 1 - moves right on scroll */}
      <div
        ref={row1Ref}
        className="flex gap-3 mb-3"
        style={{ willChange: 'transform', transform: 'translateX(-200px)' }}
      >
        {row1Images.map((src, i) => (
          <MarqueeCard
            key={i}
            src={src}
            alt={`Project preview ${(i % half) + 1}`}
            delay={(i % half) * 0.7}
          />
        ))}
      </div>

      {/* Row 2 - moves left on scroll */}
      <div
        ref={row2Ref}
        className="flex gap-3"
        style={{ willChange: 'transform', transform: 'translateX(200px)' }}
      >
        {row2Images.map((src, i) => (
          <MarqueeCard
            key={i}
            src={src}
            alt={`Project preview ${(i % (marqueeImages.length - half)) + half + 1}`}
            delay={(i % (marqueeImages.length - half)) * 0.7 + 0.35}
          />
        ))}
      </div>
    </section>
  );
};

export default MarqueeSection;

