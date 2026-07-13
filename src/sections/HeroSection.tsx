import React from 'react';
import ParticleAssemble from '../components/ParticleAssemble';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4';

const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="h-screen flex flex-col relative"
      style={{ overflowX: 'clip' }}
    >
      {/* Video Background with Particle Entrance */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <ParticleAssemble elementType="container" delay={0.2} duration={2} className="w-full h-full">
          <video
            src={VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </ParticleAssemble>
      </div>

      {/* Dark overlay so text remains readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(12,12,12,0.45) 0%, rgba(12,12,12,0.25) 50%, rgba(12,12,12,0.65) 100%)',
          zIndex: 1,
        }}
      />

      {/* All foreground content sits above video */}
      <div className="relative flex flex-col h-full" style={{ zIndex: 2 }}>
        
        {/* Giant Centered Title Assembling from Particles */}
        <div className="flex-1 flex flex-col items-center justify-center pt-20 px-6 pointer-events-none">
          <div className="text-center flex flex-col items-center">
            <ParticleAssemble elementType="container" delay={0.8} duration={1.5} className="mb-4 sm:mb-8 pointer-events-auto">
              <div className="inline-flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-[#D7E2EA] font-medium tracking-wide text-xs sm:text-sm">Available for work</span>
              </div>
            </ParticleAssemble>
            
            <h1 className="hero-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-[#D7E2EA] to-[#D7E2EA]/50 uppercase leading-[0.9] tracking-tighter"
                style={{ fontSize: 'clamp(3rem, 12vw, 150px)' }}>
              <ParticleAssemble text="CREATIVE" delay={1.2} />
              <br/>
              <span className="text-[#e8a830]">
                <ParticleAssemble text="DEVELOPER" delay={1.6} />
              </span>
            </h1>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 pointer-events-none">
          {/* Left text */}
          <ParticleAssemble elementType="container" delay={2.0} duration={1.5} className="pointer-events-auto">
            <p
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
            >
              a data analyst — turning raw data into clarity and building meaningful digital solutions
            </p>
          </ParticleAssemble>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
