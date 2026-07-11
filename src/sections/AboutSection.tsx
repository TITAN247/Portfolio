import React from 'react';
import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-14 py-24"
      style={{ background: '#0C0C0C' }}
    >
      {/* Top-left: Moon icon */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="Moon 3D decoration"
          className="w-[90px] sm:w-[130px] md:w-[180px] h-auto"
        />
      </FadeIn>

      {/* Bottom-left: 3D object */}
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[6%] left-[2%] sm:left-[5%] md:left-[8%] pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D decorative object"
          className="w-[80px] sm:w-[110px] md:w-[150px] h-auto"
        />
      </FadeIn>

      {/* Top-right: Lego icon */}
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="Lego 3D decoration"
          className="w-[90px] sm:w-[130px] md:w-[180px] h-auto"
        />
      </FadeIn>

      {/* Bottom-right: 3D group */}
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[6%] right-[2%] sm:right-[5%] md:right-[8%] pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D decorative group"
          className="w-[100px] sm:w-[140px] md:w-[190px] h-auto"
        />
      </FadeIn>

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center gap-16 md:gap-20">

        {/* Section heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Two-column: Photo left, Text right */}
        <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24">

          {/* ── Photo Column ── */}
          <FadeIn delay={0.15} x={-50} y={0} className="flex-shrink-0 flex flex-col items-center gap-6">
            {/* Portrait card */}
            <div
              style={{
                position: 'relative',
                width: 'clamp(220px, 24vw, 310px)',
              }}
            >
              {/* Ambient glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-16px',
                  borderRadius: '24px',
                  background:
                    'radial-gradient(ellipse, rgba(215,226,234,0.14) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                  zIndex: 0,
                }}
              />
              {/* Gradient border wrapper */}
              <div
                style={{
                  position: 'relative',
                  padding: '2px',
                  borderRadius: '22px',
                  background:
                    'linear-gradient(160deg, rgba(215,226,234,0.55) 0%, rgba(215,226,234,0.08) 50%, rgba(215,226,234,0.4) 100%)',
                  zIndex: 1,
                  boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                }}
              >
                <img
                  src="/shivansh-photo.jpg"
                  alt="Shivansh Chaurasiya"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'clamp(290px, 34vw, 420px)',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    borderRadius: '20px',
                  }}
                />
              </div>
            </div>

            {/* Name + title badge below photo */}
            <div className="flex flex-col items-center gap-2 text-center">
              <h3
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 800,
                  fontSize: 'clamp(1.1rem, 2.2vw, 1.7rem)',
                  color: '#D7E2EA',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                }}
              >
                Shivansh Chaurasiya
              </h3>
              <span
                style={{
                  fontFamily: "'Kanit', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(0.65rem, 1.1vw, 0.82rem)',
                  color: '#D7E2EA',
                  opacity: 0.42,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                }}
              >
                Data Analyst · Developer
              </span>
            </div>
          </FadeIn>


          {/* ── Text Column ── */}
          <div className="flex flex-col items-center lg:items-start gap-10 flex-1">
            <AnimatedText
              text="Driven by curiosity and a passion for technology, I specialize in exploring the intersection of Data Analytics, Software Development, and Artificial Intelligence. I enjoy turning complex data into actionable insights and building innovative digital solutions that solve real-world challenges. With a creative mindset and a commitment to continuous learning, I aim to create meaningful impact through data and technology."
              className="text-[#D7E2EA] font-medium text-center lg:text-left leading-relaxed max-w-[560px]"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}
            />

            <ContactButton id="about-contact-button" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
