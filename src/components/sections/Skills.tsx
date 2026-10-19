'use client';

import { motion } from 'framer-motion';
import { Code2, Server, Wrench } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import SectionWrapper from '@/components/layout/SectionWrapper';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedElement from '@/components/ui/AnimatedElement';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import styles from './Skills.module.css';

const categoryIcons: Record<string, React.ElementType> = {
  Frontend: Code2,
  Backend: Server,
  'Tools & Design': Wrench,
};

export default function Skills() {
  const { skills } = portfolioData;

  // Group skills by category
  const categories = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill.name);
      return acc;
    },
    {} as Record<string, string[]>
  );

  const marquee = skills.map((s) => s.name);

  return (
    <SectionWrapper id="skills">
      <SectionHeading
        overline="Skills"
        title="My toolbox."
        subtitle="The stack I reach for to take things from Figma to production."
      />

      {/* Two crossing "caution tape" marquees running in opposite directions */}
      <div className={styles.tapes} aria-hidden>
        <div className={cn(styles.tape, styles.tapeA)}>
          <div className={styles.tapeTrack}>
            {[...marquee, ...marquee].map((name, i) => (
              <span key={i} className={styles.tapeItem}>
                {name}
                <span className={styles.tapeStar}>✺</span>
              </span>
            ))}
          </div>
        </div>
        <div className={cn(styles.tape, styles.tapeB)}>
          <div className={cn(styles.tapeTrack, styles.reverse)}>
            {[...marquee, ...marquee].map((name, i) => (
              <span key={i} className={styles.tapeItem}>
                {name}
                <span className={styles.tapeStar}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.categoriesGrid}>
        {Object.entries(categories).map(([category, skillNames], catIndex) => {
          const Icon = categoryIcons[category];
          return (
            <AnimatedElement key={category} delay={catIndex * 0.15} className={styles.cell}>
              <Card className={styles.categoryCard}>
                <h3 className={styles.categoryTitle}>
                  <span className={styles.categoryIcon}>{Icon && <Icon size={18} />}</span>
                  {category}
                </h3>
                <div className={styles.skillsList}>
                  {skillNames.map((name, i) => (
                    <motion.span
                      key={name}
                      initial={{ opacity: 0, y: 12, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + catIndex * 0.1 + i * 0.05 }}
                    >
                      <Badge>{name}</Badge>
                    </motion.span>
                  ))}
                </div>
              </Card>
            </AnimatedElement>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
