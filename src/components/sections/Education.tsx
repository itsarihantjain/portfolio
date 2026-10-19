'use client';

import { GraduationCap } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import SectionWrapper from '@/components/layout/SectionWrapper';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedElement from '@/components/ui/AnimatedElement';
import Card from '@/components/ui/Card';
import styles from './Education.module.css';

export default function Education() {
  const { education } = portfolioData;

  return (
    <SectionWrapper id="education">
      <SectionHeading overline="Education" title="Where I studied." />
      {education.map((edu, index) => (
        <AnimatedElement key={edu.institution} delay={index * 0.15} direction="scale">
          <Card className={styles.educationCard}>
            <div className={styles.icon}>
              <GraduationCap size={24} />
            </div>
            <h3 className={styles.institution}>{edu.institution}</h3>
            <p className={styles.degree}>{edu.degree}</p>
            <p className={styles.dateRange}>
              {edu.startDate} — {edu.endDate}
            </p>
          </Card>
        </AnimatedElement>
      ))}
    </SectionWrapper>
  );
}
