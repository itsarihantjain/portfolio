'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CursorBlob.module.css';

// A blend-mode blob that trails the pointer and swells over anything clickable.
// Before the visitor moves the mouse it rests under the element marked [data-cursor-home].
export default function CursorBlob() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;

    let moved = false;
    let frame = 0;

    // Follow the home letter (it animates in and moves with scroll) until the mouse takes over
    const park = () => {
      const home = document.querySelector('[data-cursor-home]');
      if (home) {
        const r = home.getBoundingClientRect();
        x.set(r.left + r.width / 2);
        y.set(r.bottom + 14);
        setVisible(r.bottom > 0 && r.top < window.innerHeight);
      }
      if (!moved) frame = requestAnimationFrame(park);
    };
    frame = requestAnimationFrame(park);

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      moved = true;
      cancelAnimationFrame(frame);
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setHovering(!!target?.closest('a, button, [role="button"], [data-cursor="grow"]'));
    };
    const handleLeave = () => setVisible(false);
    window.addEventListener('pointermove', handleMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handleLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handleMove);
      document.documentElement.removeEventListener('pointerleave', handleLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      className={styles.blob}
      style={{ x: springX, y: springY }}
      animate={{ scale: hovering ? 2.6 : 1, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      aria-hidden
    />
  );
}
