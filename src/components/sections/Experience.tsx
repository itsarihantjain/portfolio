'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import SectionWrapper from '@/components/layout/SectionWrapper';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedElement from '@/components/ui/AnimatedElement';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import styles from './Experience.module.css';

export default function Experience() {
  const { experience } = portfolioData;
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 60%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <SectionWrapper id="experience">
      <SectionHeading overline="Experience" title="Where I've worked." />
      <div className={styles.timeline} ref={timelineRef}>
        <div className={styles.timelineLine} />
        <motion.div className={styles.timelineProgress} style={{ scaleY }} />
        {experience.map((exp, index) => (
          <AnimatedElement key={exp.company} delay={index * 0.08} direction="left">
            <div className={styles.entry}>
              <motion.div
                className={cn(styles.dot, exp.endDate === 'Present' && styles.dotActive)}
                // Inherits hidden/visible from AnimatedElement; a scale(0) node can't be observed itself
                variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
              />
              <Card className={styles.entryCard}>
                <div className={styles.header}>
                  <div>
                    <div className={styles.companyRow}>
                      {exp.companyUrl ? (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.company}
                        >
                          {exp.company}
                        </a>
                      ) : (
                        <span className={styles.company}>{exp.company}</span>
                      )}
                      {exp.endDate === 'Present' && <span className={styles.currentTag}>Current</span>}
                    </div>
                    <p className={styles.role}>{exp.role}</p>
                  </div>
                  <p className={styles.dateRange}>
                    {exp.startDate} — {exp.endDate}
                  </p>
                </div>
                <p className={styles.description}>{exp.description}</p>
                <ul className={styles.highlights}>
                  {exp.highlights.map((highlight, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.06 }}
                    >
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </SectionWrapper>
  );
}
