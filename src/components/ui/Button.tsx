'use client';

import { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes, PointerEvent } from 'react';
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

type ButtonBaseProps = {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Pulls the button toward the pointer a little, like it's magnetised */
  magnetic?: boolean;
};

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

function pull(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);
  el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
}

function release(e: PointerEvent<HTMLElement>) {
  e.currentTarget.style.transform = '';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  magnetic = false,
  ...props
}: ButtonProps) {
  const classes = cn(styles.button, styles[variant], styles[size], magnetic && styles.magnetic, className);
  const magnetProps = magnetic ? { onPointerMove: pull, onPointerLeave: release } : {};

  if ('href' in props && props.href) {
    return (
      <a className={classes} {...magnetProps} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        <span className={styles.label}>{children}</span>
      </a>
    );
  }

  return (
    <button className={classes} {...magnetProps} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      <span className={styles.label}>{children}</span>
    </button>
  );
}
