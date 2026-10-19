import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className,
  noPadding = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn('container', !noPadding && 'section-padding', className)}
    >
      {children}
    </section>
  );
}
