import React from 'react';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';

const certifications = [
  {
    title: 'Quantitative Research Job Simulation',
    issuer: 'JPMorgan Chase & Co. (via Forage)',
    date: 'May 2026',
    credentialId: 'ZsNifPvqqxm5hT4tJ',
    link: '/certificates/bWqaecPDbYAwSDqJy_Sj7temL583QAYpHXD_6940f2b748cd4cf0b7a5440d_1780066651273_completion_certificate.pdf',
  },
  {
    title: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'Tata (via Forage)',
    date: 'May 2026',
    credentialId: '9JYAsTRTopjra2e5M',
    link: '/certificates/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_6940f2b748cd4cf0b7a5440d_1780034671234_completion_certificate.pdf',
  },
  {
    title: 'Tech Marathon 1.0 24-Hour Hackathon - Consolation Prize',
    issuer: 'Livewire Club, School of Management Sciences, Varanasi',
    date: 'Apr 2026',
    credentialId: 'SMS-TM1-2026',
    link: '/certificates/IMG_20260618_115454.jpg',
  },
  {
    title: 'Abhyuday\'26 Techno-Cultural-Sports Fest - Participation',
    issuer: 'Ashoka Institute of Technology & Management, Varanasi',
    date: 'Feb 2026',
    credentialId: 'AITM-ABH-2026',
    link: '/certificates/IMG_20260618_115429.jpg',
  },
  {
    title: '8-Hour Web Development Hackathon (WebDX) - Second Prize',
    issuer: 'LiveWire Club, School of Management Sciences, Varanasi',
    date: 'Feb 2026',
    credentialId: 'SMS-WDX-2026',
    link: '/certificates/IMG_20260618_115511.jpg',
  },
  {
    title: 'Hackathon (Hackwave) Event - Participation',
    issuer: 'School of Management Sciences, Lucknow',
    date: 'Feb 2026',
    credentialId: 'SMSL-HW-2026',
    link: '/certificates/IMG_20260618_115401.jpg',
  },
  {
    title: 'Cybersecurity Analyst Job Simulation',
    issuer: 'Tata (via Forage)',
    date: 'Jan 2026',
    credentialId: 'XQ72jH3myT2k8NoWc',
    link: '/certificates/gmf3ypEXBj2wvfQWC_ifobHAoMjQs9s6bKS_6940f2b748cd4cf0b7a5440d_1768979821123_completion_certificate.pdf',
  },
  {
    title: 'Cyber Job Simulation',
    issuer: 'Deloitte (via Forage)',
    date: 'Jan 2026',
    credentialId: 'CJaFLZzyn7KCQANwz',
    link: '/certificates/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_6940f2b748cd4cf0b7a5440d_1768835237665_completion_certificate.pdf',
  },
  {
    title: 'Tech Explorer Job Simulation',
    issuer: 'Commonwealth Bank (via Forage)',
    date: 'Jan 2026',
    credentialId: 'YzhB02D2vrz6M2Msy',
    link: '/certificates/GYcpProEZQFCiSmT6_2sNmYuurxgpFYawco_6940f2b748cd4cf0b7a5440d_1768838815508_completion_certificate.pdf',
  },
  {
    title: 'Java Training (Spoken Tutorial)',
    issuer: 'IIT Bombay & EduPyramids',
    date: 'Dec 2025',
    credentialId: '4085574SSB',
    link: '/certificates/SAVE_20251210_152834.jpg',
  },
  {
    title: 'Tech Star 2.0 Hackathon - Runner Up',
    issuer: 'Kashi Institute of Technology, Varanasi',
    date: 'Dec 2025',
    credentialId: 'KIT-TS2-2025',
    link: '/certificates/IMG_20260618_115415.jpg',
  },
  {
    title: 'NextGen AI: Varanasi Techcon-2025 Conference',
    issuer: 'School of Management Sciences, Varanasi',
    date: 'Nov 2025',
    credentialId: 'SMS-TC-2025',
    link: '/certificates/IMG_20260618_115442.jpg',
  },
  {
    title: 'PHP and MySQL Training (Spoken Tutorial)',
    issuer: 'IIT Bombay & EduPyramids',
    date: 'Apr 2025',
    credentialId: '4085574S96',
    link: '/certificates/SAVE_20251210_152637.jpg',
  },
  {
    title: 'Hackathon Participation',
    issuer: 'Kashi Institute of Technology, Varanasi',
    date: 'Mar 2025',
    credentialId: 'KIT-HACK-2025',
    link: '/certificates/IMG_20260618_115522.jpg',
  },
  {
    title: 'Interactive Web Development Using JavaScript and React',
    issuer: 'Minicimex (at School of Management Sciences, Varanasi)',
    date: 'Mar 2025',
    credentialId: 'MC-IWD-2025',
    link: '/certificates/IMG_20260618_115618.jpg',
  },
  {
    title: 'C Training (Spoken Tutorial)',
    issuer: 'IIT Bombay',
    date: 'Dec 2024',
    credentialId: '4085574E01',
    link: '/certificates/SAVE_20251210_152514.jpg',
  },
  {
    title: 'Data Analysis with Python Workshop',
    issuer: 'Minicimex (at School of Management Sciences, Varanasi)',
    date: 'Oct 2024',
    credentialId: 'MC-DAP-2024',
    link: '/certificates/IMG_20260618_115628.jpg',
  },
  {
    title: '"Code Sniffer" Coding Competition',
    issuer: 'Livewire Club, School of Management Sciences, Varanasi',
    date: 'Sep 2024',
    credentialId: 'SMS-CS-2024',
    link: '/certificates/IMG_20260618_115538.jpg',
  },
  {
    title: 'Efficient Coding Logic for Data Structures',
    issuer: 'AARAPHsYA Development Pvt Ltd (at School of Management Sciences, Varanasi)',
    date: 'Apr 2024',
    credentialId: 'AD-ECL-2024',
    link: '/certificates/IMG_20260618_115606.jpg',
  },
  {
    title: 'Python Programming Workshop',
    issuer: 'AARAPHsYA Development Pvt Ltd (at School of Management Sciences, Varanasi)',
    date: 'Feb 2024',
    credentialId: 'AD-PP-2024',
    link: '/certificates/IMG_20260618_115551.jpg',
  },
];

const CertificationsPage: React.FC = () => {
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
              Credentials
            </h1>
          </FadeIn>
          <FadeIn delay={0.2} y={30}>
            <p className="text-[#D7E2EA]/60 max-w-lg text-sm md:text-base font-light uppercase tracking-wider">
              A collection of verified licenses, certifications, and academic achievements.
            </p>
          </FadeIn>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certifications.map((cert, idx) => (
            <FadeIn
              key={idx}
              delay={0.05 * idx}
              y={30}
              className="
                group relative bg-[#0C0C0C] border border-[#D7E2EA]/10 rounded-2xl p-6 md:p-8
                hover:border-[#e8a830]/40 transition-all duration-300 hover:-translate-y-1.5
                flex flex-col justify-between overflow-hidden
              "
              style={{
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Decorative background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#e8a830]/0 to-[#e8a830]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                {/* Header Icon & Issuer */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-[#D7E2EA]/5 rounded-xl text-[#e8a830]">
                    <Award size={24} />
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-[#D7E2EA]/40 uppercase tracking-widest font-semibold">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    Verified
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide leading-snug mb-3 text-[#D7E2EA] group-hover:text-[#fff8e7] transition-colors">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="text-sm font-semibold text-[#D7E2EA]/70 mb-4">
                  {cert.issuer}
                </p>
              </div>

              <div>
                {/* Details Footer */}
                <div className="border-t border-[#D7E2EA]/15 pt-4 flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 text-xs md:text-sm text-[#D7E2EA]/50 font-light">
                    <Calendar size={14} />
                    <span>Issued {cert.date}</span>
                  </div>
                  {cert.credentialId && (
                    <div className="text-xs text-[#D7E2EA]/40 font-mono tracking-wider">
                      ID: {cert.credentialId}
                    </div>
                  )}
                </div>

                {/* Link */}
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider
                    text-[#e8a830] hover:text-[#fff8e7] transition-colors group/link
                  "
                >
                  View Certificate
                  <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CertificationsPage;
