'use client';

import { Briefcase, Mail } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import SectionWrapper from '@/components/layout/SectionWrapper';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedElement from '@/components/ui/AnimatedElement';
import Button from '@/components/ui/Button';
import styles from './Contact.module.css';

const socialIcons: Record<string, React.ElementType> = {
  Briefcase,
  Mail,
};

export default function Contact() {
  const { socials, email } = portfolioData.personal;

  return (
    <SectionWrapper id="contact">
      <SectionHeading overline="Contact" title="Got something wild in mind?" />
      <AnimatedElement direction="scale">
        <div className={styles.contactSection}>
          {/* A glowing "snake" that runs laps around the edge of the box */}
          <svg className={styles.snake} aria-hidden>
            <defs>
              <linearGradient id="contactSnake" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4fc3ff" />
                <stop offset="35%" stopColor="#a985ff" />
                <stop offset="70%" stopColor="#ff6fb1" />
                <stop offset="100%" stopColor="#ffb661" />
              </linearGradient>
            </defs>
            <rect className={styles.snakeGlow} width="100%" height="100%" rx="32" pathLength="100" />
            <rect className={styles.snakeLine} width="100%" height="100%" rx="32" pathLength="100" />
          </svg>
          <p className={styles.bigText}>
            Let&apos;s make it <span className="gradient-text">ridiculously good.</span>
          </p>
          <p className={styles.subtitle}>
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <div className={styles.emailButton}>
            <Button
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              magnetic
            >
              <Mail size={18} />
              {email}
            </Button>
          </div>
          <p className={styles.divider}>or find me on</p>
          <div className={styles.socialRow}>
            {socials.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target={social.url.startsWith('mailto') || social.url.startsWith('tel') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className={styles.socialItem}
                >
                  {Icon && <Icon size={18} />}
                  <span>{social.platform}</span>
                </a>
              );
            })}
          </div>
        </div>
      </AnimatedElement>
    </SectionWrapper>
  );
}
