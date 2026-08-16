'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface ParallaxElementProps {
  children?: React.ReactNode;
  className?: string;
  speed?: number; // e.g. -20 for moving upward relative to container
  style?: React.CSSProperties;
}

export default function ParallaxElement({
  children,
  className = '',
  speed = -25,
  style,
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-speed, speed]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        y,
      }}
    >
      {children}
    </motion.div>
  );
}
