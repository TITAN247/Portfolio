import React, { useState } from 'react';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { Calendar, Clock, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

const hackathonPhotos = [
  { src: '/Hackathons/IMG-20251010-WA0034.jpg', caption: 'Event Moment' },
  { src: '/Hackathons/IMG-20260219-WA0032.jpg', caption: 'Team Action' },
  { src: '/Hackathons/IMG-20260220-WA0130.jpg', caption: 'Competition Day' },
  { src: '/Hackathons/IMG_20251012_190858.jpg', caption: 'Hackathon Venue' },
  { src: '/Hackathons/IMG_20251012_232925.jpg', caption: 'Late Night Coding' },
  { src: '/Hackathons/IMG_20251231_223940.jpg', caption: 'Award Ceremony' },
];

const posts = [
  {
    id: 1,
    title: 'The 24-Hour Crucible: Lessons from Hackathons & Tech Marathons',
    excerpt: 'Reflecting on the sleepless nights, rapid prototyping, and collaborative breakthroughs across major collegiate hackathons—from SMS Lucknow to KIT Varanasi.',
    date: 'Apr 28, 2026',
    readTime: '6 min read',
    category: 'Hackathons',
    featured: true,
    thumbnail: '/hackathon_thumbnail.png',
    gradient: 'from-[#3b0712] via-[#6d071a] to-[#9f1239]',
    content: [
      'There is a unique kind of magic that occurs in the quiet hours between 2:00 AM and 6:00 AM during a 24-hour hackathon. The initial excitement has worn off, fatigue begins to set in, but the pressure of the ticking clock forces an absolute clarity of focus. Over the past two years, participating in competitive hackathons has been one of the most defining aspects of my software development journey.',
      'My experience spans multiple major competitions, including the 24-hour Tech Marathon 1.0 organized by the Livewire Technical Club at School of Management Sciences, Varanasi, where my team won the Consolation Prize for building an end-to-end web system under pressure. Additionally, during the SMSOTSAV-2026 Hackwave in Lucknow, we competed against talented engineering teams from across the state and secured a victory. We also achieved Runner Up position at Tech Star 2.0 at Kashi Institute of Technology (Varanasi) in December 2025, and second prize in the WebDX 8-Hour Web Development Hackathon.',
      'What these events taught me goes beyond writing syntax. First, it taught me the importance of a Minimum Viable Product (MVP). In a hackathon, a 100% complete feature that does not work is worthless compared to a 70% complete application that executes its core promise flawlessly. Second, it taught me how to communicate technical architecture to non-technical judges during pitches, ensuring they see both the technical complexity and the business value.'
    ],
    showGallery: true,
  },
  {
    id: 2,
    title: 'Corporate Job Simulations: Bridging the Gap from BCA to Global Tech',
    excerpt: 'How simulating real-world engineering tasks at JPMorgan Chase, Deloitte, and Tata helped me build production-ready mental models of enterprise scale.',
    date: 'May 30, 2026',
    readTime: '5 min read',
    category: 'Job Simulation',
    featured: false,
    thumbnail: '/job_simulation_thumbnail.png',
    gradient: 'from-[#03071e] via-[#370617] to-[#6a040f]',
    content: [
      'As a computer applications student, academic assignments often focus on building isolated programs or databases. However, enterprise software requires an entirely different mental model—one that prioritizes security, scalability, legacy code integration, and regulatory compliance. To bridge this gap, I completed a series of virtual job simulations simulating roles at global firms like JPMorgan Chase, Tata, Deloitte, and Commonwealth Bank.',
      'For example, in the JPMorgan Chase Quantitative Research simulation, I was tasked with pricing commodity storage contracts, analyzing historical price datasets, and writing FICO score bucketing algorithms. At Tata, through the Cybersecurity Analyst and GenAI Powered Data Analytics simulations, I crafted identity and access management (IAM) strategies and built predictive AI analytics for corporate risk profiling. Simulations at Deloitte and Commonwealth Bank further challenged me in security architecture and iOS widget development.',
      'These simulations provided me with a sandbox to apply advanced programming concepts to realistic business scenarios. I learned that coding is only half the battle; writing documentation, designing threat models, and understanding how data drives collection or risk management strategies are equally critical for a professional developer.'
    ],
    showGallery: false,
  },
  {
    id: 3,
    title: 'Structured Learning: From Core Algorithms to Full-Stack Architectures',
    excerpt: 'A deep dive into structural learning paths—earning certifications from IIT Bombay Spoken Tutorials and interactive workshops in React, Python, and Data Structures.',
    date: 'Dec 10, 2025',
    readTime: '7 min read',
    category: 'Workshops',
    featured: false,
    thumbnail: '/workshop_thumbnail.png',
    gradient: 'from-[#03045e] via-[#0077b6] to-[#00b4d8]',
    content: [
      'A strong house cannot be built on a weak foundation. Throughout my technical studies, I have consistently pursued structured certifications and intensive workshops to sharpen my foundational computer science concepts and keep up with modern front-end developments.',
      'My core training includes the Spoken Tutorial Project developed at IIT Bombay, where I successfully completed exams in C (December 2024), PHP & MySQL (April 2025), and Java (December 2025) with high scores. These certificates are verified by IIT Bombay, requiring remote online exams that test true understanding of programming syntax and database relationships.',
      'In addition to core languages, I participated in professional workshops to build hands-on skills in modern engineering. This includes Minicimex\'s 8-day intensive workshop on "Interactive Web Development using JavaScript and React" and "Data Analysis with Python", alongside workshops focused on "Efficient Coding Logic for Data Structures". Through these, I transitioned from writing basic command-line applications to building responsive component-based UIs and parsing large datasets.'
    ],
    showGallery: false,
  }
];

const BlogPage: React.FC = () => {
  const [activePost, setActivePost] = useState<any | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const featuredPost = posts.find(p => p.featured);
  const regularPosts = posts.filter(p => !p.featured);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex(i => (i !== null ? (i - 1 + hackathonPhotos.length) % hackathonPhotos.length : 0));
  const nextPhoto = () => setLightboxIndex(i => (i !== null ? (i + 1) % hackathonPhotos.length : 0));

  return (
    <>
      <main className="flex-1 w-full bg-[#0C0C0C] text-[#D7E2EA] px-6 md:px-12 pt-32 pb-16 md:pt-36 md:pb-24 max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="flex flex-col items-center text-center gap-6 mb-16 md:mb-24">
          <FadeIn delay={0.1} y={30}>
            <h1
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 120px)' }}
            >
              Stories
            </h1>
          </FadeIn>
          <FadeIn delay={0.2} y={30}>
            <p className="text-[#D7E2EA]/60 max-w-lg text-sm md:text-base font-light uppercase tracking-wider">
              Compelling narratives, technical milestones, and reflections from workshops and hackathons.
            </p>
          </FadeIn>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <FadeIn delay={0.3} y={40} className="mb-16">
            <div
              className="
                group relative w-full rounded-2xl overflow-hidden border border-[#D7E2EA]/10 bg-[#0C0C0C]
                hover:border-[#e8a830]/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 cursor-pointer
              "
              style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)' }}
              onClick={() => setActivePost(featuredPost)}
            >
              {/* Thumbnail Left */}
              <div className="lg:col-span-6 h-64 lg:h-auto relative overflow-hidden">
                <img
                  src={featuredPost.thumbnail}
                  alt={featuredPost.category}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#0C0C0C]/30" />
                <div className="absolute top-6 left-6 bg-[#0C0C0C]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#D7E2EA]/10 text-xs font-semibold uppercase tracking-widest text-[#e8a830]">
                  {featuredPost.category}
                </div>
              </div>

              {/* Content Right */}
              <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-4 text-xs text-[#D7E2EA]/50 font-light uppercase tracking-wider mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={14} />{featuredPost.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} />{featuredPost.readTime}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide leading-snug mb-4 group-hover:text-[#fff8e7] transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-sm md:text-base font-light text-[#D7E2EA]/60 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePost(featuredPost);
                    }}
                    className="
                      inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider
                      text-[#e8a830] hover:text-[#fff8e7] transition-colors group/link
                    "
                  >
                    Read Story
                    <ArrowRight size={16} className="group-hover/link:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {regularPosts.map((post, idx) => (
            <FadeIn
              key={idx}
              delay={0.1 * idx}
              y={30}
              className="
                group relative bg-[#0C0C0C] border border-[#D7E2EA]/10 rounded-2xl overflow-hidden cursor-pointer
                hover:border-[#e8a830]/40 transition-all duration-300 hover:-translate-y-1.5
                flex flex-col justify-between h-full
              "
              style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)' }}
              onClick={() => setActivePost(post)}
            >
              {/* Thumbnail */}
              <div className="h-44 relative overflow-hidden">
                <img
                  src={post.thumbnail}
                  alt={post.category}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#0C0C0C]/30" />
                <div className="absolute top-4 left-4 bg-[#0C0C0C]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#D7E2EA]/10 text-[10px] font-semibold uppercase tracking-widest text-[#e8a830]">
                  {post.category}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-[#D7E2EA]/50 font-light uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-wide leading-snug mb-3 text-[#D7E2EA] group-hover:text-[#fff8e7] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm font-light text-[#D7E2EA]/60 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePost(post);
                    }}
                    className="
                      inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider
                      text-[#e8a830] hover:text-[#fff8e7] transition-colors group/link
                    "
                  >
                    Read Story
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </main>

      {/* Story Overlay / Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-6 overflow-y-auto">
          <div
            className="bg-[#0C0C0C] border border-[#D7E2EA]/15 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-4 right-4 z-10 text-[#D7E2EA]/60 hover:text-[#fff8e7] bg-black/40 hover:bg-black/60 p-2 rounded-full transition-all"
              aria-label="Close story"
            >
              <X size={20} />
            </button>

            {/* Thumbnail Banner */}
            <div className="relative w-full h-56 md:h-72 overflow-hidden rounded-t-3xl">
              <img
                src={activePost.thumbnail}
                alt={activePost.category}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 px-8 md:px-12 pb-8 md:pb-10">
                <span className="inline-block bg-[#0C0C0C]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#D7E2EA]/10 text-xs font-semibold uppercase tracking-widest text-[#e8a830] mb-3">
                  {activePost.category}
                </span>
                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-wide leading-tight text-[#fff8e7]">
                  {activePost.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-[#D7E2EA]/75 uppercase tracking-wider mt-3">
                  <span className="flex items-center gap-1.5"><Calendar size={14} />{activePost.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} />{activePost.readTime}</span>
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className="p-8 md:p-12 flex flex-col gap-8">
              {/* Text Paragraphs */}
              <div className="flex flex-col gap-6 text-[#D7E2EA]/80 font-light leading-relaxed text-sm md:text-base">
                {activePost.content.map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Hackathon Photo Gallery */}
              {activePost.showGallery && (
                <div className="border-t border-[#D7E2EA]/15 pt-8 mt-2">
                  <h4 className="text-xs uppercase tracking-widest text-[#e8a830] font-bold mb-6">
                    Event Gallery
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {hackathonPhotos.map((photo, i) => (
                      <div
                        key={i}
                        className="relative group cursor-pointer rounded-xl overflow-hidden aspect-square"
                        onClick={() => openLightbox(i)}
                      >
                        <img
                          src={photo.src}
                          alt={photo.caption}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-3">
                          <span className="text-white text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {photo.caption}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
            aria-label="Close lightbox"
          >
            <X size={22} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            className="absolute left-4 md:left-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={hackathonPhotos[lightboxIndex].src}
              alt={hackathonPhotos[lightboxIndex].caption}
              className="max-h-[75vh] max-w-full object-contain rounded-xl"
            />
            <div className="text-center">
              <p className="text-white font-semibold uppercase tracking-wider text-sm">
                {hackathonPhotos[lightboxIndex].caption}
              </p>
              <p className="text-white/40 text-xs mt-1">
                {lightboxIndex + 1} / {hackathonPhotos.length}
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            className="absolute right-4 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      <Footer />
    </>
  );
};

export default BlogPage;
