'use client';

import { motion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedElementProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none' | 'scale';
  duration?: number;
  className?: string;
}

const getVariants = (direction: string, distance: number = 40): Variants => {
  const directions: Record<string, { x?: number; y?: number; scale?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    scale: { scale: 0.92 },
    none: {},
  };

  return {
    hidden: { opacity: 0, filter: 'blur(8px)', ...directions[direction] },
    visible: { opacity: 1, filter: 'blur(0px)', x: 0, y: 0, scale: 1 },
  };
};

export default function AnimatedElement({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.7,
  className,
}: AnimatedElementProps) {
  return (
    <motion.div
      variants={getVariants(direction)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
