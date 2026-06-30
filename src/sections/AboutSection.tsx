import React from 'react';
import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="
        relative min-h-screen
        flex flex-col items-center justify-center
        px-5 sm:px-8 md:px-10 py-20
      "
      style={{ background: '#0C0C0C' }}
    >
      {/* Top-left: Moon icon */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="Moon 3D decoration"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto"
        />
      </FadeIn>

      {/* Bottom-left: 3D object */}
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D decorative object"
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto"
        />
      </FadeIn>

      {/* Top-right: Lego icon */}
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="Lego 3D decoration"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto"
        />
      </FadeIn>

      {/* Bottom-right: 3D group */}
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D decorative group"
          className="w-[130px] sm:w-[170px] md:w-[220px] h-auto"
        />
      </FadeIn>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Animated paragraph + button */}
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text="Driven by curiosity and a passion for technology, I specialize in exploring the intersection of Data Analytics, Software Development, and Artificial Intelligence. I enjoy turning complex data into actionable insights and building innovative digital solutions that solve real-world challenges. With a creative mindset and a commitment to continuous learning, I aim to create meaningful impact through data and technology."
            className="
              text-[#D7E2EA] font-medium text-center leading-relaxed
              max-w-[560px]
            "
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />

          <ContactButton id="about-contact-button" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
