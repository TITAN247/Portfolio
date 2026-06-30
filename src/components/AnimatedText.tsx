import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');

  return (
    <p
      ref={ref}
      className={className}
      aria-label={text}
      style={{ ...style }}
    >
      {words.map((word, wordIndex) => {
        const start = wordIndex / words.length;
        const end = (wordIndex + 1) / words.length;
        return (
          <AnimatedWord
            key={wordIndex}
            word={word}
            scrollYProgress={scrollYProgress}
            start={start}
            end={end}
          />
        );
      })}
    </p>
  );
};

interface AnimatedWordProps {
  word: string;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  start: number;
  end: number;
}

const AnimatedWord: React.FC<AnimatedWordProps> = ({ word, scrollYProgress, start, end }) => {
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return (
    <>
      <motion.span style={{ opacity, display: 'inline' }}>
        {word}
      </motion.span>
      {' '}
    </>
  );
};

export default AnimatedText;
