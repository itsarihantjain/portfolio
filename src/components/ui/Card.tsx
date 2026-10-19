'use client';

import { ReactNode, PointerEvent } from 'react';
import { cn } from '@/lib/utils';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

// Tracks the pointer so the CSS spotlight/border glow follows it
function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(styles.card, hover && styles.hoverable, className)}
      onPointerMove={hover ? handlePointerMove : undefined}
    >
      {children}
    </div>
  );
}
