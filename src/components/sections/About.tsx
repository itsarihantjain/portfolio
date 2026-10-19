'use client';

import { motion } from 'framer-motion';
import { MapPin, Sparkles, Smartphone, Zap } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import SectionWrapper from '@/components/layout/SectionWrapper';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedElement from '@/components/ui/AnimatedElement';
import Card from '@/components/ui/Card';
import CountUp from '@/components/ui/CountUp';
import { cn } from '@/lib/utils';
import styles from './About.module.css';

export default function About() {
  const { bio, location } = portfolioData.personal;
  const current = portfolioData.experience[0];

  return (
    <SectionWrapper id="about">
      <SectionHeading overline="About me" title="Pixels, performance & a little bit of play." />

      <div className={styles.bento}>
        <AnimatedElement className={cn(styles.cell, styles.intro)} direction="scale">
          <Card className={styles.card}>
            <Sparkles className={styles.introIcon} size={28} />
            <h3 className={styles.introTitle}>
              Frontend-heavy. <span className="gradient-text">Full stack capable.</span>
            </h3>
            {bio.map((p, i) => (
              <p key={i} className={styles.introText}>
                {p}
              </p>
            ))}
          </Card>
        </AnimatedElement>

        <AnimatedElement className={cn(styles.cell, styles.years)} direction="scale" delay={0.1}>
          <Card className={cn(styles.card, styles.gradientCard)}>
            <span className={styles.bigNumber}>
              <CountUp value="5+" />
            </span>
            <span className={styles.statLabel}>years shipping to production</span>
          </Card>
        </AnimatedElement>

        <AnimatedElement className={cn(styles.cell, styles.crash)} direction="scale" delay={0.15}>
          <Card className={styles.card}>
            <Zap className={styles.statIcon} size={22} />
            <span className={cn(styles.bigNumber, 'gradient-text')}>
              <CountUp value="99%" />
            </span>
            <span className={styles.statLabel}>fewer app crashes at BluSmart</span>
          </Card>
        </AnimatedElement>

        <AnimatedElement className={cn(styles.cell, styles.products)} direction="scale" delay={0.2}>
          <Card className={styles.card}>
            <Smartphone className={styles.statIcon} size={22} />
            <span className={styles.midNumber}>
              <CountUp value="6+" />
            </span>
            <span className={styles.statLabel}>products shipped</span>
          </Card>
        </AnimatedElement>

        <AnimatedElement className={cn(styles.cell, styles.companies)} direction="scale" delay={0.25}>
          <Card className={styles.card}>
            <span className={styles.midNumber}>
              <CountUp value="4" />
            </span>
            <span className={styles.statLabel}>companies, one role: problem solver</span>
          </Card>
        </AnimatedElement>

        <AnimatedElement className={cn(styles.cell, styles.now)} direction="scale" delay={0.3}>
          <Card className={cn(styles.card, styles.nowCard)}>
            <span className={styles.nowLabel}>
              <span className={styles.liveDot} /> Right now
            </span>
            <span className={styles.nowRole}>{current.role}</span>
            <span className={styles.nowCompany}>@ {current.company}</span>
            <span className={styles.location}>
              <MapPin size={14} /> {location}
            </span>
            <motion.span
              className={styles.spinner}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              aria-hidden
            >
              ✦
            </motion.span>
          </Card>
        </AnimatedElement>
      </div>
    </SectionWrapper>
  );
}
