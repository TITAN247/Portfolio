import React from 'react';
import { motion } from 'framer-motion';

interface ParticleAssembleProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  elementType?: 'text' | 'container';
}

const ParticleAssemble: React.FC<ParticleAssembleProps> = ({
  text,
  children,
  className = '',
  delay = 0,
  duration = 1.5,
  elementType = 'text',
}) => {
  // Variant for the container to stagger children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  // Generate random scatter offsets for realistic assembly
  const getRandomOffset = () => (Math.random() - 0.5) * 500;

  // Particle variant
  const particleVariants = {
    hidden: () => ({
      opacity: 0,
      scale: Math.random() * 2 + 0.5,
      x: getRandomOffset(),
      y: getRandomOffset(),
      z: getRandomOffset(),
      filter: 'blur(30px)',
      rotate: (Math.random() - 0.5) * 180,
    }),
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      z: 0,
      filter: 'blur(0px)',
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 80,
        mass: 1,
      },
    },
  };

  if (elementType === 'text' && text) {
    // Split text into characters for a true particle assembly feel
    const characters = text.split('');
    return (
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`inline-flex flex-wrap ${className}`}
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={particleVariants}
            className="inline-block"
            // Preserve spaces
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal', willChange: 'transform, filter, opacity' }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // If it's a container (for images, divs, etc.)
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          scale: 0.8,
          filter: 'blur(40px)',
          y: 100,
        },
        visible: {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          y: 0,
          transition: {
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      initial="hidden"
      animate="visible"
      className={className}
      style={{ willChange: 'transform, filter, opacity' }}
    >
      {children}
    </motion.div>
  );
};

export default ParticleAssemble;
