import React from 'react';
import FadeIn from '../components/FadeIn';
import { Mail, Phone, MapPin } from 'lucide-react';

const MY_EMAIL = 'shivansh0962@gmail.com';
const MY_PHONE = '+918081654984';
const MY_PHONE_DISPLAY = '+91 8081 654 984';
const MY_WHATSAPP = 'https://wa.me/918081654984';
const MY_GITHUB = 'https://github.com/TITAN247';
const MY_LINKEDIN = 'https://www.linkedin.com/in/shivansh-chaurasiya-2345722a9/';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Github: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const WhatsApp: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const ContactPage: React.FC = () => {
  const handleEmail = () => {
    window.location.href = `mailto:${MY_EMAIL}`;
  };

  const handleWhatsApp = () => {
    window.open(`${MY_WHATSAPP}?text=${encodeURIComponent("Hi Shivansh! I'd love to connect.")}`, '_blank');
  };

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
              Get In Touch
            </h1>
          </FadeIn>
          <FadeIn delay={0.2} y={30}>
            <p className="text-[#D7E2EA]/60 max-w-lg text-sm md:text-base font-light uppercase tracking-wider">
              Have a project in mind, want to collaborate, or just say hello?
            </p>
          </FadeIn>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <FadeIn delay={0.3} y={20} className="border-b border-[#D7E2EA]/10 pb-4">
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
                Contact Info
              </h2>
            </FadeIn>

            <div className="flex flex-col gap-8">
              {/* Email */}
              <FadeIn delay={0.4} x={-20} className="flex items-start gap-4">
                <div className="p-3.5 bg-[#D7E2EA]/5 rounded-2xl text-[#e8a830]">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D7E2EA]/40 mb-1">Email Me</h4>
                  <a href={`mailto:${MY_EMAIL}`} className="text-base sm:text-lg font-medium hover:text-[#e8a830] transition-colors">
                    {MY_EMAIL}
                  </a>
                </div>
              </FadeIn>

              {/* Phone */}
              <FadeIn delay={0.5} x={-20} className="flex items-start gap-4">
                <div className="p-3.5 bg-[#D7E2EA]/5 rounded-2xl text-[#e8a830]">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D7E2EA]/40 mb-1">Call / WhatsApp</h4>
                  <a href={`tel:${MY_PHONE}`} className="text-base sm:text-lg font-medium hover:text-[#e8a830] transition-colors">
                    {MY_PHONE_DISPLAY}
                  </a>
                </div>
              </FadeIn>

              {/* Location */}
              <FadeIn delay={0.6} x={-20} className="flex items-start gap-4">
                <div className="p-3.5 bg-[#D7E2EA]/5 rounded-2xl text-[#e8a830]">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D7E2EA]/40 mb-1">Location</h4>
                  <p className="text-base sm:text-lg font-medium text-[#D7E2EA]">
                    Mohali, Chandigarh Punjab
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-6 mt-4">
              <FadeIn delay={0.7} y={20}>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D7E2EA]/40 mb-4">Social Networks</h4>
                <div className="flex gap-4">
                  <a
                    href={MY_GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#D7E2EA]/5 rounded-full text-[#D7E2EA]/60 hover:text-[#e8a830] hover:bg-[#D7E2EA]/10 transition-all"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={MY_LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#D7E2EA]/5 rounded-full text-[#D7E2EA]/60 hover:text-[#e8a830] hover:bg-[#D7E2EA]/10 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={MY_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#D7E2EA]/5 rounded-full text-[#25D366]/70 hover:text-[#25D366] hover:bg-[#D7E2EA]/10 transition-all"
                    aria-label="WhatsApp"
                  >
                    <WhatsApp size={20} />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Right: Direct Contact Actions */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <FadeIn delay={0.3} y={20} className="border-b border-[#D7E2EA]/10 pb-4">
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
                Reach Out Directly
              </h2>
            </FadeIn>

            <FadeIn delay={0.4} y={30}>
              <div className="flex flex-col gap-6">
                <p className="text-[#D7E2EA]/50 text-sm md:text-base font-light leading-relaxed">
                  Choose your preferred way to reach me. I'll get back to you as soon as possible!
                </p>

                <div className="flex flex-col gap-5 mt-4">
                  {/* Contact via Email */}
                  <button
                    id="contact-email-btn"
                    onClick={handleEmail}
                    className="w-full flex items-center gap-5 px-8 py-6 rounded-2xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/3 hover:border-[#e8a830]/50 hover:bg-[#e8a830]/5 transition-all duration-300 group"
                  >
                    <div className="p-4 rounded-2xl bg-[#e8a830]/10 text-[#e8a830] group-hover:bg-[#e8a830]/20 transition-all">
                      <Mail size={26} />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-xs uppercase tracking-widest font-semibold text-[#D7E2EA]/40 mb-1">Preferred</p>
                      <p className="text-lg font-bold text-[#D7E2EA] group-hover:text-[#e8a830] transition-colors" style={{ fontFamily: "'Kanit', sans-serif" }}>
                        Contact via Email
                      </p>
                      <p className="text-sm text-[#D7E2EA]/40 mt-0.5">{MY_EMAIL}</p>
                    </div>
                    <div className="text-[#D7E2EA]/20 group-hover:text-[#e8a830]/60 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>

                  {/* Chat on WhatsApp */}
                  <button
                    id="contact-whatsapp-btn"
                    onClick={handleWhatsApp}
                    className="w-full flex items-center gap-5 px-8 py-6 rounded-2xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/3 hover:border-[#25D366]/50 hover:bg-[#25D366]/5 transition-all duration-300 group"
                  >
                    <div className="p-4 rounded-2xl bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366]/20 transition-all">
                      <WhatsApp size={26} />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-xs uppercase tracking-widest font-semibold text-[#D7E2EA]/40 mb-1">Quick Reply</p>
                      <p className="text-lg font-bold text-[#D7E2EA] group-hover:text-[#25D366] transition-colors" style={{ fontFamily: "'Kanit', sans-serif" }}>
                        Chat on WhatsApp
                      </p>
                      <p className="text-sm text-[#D7E2EA]/40 mt-0.5">{MY_PHONE_DISPLAY}</p>
                    </div>
                    <div className="text-[#D7E2EA]/20 group-hover:text-[#25D366]/60 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Availability badge */}
                <div className="flex items-center gap-3 mt-2 px-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 font-medium">
                    Available for new opportunities
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactPage;
