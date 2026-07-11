import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Animate progress from 0 → 100 over ~2.2s with eased steps
    const totalDuration = 2200; // ms
    const intervalMs = 18;
    const totalSteps = totalDuration / intervalMs;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out curve: fast start, slower near 100
      const raw = step / totalSteps;
      const eased = 1 - Math.pow(1 - raw, 2.5);
      const next = Math.min(Math.round(eased * 100), 100);
      setProgress(next);

      if (step >= totalSteps) {
        clearInterval(timer);
        // Hold at 100% briefly, then exit
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 800); // wait for exit anim
        }, 400);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#0C0C0C',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Subtle radial glow in background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(215,226,234,0.04) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Name / Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(2rem, 6vw, 5rem)',
              fontWeight: 900,
              color: '#D7E2EA',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: '0.3em',
              lineHeight: 1,
            }}
          >
            Shivansh
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontSize: 'clamp(0.65rem, 1.2vw, 0.9rem)',
              color: '#D7E2EA',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              marginBottom: 'clamp(3rem, 8vw, 5rem)',
            }}
          >
            Data Analyst &amp; Developer
          </motion.div>

          {/* Progress bar track */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              width: 'clamp(220px, 35vw, 480px)',
              height: '1px',
              background: 'rgba(215,226,234,0.12)',
              borderRadius: '999px',
              overflow: 'visible',
              position: 'relative',
            }}
          >
            {/* Filled portion */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${progress}%`,
                background:
                  'linear-gradient(90deg, rgba(215,226,234,0.3) 0%, #D7E2EA 100%)',
                borderRadius: '999px',
                transition: 'width 0.05s linear',
                boxShadow: '0 0 8px 1px rgba(215,226,234,0.35)',
              }}
            />

            {/* Glowing dot at the tip */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: `${progress}%`,
                transform: 'translate(-50%, -50%)',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#D7E2EA',
                boxShadow: '0 0 10px 3px rgba(215,226,234,0.7)',
                transition: 'left 0.05s linear',
              }}
            />
          </motion.div>

          {/* Percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            style={{
              marginTop: '1.4rem',
              fontFamily: "'Kanit', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
              color: '#D7E2EA',
              letterSpacing: '0.15em',
              opacity: 0.5,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {String(progress).padStart(3, '0')}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
