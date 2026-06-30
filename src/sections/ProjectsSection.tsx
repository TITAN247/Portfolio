import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';

/* ─── Project data ─── */

interface WebProject {
  type: 'web';
  number: string;
  category: string;
  name: string;
  description: string;
  liveUrl: string;
  images: string[];
}

interface AppProject {
  type: 'app';
  number: string;
  category: string;
  name: string;
  description: string;
}

type Project = WebProject | AppProject;

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const img = (path: string) => `${BASE}${path}`;

const projects: Project[] = [
  {
    type: 'web',
    number: '01',
    category: 'AI · Full-Stack · Mentorship',
    name: 'LetAsk',
    description:
      'LetAsk is an AI-powered mentorship platform connecting learners with the right mentors. Features a dual mentorship model (Pre-Mentors & Pro-Mentors), AI-based matching using TF-IDF and Cosine Similarity, real-time chat, audio/video calls, session booking, and role-based dashboards. Built with Next.js, Node.js, MongoDB Atlas, Tailwind CSS, Socket.io, and Agora.',
    liveUrl: 'https://letask2.onrender.com/',
    images: [
      img('/projects/letask-1.png'),
      img('/projects/letask-2.png'),
      img('/projects/letask-3.png'),
      img('/projects/letask-4.png'),
    ],
  },
  {
    type: 'web',
    number: '02',
    category: 'Heritage · Storytelling · Web',
    name: 'Kashi – The Unexplored City',
    description:
      'An immersive storytelling and cultural heritage website presenting Varanasi beyond conventional tourism. Features an interactive Ganga-inspired timeline, cinematic storytelling, dynamic animations, sections for unexplored temples, hidden ghats, sacred kunds, festivals, and a smart tourist guide with interactive maps.',
    liveUrl: 'https://kashi-qn3u.onrender.com/',
    images: [
      img('/projects/kashi1.png'),
      img('/projects/kashi2.png'),
      img('/projects/kashi3.png'),
    ],
  },
  {
    type: 'web',
    number: '03',
    category: 'AI · Civic Tech · Governance',
    name: 'JanSetu AI',
    description:
      'An AI-driven civic complaint and local governance platform. Supports text, voice, and image-based complaints with multilingual NLP, YOLOv8 computer vision for issue detection, automatic department routing, AI-based before/after verification, and governance dashboards with city-wide analytics and heatmaps.',
    liveUrl: 'https://jansetu-g9mg.onrender.com/',
    images: [
      img('/projects/jansetu1.png'),
      img('/projects/jansetu2.png'),
      img('/projects/jansetu3.png'),
      img('/projects/jansetu4.png'),
    ],
  },
  {
    type: 'web',
    number: '04',
    category: 'EdTech · Full-Stack',
    name: 'Stumdiey',
    description:
      'A student-centric learning platform making education more interactive, organized, and accessible. Features secure authentication, personalized accounts, session management, and collaborative learning. Built with Node.js, Express.js, MongoDB, and modern web development practices.',
    liveUrl: 'https://stumdiey.onrender.com/',
    images: [
      img('/projects/stumdiey1.png'),
      img('/projects/stumdiey2.png'),
      img('/projects/stumdiey3.png'),
    ],
  },
  {
    type: 'app',
    number: '05',
    category: 'AI · Environment · Mobile App',
    name: 'Ganga Guards',
    description:
      'An innovative mobile application focused on environmental sustainability and river ecosystem conservation through AI. Integrates Machine Learning, Data Analytics for intelligent monitoring, data collection, and awareness generation. Analyzes environmental data, detects potential issues, and provides insights for preserving river environments while encouraging community participation.',
  },
  {
    type: 'app',
    number: '06',
    category: 'EdTech · Social · Mobile App',
    name: 'Study Mates',
    description:
      'A mobile app connecting competitive exam aspirants (JEE, NEET, UPSC, CUET, SSC) with like-minded study buddies based on exam category, target year, and study preferences. Built with React Native and Firebase, featuring real-time chat, location-based matching, Pomodoro timers, streak tracking, and resource sharing.',
  },
];

/* ─── Carousel variants ─── */

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.92,
  }),
};

/* ─── Arrow button ─── */

const ArrowButton: React.FC<{
  direction: 'prev' | 'next';
  onClick: () => void;
}> = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    aria-label={direction === 'prev' ? 'Previous project' : 'Next project'}
    className="
      w-12 h-12 sm:w-14 sm:h-14
      rounded-full border-2 border-[#D7E2EA]/30
      flex items-center justify-center
      text-[#D7E2EA] transition-all duration-300
      hover:bg-[#D7E2EA]/10 hover:border-[#D7E2EA]/60
      active:scale-90
    "
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {direction === 'prev' ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 6 15 12 9 18" />
      )}
    </svg>
  </button>
);

/* ─── App placeholder (no images) ─── */

const AppPlaceholder: React.FC<{ name: string }> = ({ name }) => (
  <div
    className="w-full rounded-[24px] sm:rounded-[32px] flex flex-col items-center justify-center gap-5 border-2 border-dashed border-white/12"
    style={{
      height: 'clamp(250px, 35vw, 380px)',
      background: 'linear-gradient(145deg, rgba(26,26,46,0.5) 0%, rgba(22,33,62,0.3) 100%)',
    }}
  >
    {/* Phone icon */}
    <div
      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(215,226,234,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    </div>
    <div className="text-center px-6">
      <p
        className="text-[#D7E2EA] font-medium mb-1"
        style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', opacity: 0.5 }}
      >
        {name} Demo Recording
      </p>
      <p
        className="text-[#D7E2EA] font-light"
        style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)', opacity: 0.3 }}
      >
        Coming Soon
      </p>
    </div>
  </div>
);

/* ─── Web image grid ─── */

const WebImageGrid: React.FC<{ project: WebProject }> = ({ project }) => (
  <div className="grid grid-cols-2 gap-3 sm:gap-4">
    {project.images.map((src, i) => (
      <img
        key={i}
        src={src}
        alt={`${project.name} preview ${i + 1}`}
        loading="eager"
        decoding="async"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.opacity = '0.15';
        }}
        className="w-full object-cover rounded-[20px] sm:rounded-[28px] md:rounded-[36px] bg-white/5"
        style={{ height: 'clamp(140px, 20vw, 260px)' }}
      />
    ))}
  </div>
);

/* ─── Main Section ─── */

const ProjectsSection: React.FC = () => {
  const [[current, direction], setCurrent] = useState([0, 0]);

  const paginate = (newDir: number) => {
    setCurrent(([prev]) => {
      let next = prev + newDir;
      if (next < 0) next = projects.length - 1;
      if (next >= projects.length) next = 0;
      return [next, newDir];
    });
  };

  const goTo = (idx: number) => {
    setCurrent(([prev]) => [idx, idx > prev ? 1 : -1]);
  };

  const project = projects[current];

  return (
    <section
      id="projects"
      className="
        rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        -mt-10 sm:-mt-12 md:-mt-14
        z-10 relative
        px-5 sm:px-8 md:px-10
        pt-20 sm:pt-24 md:pt-32
        pb-20
      "
      style={{ background: '#0C0C0C' }}
    >
      {/* Heading */}
      <FadeIn delay={0} y={40} className="mb-16 sm:mb-20 md:mb-24">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      {/* Carousel container */}
      <div className="max-w-6xl mx-auto">
        {/* Card */}
        <div className="relative overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="
                w-full
                rounded-[40px] sm:rounded-[50px] md:rounded-[60px]
                border-2 border-[#D7E2EA]/40
                p-5 sm:p-7 md:p-10
                flex flex-col gap-5 sm:gap-7
              "
              style={{ background: '#0C0C0C' }}
            >
              {/* Top Row — Number, Category/Name, Button */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-baseline gap-4 sm:gap-6 flex-wrap">
                  <span
                    className="font-black text-[#D7E2EA] leading-none"
                    style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
                  >
                    {project.number}
                  </span>
                  <div className="flex flex-col">
                    <span
                      className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-50"
                      style={{ fontSize: 'clamp(0.65rem, 1.3vw, 0.9rem)' }}
                    >
                      {project.category}
                    </span>
                    <span
                      className="text-[#D7E2EA] font-semibold uppercase tracking-wide"
                      style={{ fontSize: 'clamp(1.1rem, 2.5vw, 2rem)' }}
                    >
                      {project.name}
                    </span>
                  </div>
                </div>

                {project.type === 'web' && (
                  <LiveProjectButton
                    id={`live-project-${current + 1}`}
                    href={project.liveUrl}
                  />
                )}
                {project.type === 'app' && (
                  <LiveProjectButton
                    id={`watch-demo-${current + 1}`}
                    text="Watch Demo"
                  />
                )}
              </div>

              {/* Description */}
              <p
                className="text-[#D7E2EA] font-light leading-relaxed max-w-4xl"
                style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)', opacity: 0.65 }}
              >
                {project.description}
              </p>

              {/* Content area */}
              {project.type === 'web' ? (
                <WebImageGrid project={project} />
              ) : (
                <AppPlaceholder name={project.name} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls — arrows + dots */}
        <div className="flex items-center justify-center gap-6 mt-8 sm:mt-10">
          <ArrowButton direction="prev" onClick={() => paginate(-1)} />

          {/* Dots */}
          <div className="flex gap-2.5">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  width: i === current ? 32 : 10,
                  height: 10,
                  borderRadius: 5,
                  background: i === current
                    ? 'linear-gradient(135deg, #667eea, #764ba2)'
                    : 'rgba(215,226,234,0.2)',
                }}
              />
            ))}
          </div>

          <ArrowButton direction="next" onClick={() => paginate(1)} />
        </div>

        {/* Project counter */}
        <p
          className="text-center mt-4 text-[#D7E2EA] font-light tracking-widest"
          style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)', opacity: 0.35 }}
        >
          {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </p>
      </div>
    </section>
  );
};

export default ProjectsSection;
