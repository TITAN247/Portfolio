import React, { useEffect, useRef } from 'react';

const skills = [
  'Python', 'SQL', 'Tableau', 'Power BI', 'React', 'Node.js', 
  'Express', 'MongoDB', 'AWS', 'Docker', 'Machine Learning', 
  'Data Analytics', 'Pandas', 'NumPy', 'Git', 'Linux',
  'Tailwind CSS', 'TypeScript', 'Javascript', 'C++', 'Java'
];

const SkillGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const items = Array.from(container.children) as HTMLElement[];
    const radius = 150; // Sphere radius
    const total = items.length;
    const speed = 0.003;
    let frameId: number;

    let phi = 0;
    let theta = 0;
    
    // Distribute points on sphere using Fibonacci spiral
    items.forEach((item, i) => {
      const y = 1 - (i / (total - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const thetaOffset = phi;
      phi += Math.PI * (3 - Math.sqrt(5));

      const x = Math.cos(thetaOffset) * radiusAtY;
      const z = Math.sin(thetaOffset) * radiusAtY;

      // Store initial 3D coords in dataset
      item.dataset.x = String(x * radius);
      item.dataset.y = String(y * radius);
      item.dataset.z = String(z * radius);
    });

    let angleX = speed;
    let angleY = speed;

    const animate = () => {
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      items.forEach((item) => {
        let x = parseFloat(item.dataset.x || '0');
        let y = parseFloat(item.dataset.y || '0');
        let z = parseFloat(item.dataset.z || '0');

        // Rotate around Y axis
        let x1 = x * cosY - z * sinY;
        let z1 = z * cosY + x * sinY;

        // Rotate around X axis
        let y1 = y * cosX - z1 * sinX;
        let z2 = z1 * cosX + y * sinX;

        item.dataset.x = String(x1);
        item.dataset.y = String(y1);
        item.dataset.z = String(z2);

        // Map 3D coordinates to 2D
        const scale = 300 / (300 + z2);
        const x2D = x1 * scale;
        const y2D = y1 * scale;

        item.style.transform = `translate3d(${x2D}px, ${y2D}px, 0) scale(${scale})`;
        
        // Fading based on Z depth
        item.style.opacity = String(Math.max(0.1, (scale - 0.5) * 2));
        item.style.zIndex = String(Math.round(scale * 100));
      });

      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center mx-auto perspective-[1000px]">
      <div ref={containerRef} className="absolute inset-0 preserve-3d">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D7E2EA] font-semibold text-sm whitespace-nowrap will-change-transform"
            style={{ textShadow: '0 0 10px rgba(215,226,234,0.3)' }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillGlobe;
