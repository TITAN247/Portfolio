import React from 'react';
import FadeIn from '../components/FadeIn';
import SkillGlobe from '../components/SkillGlobe';
import InteractiveChart from '../components/InteractiveChart';

const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-14 py-20 sm:py-24"
      style={{ background: '#0C0C0C' }}
    >
      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Text Left */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <FadeIn delay={0} y={30}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
            >
              My Arsenal
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2} y={20}>
            <p
              className="text-[#D7E2EA] font-light leading-relaxed max-w-lg"
              style={{ fontSize: 'clamp(1rem, 1.6vw, 1.25rem)', opacity: 0.7 }}
            >
              A constantly evolving ecosystem of languages, tools, and frameworks. From crafting scalable backends to weaving interactive frontends, and diving deep into data analytics and machine learning.
            </p>
          </FadeIn>
        </div>

        {/* Right side: Globe + Chart */}
        <div className="flex-shrink-0 flex flex-col items-center gap-10 w-full lg:w-auto">
          <FadeIn delay={0.4} x={40}>
            <SkillGlobe />
          </FadeIn>
          
          <FadeIn delay={0.6} y={30} className="w-full max-w-[500px]">
            <InteractiveChart />
          </FadeIn>
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
