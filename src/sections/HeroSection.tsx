import React from 'react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4';

const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="h-screen flex flex-col relative"
      style={{ overflowX: 'clip' }}
    >
      {/* Video Background */}
      <video
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

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
        {/* Bottom Bar */}
        <div className="flex-1 flex items-end">
          <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
            {/* Left text */}
            <FadeIn delay={0.35} y={20}>
              <p
                className="
                  text-[#D7E2EA] font-light uppercase tracking-wide leading-snug
                  max-w-[160px] sm:max-w-[220px] md:max-w-[260px]
                "
                style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
              >
                a data analyst — turning raw data into clarity and building meaningful digital solutions
              </p>
            </FadeIn>

            {/* Contact Button */}
            <FadeIn delay={0.5} y={20}>
              <ContactButton id="hero-contact-button" />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
