'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import styles from './Logo.module.css';

type Phase = 'hang' | 'up';

const HANGING = '#0a0a0a';
const UPRIGHT = '#0a0a0a'; // black legend on the green tile
const HANG_MS = 1800;

// Each letter pivots on the badge's bottom edge: 180deg leaves it dangling
// upside down beneath the badge, 0/360deg stands it upright inside.
const letterVariants: Variants = {
  hang: {
    rotate: [null, 196, 168, 190, 173, 184, 178, 180],
    color: HANGING,
    transition: { rotate: { duration: 1.6, ease: 'easeInOut' }, color: { duration: 0.2 } },
  },
  up: ({ order, upright }: { order: number; upright: number }) => ({
    rotate: upright,
    color: UPRIGHT,
    transition: {
      rotate: { type: 'spring', stiffness: 210, damping: 11, delay: order * 0.4 },
      color: { duration: 0.25, delay: order * 0.4 + 0.15 },
    },
  }),
};

// Fade the green tile in once the letters land
const fillVariants: Variants = {
  hang: { opacity: 0, transition: { duration: 0.3 } },
  up: { opacity: 1, transition: { duration: 0.35, delay: 0.75 } },
};

// J swings up first (counter-clockwise, out to the right), then A (clockwise, out to the left)
const letters = [
  { char: 'A', order: 1, upright: 360 },
  { char: 'J', order: 0, upright: 0 },
];

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('hang');
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (phase !== 'hang') return;
    const id = setTimeout(() => setPhase('up'), HANG_MS);
    return () => clearTimeout(id);
  }, [phase, cycle]);

  const replay = () => {
    if (reduceMotion || phase !== 'up') return;
    setPhase('hang');
    setCycle((c) => c + 1);
  };

  const current: Phase = reduceMotion ? 'up' : phase;

  return (
    <button
      className={styles.logo}
      data-phase={current}
      onClick={onClick}
      onMouseEnter={replay}
      aria-label="AJ — go to top"
    >
      {/* Green tile; fades in once the letters land */}
      <motion.span
        className={styles.fill}
        variants={fillVariants}
        initial={reduceMotion ? 'up' : 'hang'}
        animate={current}
        aria-hidden
      />
      {letters.map(({ char, order, upright }) => (
        <motion.span
          key={char}
          className={styles.letter}
          custom={{ order, upright }}
          variants={letterVariants}
          initial={reduceMotion ? { rotate: upright, color: UPRIGHT } : { rotate: 180, color: HANGING }}
          animate={current}
          aria-hidden
        >
          {char}
        </motion.span>
      ))}
      {/* Solid black frame that draws itself around the tile */}
      <svg className={styles.frame} aria-hidden>
        <rect width="100%" height="100%" pathLength="100" />
      </svg>
      {/* Blinking text cursor after the J */}
      <span className={styles.cursor} aria-hidden />
    </button>
  );
}
