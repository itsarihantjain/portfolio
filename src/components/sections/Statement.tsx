'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import styles from './Statement.module.css';

const statement =
  'I turn ideas into fast, delightful products — quick commerce, fintech wallets, jewellery stores and EV charging — with React, React Native, Next.js and Node.js.';

// Words that get the spectrum treatment once they light up
const highlights = new Set(['fast,', 'delightful', 'React,', 'Native,', 'Next.js', 'Node.js.']);

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span
      className={highlights.has(word) ? `${styles.word} ${styles.highlight}` : styles.word}
      style={{ opacity, y }}
    >
      {word}
    </motion.span>
  );
}

// Apple product-page style: a sticky paragraph that lights up word by word as you scroll
export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const words = statement.split(' ');

  return (
    <section id="statement" ref={ref} className={styles.track}>
      <div className={styles.sticky}>
        <p className={styles.eyebrow}>What I do</p>
        <p className={styles.text}>
          {words.map((word, i) => {
            const start = (i / words.length) * 0.85;
            const end = start + 0.85 / words.length;
            return (
              <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
            );
          })}
        </p>
      </div>
    </section>
  );
}
