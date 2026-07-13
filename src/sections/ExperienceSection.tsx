import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import SpotlightCard from '../components/SpotlightCard';

const experiences = [
  {
    role: 'Data Analyst Intern',
    company: 'Tech Solutions Inc.',
    date: 'Jan 2023 - Present',
    description: 'Analyzing massive datasets to uncover hidden patterns. Built dashboards using Power BI and Tableau that increased operational efficiency by 20%.',
    side: 'left',
  },
  {
    role: 'Full-Stack Developer',
    company: 'Freelance',
    date: '2021 - 2023',
    description: 'Developed and deployed full-stack web applications for local businesses using React, Node.js, and MongoDB. Improved client digital footprints significantly.',
    side: 'right',
  },
  {
    role: 'B.Tech in Computer Science',
    company: 'University of Engineering',
    date: '2019 - 2023',
    description: 'Graduated with honors. Specialized in Machine Learning and Data Science. Led the university coding club and won 2 hackathons.',
    side: 'left',
  },
];

const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      className="relative flex flex-col items-center px-5 sm:px-8 md:px-14 py-20 sm:py-24"
      style={{ background: '#0C0C0C' }}
      ref={containerRef}
    >
      <FadeIn delay={0} y={40} className="mb-16 sm:mb-24">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
        >
          Journey
        </h2>
      </FadeIn>

      <div className="relative w-full max-w-5xl mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* The glowing vertical timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-[#1A222C] -translate-x-1/2 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-[#D7E2EA]"
            style={{ height: lineHeight, boxShadow: '0 0 20px #D7E2EA' }}
          />
        </div>

        {experiences.map((exp, index) => {
          const isLeft = exp.side === 'left';
          return (
            <div
              key={index}
              className={`relative flex items-center justify-start md:justify-between w-full ${isLeft ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#0C0C0C] border-2 border-[#D7E2EA] -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(215,226,234,0.6)]" />

              {/* Empty space for desktop layout */}
              <div className="hidden md:block w-[45%]" />

              {/* Glassmorphism Card */}
              <div className="w-[85%] pl-8 md:pl-0 md:w-[45%]">
                <FadeIn delay={0.2} x={isLeft ? -30 : 30}>
                  <SpotlightCard
                    className="
                      p-6 sm:p-8 backdrop-blur-xl
                      border border-[#D7E2EA]/10
                      bg-gradient-to-br from-[#ffffff08] to-[#ffffff01]
                    "
                  >
                    <span className="inline-block text-[#D7E2EA] opacity-60 font-mono text-sm mb-2">{exp.date}</span>
                    <h3 className="text-[#D7E2EA] font-semibold text-xl sm:text-2xl tracking-wide uppercase mb-1">
                      {exp.role}
                    </h3>
                    <h4 className="text-[#667EEA] font-medium text-sm sm:text-base uppercase tracking-widest mb-4">
                      {exp.company}
                    </h4>
                    <p className="text-[#D7E2EA] opacity-70 font-light leading-relaxed text-sm sm:text-base">
                      {exp.description}
                    </p>
                  </SpotlightCard>
                </FadeIn>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceSection;
