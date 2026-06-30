import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { Briefcase, GraduationCap, Download, Calendar, Eye, X } from 'lucide-react';

const RESUME_PDF = '/projects/Shivansh-Chaurasiya-FlowCV-Resume-20260101.pdf';

const experiences: { role: string; company: string; period: string; description: string }[] = [];

const education = [
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'School Of Management Sciences, Varanasi',
    period: '2023 - 2026',
    description: 'Pursuing a comprehensive degree in computer applications covering programming, data structures, databases, web technologies, and software development.',
  },
];

const skills = [
  { name: 'Data Analysis & Visualization (Excel, Power BI, Tableau)', level: 90 },
  { name: 'Python for Data Analytics (Pandas, NumPy, Matplotlib)', level: 85 },
  { name: 'SQL & Database Management (MySQL, PostgreSQL)', level: 85 },
  { name: 'Web Development (HTML, CSS, JavaScript, React)', level: 80 },
  { name: 'Responsive Design & UI/UX (Figma, Tailwind CSS)', level: 75 },
  { name: 'Version Control & Deployment (Git, GitHub, Vercel)', level: 70 },
];

const ResumePage: React.FC = () => {
  const [showPdf, setShowPdf] = useState(false);
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-[#0C0C0C] text-[#D7E2EA] px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="flex flex-col items-center text-center gap-6 mb-16 md:mb-24">
          <FadeIn delay={0.1} y={30}>
            <h1
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 120px)' }}
            >
              Resume
            </h1>
          </FadeIn>
          <FadeIn delay={0.2} y={30}>
            <p className="text-[#D7E2EA]/60 max-w-lg text-sm md:text-base font-light uppercase tracking-wider">
              A comprehensive overview of my professional experience, education, and technical expertise.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.3} y={20}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* View Resume Button */}
              <button
                onClick={() => setShowPdf(true)}
                className="
                  inline-flex items-center gap-3 rounded-full font-medium uppercase tracking-widest
                  px-8 py-3.5 text-xs sm:text-sm cursor-pointer
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
                <Eye size={16} />
                View Resume
              </button>

              {/* Download CV Button */}
              <a
                href={RESUME_PDF}
                download
                className="
                  inline-flex items-center gap-3 rounded-full font-medium uppercase tracking-widest
                  px-8 py-3.5 text-xs sm:text-sm
                  transition-all duration-300 hover:scale-105 hover:brightness-110
                "
                style={{
                  fontFamily: "'Kanit', sans-serif",
                  color: '#fff8e7',
                  background: 'transparent',
                  border: '1.5px solid rgba(228,168,48,0.6)',
                  textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                }}
              >
                <Download size={16} />
                Download CV
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Work Experience (Timeline) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <FadeIn delay={0.3} y={20} className="flex items-center gap-4 border-b border-[#D7E2EA]/10 pb-4">
              <Briefcase className="text-[#e8a830]" size={28} />
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
                Work Experience
              </h2>
            </FadeIn>

            {experiences.length > 0 ? (
              <div className="relative border-l-2 border-[#D7E2EA]/10 pl-6 sm:pl-8 ml-2 flex flex-col gap-12">
                {experiences.map((exp, idx) => (
                  <FadeIn key={idx} delay={0.1 * idx} x={-20} className="relative group">
                    {/* Timeline Dot */}
                    <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0C0C0C] border-2 border-[#e8a830] group-hover:bg-[#e8a830] transition-colors duration-300" />
                    
                    <span className="flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-wider text-[#e8a830] mb-2">
                      <Calendar size={14} />
                      {exp.period}
                    </span>
                    
                    <h3 className="text-lg md:text-xl font-bold text-[#D7E2EA] group-hover:text-[#fff8e7] transition-colors">
                      {exp.role}
                    </h3>
                    
                    <h4 className="text-sm md:text-base font-semibold text-[#D7E2EA]/70 mb-3">
                      {exp.company}
                    </h4>
                    
                    <p className="text-sm md:text-base font-light text-[#D7E2EA]/60 leading-relaxed max-w-2xl">
                      {exp.description}
                    </p>
                  </FadeIn>
                ))}
              </div>
            ) : (
              <FadeIn delay={0.3} y={20}>
                <p className="text-sm md:text-base font-light text-[#D7E2EA]/40 italic tracking-wide">
                  Currently building my career — exciting things ahead!
                </p>
              </FadeIn>
            )}
          </div>

          {/* Right: Education & Technical Skills */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            {/* Education */}
            <div className="flex flex-col gap-8">
              <FadeIn delay={0.4} y={20} className="flex items-center gap-4 border-b border-[#D7E2EA]/10 pb-4">
                <GraduationCap className="text-[#e8a830]" size={28} />
                <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
                  Education
                </h2>
              </FadeIn>

              <div className="flex flex-col gap-8">
                {education.map((edu, idx) => (
                  <FadeIn key={idx} delay={0.15 * idx} y={20} className="flex flex-col gap-2">
                    <span className="flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-wider text-[#e8a830]">
                      <Calendar size={14} />
                      {edu.period}
                    </span>
                    <h3 className="text-lg font-bold text-[#D7E2EA]">
                      {edu.degree}
                    </h3>
                    <h4 className="text-sm font-semibold text-[#D7E2EA]/70">
                      {edu.school}
                    </h4>
                    <p className="text-sm md:text-base font-light text-[#D7E2EA]/60 leading-relaxed">
                      {edu.description}
                    </p>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-8">
              <FadeIn delay={0.5} y={20} className="flex items-center gap-4 border-b border-[#D7E2EA]/10 pb-4">
                <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
                  Key Expertise
                </h2>
              </FadeIn>

              <div className="flex flex-col gap-6">
                {skills.map((skill, idx) => (
                  <FadeIn key={idx} delay={0.1 * idx} y={15} className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs md:text-sm uppercase tracking-wider font-semibold">
                      <span>{skill.name}</span>
                      <span className="text-[#e8a830]">{skill.level}%</span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="h-1.5 w-full bg-[#D7E2EA]/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#7a3b0a] via-[#c47a1a] to-[#e8a830] rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Full-screen PDF Viewer Overlay */}
      {showPdf && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Top Bar */}
          <div
            className="w-full flex items-center justify-between px-6 py-4"
            style={{ maxWidth: '1100px' }}
          >
            <h3
              className="text-[#e8a830] text-sm md:text-base font-semibold uppercase tracking-widest"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              Resume Preview
            </h3>
            <div className="flex items-center gap-4">
              <a
                href={RESUME_PDF}
                download
                className="inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider font-medium text-[#fff8e7]/70 hover:text-[#e8a830] transition-colors"
              >
                <Download size={14} />
                Download
              </a>
              <button
                onClick={() => setShowPdf(false)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#D7E2EA]/10 hover:bg-[#e8a830]/20 text-[#D7E2EA] hover:text-[#e8a830] transition-all duration-300 cursor-pointer"
                aria-label="Close resume viewer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* PDF Embed */}
          <div
            className="flex-1 w-full overflow-hidden rounded-t-xl"
            style={{
              maxWidth: '1100px',
              border: '1px solid rgba(228,168,48,0.2)',
              borderBottom: 'none',
            }}
          >
            <iframe
              src={RESUME_PDF}
              title="Resume PDF"
              className="w-full h-full"
              style={{
                border: 'none',
                background: '#fff',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ResumePage;
