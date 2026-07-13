import React from 'react';
import { motion } from 'framer-motion';

const nodes = [
  { size: 300, color: '#D7E2EA', blur: 150, top: '10%', left: '-5%', delay: 0, duration: 20 },
  { size: 400, color: '#3A4A5A', blur: 200, top: '40%', left: '70%', delay: 5, duration: 25 },
  { size: 250, color: '#1B2735', blur: 100, top: '70%', left: '10%', delay: 2, duration: 22 },
  { size: 350, color: '#667EEA', blur: 180, top: '80%', left: '80%', delay: 7, duration: 28 },
];

const FloatingNodes: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: node.size,
            height: node.size,
            background: node.color,
            top: node.top,
            left: node.left,
            filter: `blur(${node.blur}px)`,
            opacity: 0.15,
          }}
          animate={{
            y: [0, 50, -50, 0],
            x: [0, 30, -30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: node.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingNodes;
