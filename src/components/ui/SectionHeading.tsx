'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import AnimatedElement from './AnimatedElement';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  overline: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ overline, title, subtitle }: SectionHeadingProps) {
  const words = title.split(' ');

  return (
    <div className={styles.wrapper}>
      <AnimatedElement direction="none">
        <p className={styles.overline}>
          <span className={styles.overlineDot} />
          {overline}
        </p>
      </AnimatedElement>
      {/* Observe the heading itself: the clipped words never intersect on their own */}
      <motion.h2
        className={styles.title}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className={styles.wordMask}>
              <motion.span
                className={styles.word}
                variants={{ hidden: { y: '110%' }, visible: { y: '0%' } }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </motion.h2>
      <motion.div
        className={styles.decorativeLine}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      {subtitle && (
        <AnimatedElement delay={0.35}>
          <p className={styles.subtitle}>{subtitle}</p>
        </AnimatedElement>
      )}
    </div>
  );
}
