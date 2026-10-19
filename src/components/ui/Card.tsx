import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return <div className={cn(styles.card, hover && styles.hoverable, className)}>{children}</div>;
}
