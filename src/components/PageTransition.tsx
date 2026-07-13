import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, filter: 'blur(10px)', transition: { duration: 0.3 } },
};

const PageTransition: React.FC<Props> = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex-1"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
