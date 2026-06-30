import React from 'react';
import { Mail } from 'lucide-react';
import FadeIn from './FadeIn';
import ContactButton from './ContactButton';

const MY_EMAIL = 'shivansh0962@gmail.com';
const MY_GITHUB = 'https://github.com/TITAN247';
const MY_LINKEDIN = 'https://www.linkedin.com/in/shivansh-chaurasiya-2345722a9/';
const MY_WHATSAPP = 'https://wa.me/918081654984';

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

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0C0C0C] border-t border-[#D7E2EA]/10 py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-10 md:gap-14">
        {/* Let's Talk Heading */}
        <FadeIn delay={0.1} y={30}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 120px)' }}
          >
            Let&apos;s talk
          </h2>
        </FadeIn>

        {/* Contact Button */}
        <FadeIn delay={0.2} y={30}>
          <ContactButton id="footer-contact-button" />
        </FadeIn>

        {/* Social Links & Copyright */}
        <div className="w-full flex flex-col items-center gap-6 mt-6">
          <FadeIn delay={0.3} y={20} className="flex gap-6">
            <a
              href={MY_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href={MY_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href={MY_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366]/70 hover:text-[#25D366] transition-colors"
              aria-label="WhatsApp"
            >
              <WhatsApp size={22} />
            </a>
            <a
              href={`mailto:${MY_EMAIL}`}
              className="text-[#D7E2EA]/60 hover:text-[#D7E2EA] transition-colors"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </FadeIn>

          <FadeIn delay={0.4} y={20}>
            <p className="text-[#D7E2EA]/40 text-xs md:text-sm font-light uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Shivansh. All rights reserved.
            </p>
          </FadeIn>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
