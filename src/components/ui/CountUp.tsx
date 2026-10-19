'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

interface CountUpProps {
  value: string; // e.g. "5+", "99%", "4"
  duration?: number;
}

// Animates the numeric part of a stat while keeping its suffix
export default function CountUp({ value, duration = 1.8 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const target = parseFloat(value);
  const suffix = value.replace(/^[\d.]+/, '');

  useEffect(() => {
    if (!inView || !ref.current || Number.isNaN(target)) return;
    const node = ref.current;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, target, suffix, duration]);

  return <span ref={ref}>{Number.isNaN(target) ? value : `0${suffix}`}</span>;
}
