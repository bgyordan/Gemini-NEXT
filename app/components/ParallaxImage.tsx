'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number; // e.g. 15 for 15% travel distance
  scale?: number; // base scale to prevent edge exposure, e.g. 1.15
  aspectRatio?: string;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 12,
  scale = 1.15,
  aspectRatio,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : [`-${speed}%`, `${speed}%`]
  );

  return (
    <div
      ref={containerRef}
      className={`parallax-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        ...(aspectRatio ? { aspectRatio } : {}),
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: `-${speed}% 0`,
          height: `${100 + speed * 2}%`,
          width: '100%',
          y,
        }}
      >
        <motion.img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          initial={{ scale: scale }}
          whileHover={{ scale: scale * 1.05 }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1] }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </motion.div>
    </div>
  );
}
