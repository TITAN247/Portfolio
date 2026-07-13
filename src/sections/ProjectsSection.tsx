import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import SpotlightCard from '../components/SpotlightCard';
import LiveProjectButton from '../components/LiveProjectButton';

/* ─── Project data ─── */

interface BaseProject {
  number: string;
  category: string;
  name: string;
  description: string;
  githubUrl?: string;
}

interface WebProject extends BaseProject {
  type: 'web';
  liveUrl: string;
  images: string[];
}

interface DataProject extends BaseProject {
  type: 'data';
  downloadUrl: string;
  images: string[];
}

interface AppProject extends BaseProject {
  type: 'app';
}

type Project = WebProject | AppProject | DataProject;

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const img = (path: string) => `${BASE}${path}`;

const projects: Project[] = [
  {
    type: 'web',
    number: '01',
    category: 'AI · Full-Stack · Mentorship',
    name: 'LetAsk',
    description:
      'LetAsk is an AI-powered mentorship platform designed to connect learners with the right mentors in a simple, intelligent, and accessible way. The platform aims to help students, career seekers, and aspiring entrepreneurs receive personalized guidance.\n\nIt follows a unique dual mentorship model consisting of Pre-Mentors and Pro-Mentors. LetAsk also incorporates an AI-based recommendation system using TF-IDF and Cosine Similarity algorithms to match mentees with the most relevant mentors.\n\nBuilt with Next.js, Node.js, MongoDB Atlas, Tailwind CSS, Socket.io, and Agora.',
    liveUrl: 'https://letask2.onrender.com/',
    githubUrl: 'https://github.com/TITAN247/Letask2.git',
    images: [
      img('/projects/letaskthumbnail.png'),
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
      "Kashi – The Unexplored City is an immersive storytelling and cultural heritage website designed to present Varanasi beyond conventional tourism. Instead of functioning as a simple informational platform, the project combines history, mythology, spirituality, culture, and modern technology to create a unique digital experience.\n\nThe platform features an interactive Ganga-inspired timeline, cinematic storytelling, dynamic animations, and dedicated sections for unexplored temples, hidden ghats, sacred kunds, festivals, city life, and spiritual landmarks. A smart tourist guide with interactive maps helps visitors discover both famous attractions and lesser-known places.\n\nThe primary objective of this project is to preserve and promote the rich heritage of Kashi by transforming historical and cultural knowledge into an engaging digital journey, allowing users to explore the city not just as a destination, but as a living civilization.",
    liveUrl: 'https://kashi-qn3u.onrender.com/',
    githubUrl: 'https://github.com/TITAN247/Kashi.git',
    images: [
      img('/projects/kashithumbnail.png'),
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
      'Jansetu_AI is an AI-driven civic complaint and local governance platform designed to bridge the gap between citizens and government authorities through smart automation and transparent public service management.\n\nThe platform leverages Natural Language Processing (NLP) for automatic complaint categorization, while a YOLOv8 computer vision model analyzes uploaded images to identify civic issues. Jansetu_AI also provides dedicated Admin and Governance Dashboards featuring city-wide maps, complaint analytics, and heatmaps.\n\nBy integrating AI, geospatial intelligence, and smart workflow automation, it offers a scalable solution for building smarter urban governance systems.',
    liveUrl: 'https://jansetu-g9mg.onrender.com/',
    githubUrl: 'https://github.com/TITAN247/Jansetu.git',
    images: [
      img('/projects/jansetuthumbnail.png'),
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
      "Stumdiey is an innovative student-centric learning platform designed to make education more interactive, organized, and accessible. The project aims to bridge the gap between students and quality learning resources by providing a digital space where users can learn, collaborate, and grow together.\n\nThe platform includes features such as secure user authentication, personalized user accounts, session management, and an intuitive interface that allows students to easily access educational content. It is designed to support collaborative learning by enabling students to connect, share knowledge, and engage in meaningful academic discussions.\n\nStumdiey represents a vision of creating a smart educational ecosystem. The project reflects my skills in full-stack web development and backend engineering using technologies like Node.js, Express.js, MongoDB, and modern web development practices.",
    liveUrl: 'https://stumdiey.onrender.com/',
    githubUrl: 'https://github.com/TITAN247/Stumdiey1.git',
    images: [
      img('/projects/stumdieythumbnail.png'),
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
    githubUrl: 'https://github.com/TITAN247',
  },
  {
    type: 'app',
    number: '06',
    category: 'EdTech · Social · Mobile App',
    name: 'Study Mates',
    description:
      'A mobile app connecting competitive exam aspirants (JEE, NEET, UPSC, CUET, SSC) with like-minded study buddies based on exam category, target year, and study preferences. Built with React Native and Firebase, featuring real-time chat, location-based matching, Pomodoro timers, streak tracking, and resource sharing.',
    githubUrl: 'https://github.com/TITAN247',
  },
  {
    type: 'data',
    number: '07',
    category: 'Data Analytics · Python · Dashboard',
    name: 'MegaMart – Retail Sales Analytics',
    description: 'A comprehensive retail sales analytics dashboard for MegaMart. It utilizes Python, NumPy, and Pandas to process and analyze large datasets, uncovering actionable insights for inventory management, sales trends, and profit margins. Visualizations provide an intuitive understanding of retail performance across different regions and categories.',
    downloadUrl: '/projects/megamartscreenshots/MegaMArt.zip',
    githubUrl: 'https://github.com/TITAN247/MegaMart-Retail-Analytics.git',
    images: [
      img('/projects/megamartscreenshots/Screenshot 2026-07-10 114747.png'),
      img('/projects/megamartscreenshots/Screenshot 2026-07-10 114800.png'),
      img('/projects/megamartscreenshots/Screenshot 2026-07-10 114811.png'),
      img('/projects/megamartscreenshots/Screenshot 2026-07-10 114822.png'),
    ],
  },
  {
    type: 'data',
    number: '08',
    category: 'Data Analytics · Python',
    name: 'Personal Finance Manager',
    description: 'A data-driven Personal Finance Manager built with Python. It tracks income, categorizes expenses, and analyzes financial habits over time. It provides a detailed breakdown of spending patterns through automated reporting and clear visual charts, empowering users to make informed financial decisions.',
    downloadUrl: '/projects/bank/Bank.zip',
    githubUrl: 'https://github.com/TITAN247/Personal-Finance-Manager.git',
    images: [
      img('/projects/bank/Screenshot 2026-07-09 212222.png'),
      img('/projects/bank/Screenshot 2026-07-09 212320.png'),
      img('/projects/bank/Screenshot 2026-07-09 212356.png'),
    ],
  },
  {
    type: 'web',
    number: '09',
    category: 'Frontend · React · Tailwind',
    name: 'Personal Portfolio',
    description: 'My personal portfolio website built with React, Vite, Tailwind CSS, and Framer Motion. Features a modern dark-mode aesthetic, glassmorphism design, interactive animations, and EmailJS integration for direct contact.',
    liveUrl: '/',
    githubUrl: 'https://github.com/TITAN247/Portfolio',
    images: [
      img('/shivansh-portrait.jpg'),
    ],
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

const WebImageGrid: React.FC<{ project: WebProject | DataProject }> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMore = project.images.length > 1;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-[20px] sm:rounded-[28px] border border-white/5">
        <img
          src={project.images[0]}
          alt={`${project.name} primary preview`}
          loading="eager"
          decoding="async"
          className="w-full object-cover transition-transform duration-700 hover:scale-105 bg-white/5"
          style={{ height: 'clamp(200px, 30vw, 360px)' }}
        />
      </div>

      {hasMore && !isExpanded && (
        <div className="flex justify-start">
          <button 
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 text-[#D7E2EA] hover:text-[#0C0C0C] font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full text-xs sm:text-sm border border-[#D7E2EA] hover:bg-[#D7E2EA] transition-colors"
          >
            See More Images ({project.images.length - 1})
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}

      {/* Expanded Gallery */}
      <AnimatePresence>
        {isExpanded && hasMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-2">
              {project.images.slice(1).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.name} detail preview ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover rounded-[12px] sm:rounded-[16px] bg-white/5 border border-white/5"
                  style={{ height: 'clamp(100px, 15vw, 180px)' }}
                />
              ))}
            </div>
            <div className="w-full flex justify-start mt-4 mb-2">
              <button
                onClick={() => setIsExpanded(false)}
                className="flex items-center gap-2 text-[#D7E2EA]/60 hover:text-[#D7E2EA] font-medium tracking-wide uppercase text-xs sm:text-sm underline underline-offset-4"
              >
                Show Less
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Expandable Text ─── */

const ExpandableText: React.FC<{ text: string }> = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 200 || text.includes('\n');

  return (
    <div className="w-full flex flex-col items-start gap-3">
      <p
        className={`text-[#D7E2EA] font-normal leading-relaxed w-full ${!expanded ? 'line-clamp-3' : ''}`}
        style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)', opacity: 0.85, whiteSpace: 'pre-wrap', lineHeight: '1.75' }}
      >
        {text}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#D7E2EA] hover:text-[#D7E2EA]/80 font-bold text-xs sm:text-sm tracking-widest uppercase transition-colors flex items-center gap-2"
        >
          {expanded ? 'Read Less' : 'Read More'}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}
    </div>
  );
};

/* ─── Project Card Component ─── */

const ProjectCard: React.FC<{ project: Project; currentIdx: number; className?: string }> = ({ project, currentIdx, className = '' }) => (
  <SpotlightCard
    className={`
      w-full h-full
      rounded-[32px] sm:rounded-[40px] md:rounded-[48px]
      border-2 border-[#D7E2EA]/10
      p-4 sm:p-6 md:p-8
      flex flex-col gap-4 sm:gap-6
      ${className}
    `}
  >
    {/* Top Row — Number, Category/Name, Button */}
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-baseline gap-4 sm:gap-6 flex-wrap">
        <span
          className="font-black text-[#D7E2EA] leading-none"
          style={{ fontSize: 'clamp(2rem, 6vw, 80px)' }}
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
            style={{ fontSize: 'clamp(1rem, 2vw, 1.75rem)' }}
          >
            {project.name}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        {project.type === 'web' && (
          <LiveProjectButton
            id={`live-project-${currentIdx}`}
            href={project.liveUrl}
          />
        )}
        {project.type === 'data' && (
          <LiveProjectButton
            id={`download-data-${currentIdx}`}
            text="Download Report/Code"
            href={project.downloadUrl}
          />
        )}
        {project.type === 'app' && (
          <LiveProjectButton
            id={`watch-demo-${currentIdx}`}
            text="Watch Demo"
          />
        )}
        {project.githubUrl && (
          <LiveProjectButton
            id={`github-repo-${currentIdx}`}
            text="GitHub Repo"
            href={project.githubUrl}
            className="border-[#D7E2EA]/40 text-[#D7E2EA] hover:bg-[#D7E2EA]/10 hover:border-[#D7E2EA]"
          />
        )}
      </div>
    </div>

    {/* Description */}
    <div className="flex-grow flex flex-col w-full">
      <ExpandableText text={project.description} />
    </div>

    {/* Content area */}
    <div className="mt-auto w-full">
      {(project.type === 'web' || project.type === 'data') ? (
        <WebImageGrid project={project} />
      ) : (
        <AppPlaceholder name={project.name} />
      )}
    </div>
  </SpotlightCard>
);

/* ─── Main Section ─── */

const ProjectsSection: React.FC = () => {
  const [[currentSlide, direction], setCurrentSlide] = useState([0, 0]);

  const slideCount = Math.ceil(projects.length / 2);

  const paginate = (newDir: number) => {
    setCurrentSlide(([prev]) => {
      let next = prev + newDir;
      if (next < 0) next = slideCount - 1;
      if (next >= slideCount) next = 0;
      return [next, newDir];
    });
  };

  const goTo = (idx: number) => {
    setCurrentSlide(([prev]) => [idx, idx > prev ? 1 : -1]);
  };

  const project1 = projects[currentSlide * 2];
  const project2 = projects[currentSlide * 2 + 1];

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
      <div className="max-w-[1400px] mx-auto">
        {/* Card */}
        <div className="relative overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full h-full"
            >
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full h-full items-stretch">
                <ProjectCard project={project1} currentIdx={currentSlide * 2 + 1} />
                {project2 && <ProjectCard project={project2} currentIdx={currentSlide * 2 + 2} />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls — arrows + dots */}
        <div className="flex items-center justify-center gap-6 mt-8 sm:mt-10">
          <ArrowButton direction="prev" onClick={() => paginate(-1)} />

          {/* Dots */}
          <div className="flex gap-2.5 flex-wrap justify-center max-w-[200px] sm:max-w-none">
            {Array.from({ length: slideCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  width: i === currentSlide ? 32 : 10,
                  height: 10,
                  borderRadius: 5,
                  background: i === currentSlide
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
          {String(currentSlide + 1).padStart(2, '0')} / {String(slideCount).padStart(2, '0')}
        </p>
      </div>
    </section>
  );
};

export default ProjectsSection;
