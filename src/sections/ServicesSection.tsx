import React from 'react';
import FadeIn from '../components/FadeIn';

const services = [
  {
    number: '01',
    name: 'Data Analytics',
    description:
      'Turning complex data into actionable insights through visualization, statistical analysis, and data-driven strategies.',
  },
  {
    number: '02',
    name: 'Full Stack Web Development',
    description:
      'Creating scalable, responsive, and user-centric web applications with modern development technologies.',
  },
  {
    number: '03',
    name: 'AI Solutions',
    description:
      'Leveraging artificial intelligence to build smart systems, automate workflows, and enhance digital experiences.',
  },
  {
    number: '04',
    name: 'Machine Learning',
    description:
      'Developing intelligent models that learn from data to make predictions and solve complex challenges.',
  },
  {
    number: '05',
    name: 'Innovation & Problem Solving',
    description:
      'Combining creativity and technology to build impactful digital products and real-world solutions.',
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="
        bg-white
        rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
        px-5 sm:px-8 md:px-10
        py-20 sm:py-24 md:py-32
      "
    >
      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2
          className="font-black uppercase text-center text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)', lineHeight: 1 }}
        >
          Services
        </h2>
      </FadeIn>

      {/* Services List */}
      <div className="max-w-5xl mx-auto">
        {services.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="
                flex items-start gap-6 md:gap-10
                py-8 sm:py-10 md:py-12
              "
              style={{
                borderTop: i === 0 ? '1px solid rgba(12,12,12,0.15)' : undefined,
                borderBottom: '1px solid rgba(12,12,12,0.15)',
              }}
            >
              {/* Number */}
              <span
                className="font-black text-[#0C0C0C] flex-shrink-0 leading-none"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </span>

              {/* Name + Description */}
              <div className="flex flex-col justify-center pt-2">
                <h3
                  className="font-medium uppercase text-[#0C0C0C] mb-2"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: 0.6,
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
