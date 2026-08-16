'use client';

import { useEffect, useRef, useState } from 'react';

export default function CountUp({
  to,
  suffix = '',
}: {
  to: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          let cur = 0;
          const step = Math.max(1, Math.ceil(to / 44));
          const t = setInterval(() => {
            cur += step;
            if (cur >= to) {
              cur = to;
              clearInterval(t);
            }
            setVal(cur);
          }, 26);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <b ref={ref}>
      {val}
      {suffix}
    </b>
  );
}
