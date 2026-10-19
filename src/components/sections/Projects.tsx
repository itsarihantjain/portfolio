'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import type { Project } from '@/types/portfolio';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import styles from './Projects.module.css';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const card = (
    <Card className={styles.projectCard}>
      <div className={styles.projectImage}>
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 85vw, 460px"
            className={styles.image}
            style={{ objectPosition: project.imagePosition ?? 'top center' }}
          />
        ) : (
          <span className={styles.projectImageInner}>
            {project.title.split(' ').map((w) => w[0]).join('')}
          </span>
        )}
        <div className={styles.imageOverlay} />
        {project.brand && <span className={styles.brandChip}>{project.brand}</span>}
        <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className={styles.projectBody}>
        <h3 className={styles.projectTitle}>
          {project.title}
          <ArrowUpRight size={22} className={styles.titleArrow} />
        </h3>
        <p className={styles.projectDescription}>{project.description}</p>
        <div className={styles.techStack}>
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="accent">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );

  // The whole card is the link, opening the live product in a new tab
  if (!project.liveUrl) return card;
  return (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.cardLink}
      aria-label={`${project.title} — opens in a new tab`}
    >
      {card}
    </a>
  );
}

// Pinned horizontal gallery: the section is as tall as the track is wide, and
// vertical scroll inside it slides the track sideways.
export default function Projects() {
  const { projects } = portfolioData;
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [viewportH, setViewportH] = useState(0);
  const [active, setActive] = useState(1);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
      setViewportH(window.innerHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.0005 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(projects.length, Math.floor(v * projects.length) + 1));
  });

  const pinned = !reduceMotion && distance > 0;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={styles.section}
      style={pinned ? { height: distance + viewportH } : undefined}
    >
      <div className={cn(styles.sticky, !pinned && styles.unpinned)}>
        <div className={styles.header}>
          <div>
            <p className={styles.overline}>Selected work</p>
            <h2 className={styles.title}>Things I&apos;ve built.</h2>
          </div>
          <div className={styles.counter} aria-hidden>
            <span className={styles.counterNow}>{String(active).padStart(2, '0')}</span>
            <span className={styles.counterTotal}>/ {String(projects.length).padStart(2, '0')}</span>
          </div>
        </div>

        <div className={styles.progress} aria-hidden>
          <motion.div className={styles.progressFill} style={{ scaleX: smooth }} />
        </div>

        <motion.div
          ref={trackRef}
          className={cn(styles.track, !pinned && styles.nativeScroll)}
          style={pinned ? { x } : undefined}
        >
          {projects.map((project, index) => (
            <div key={project.title} className={styles.cell}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
          <div className={styles.cell}>
            <div className={styles.endCard}>
              <Sparkles size={36} />
              <p className={styles.endTitle}>More cooking in the lab.</p>
              <a href="#contact" className={styles.endLink} data-cursor="grow">
                Let&apos;s build yours <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
