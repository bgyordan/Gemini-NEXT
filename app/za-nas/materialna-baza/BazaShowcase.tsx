'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Area = {
  id: string;
  title: string;
  badge: string;
  desc: string;
  features: string[];
  images: string[];
};

const AREAS: Area[] = [
  {
    id: 'kabineti',
    title: 'Учебни кабинети',
    badge: 'Обучение',
    desc: 'Девет светли и спокойни учебни кабинета, адаптирани към индивидуалните нужди на децата — с внимание към сензорния комфорт, достъпността и атмосферата на сигурност.',
    features: ['Ергономично обзавеждане', 'Интерактивни екрани', 'Адаптирани работни места', 'Спокойна цветова среда'],
    images: ['/nachalna/kabineti-1.jpg', '/nachalna/kabineti-2.jpg', '/nachalna/kabineti-3.jpg', '/nachalna/kabineti-4.jpg'],
  },
  {
    id: 'terapevtichni',
    title: 'Терапевтични зали',
    badge: 'Терапия и рехабилитация',
    desc: 'Ерготерапевтична сензорна Снузелен зала, логопедични кабинети и зали за психомоторика — пространства за успокоение, стимулация и развитие на всяко сетиво.',
    features: ['Сензорна Снузелен зала', 'Логопедични кабинети', 'Зала за психомоторика', 'Рехабилитационно оборудване'],
    images: ['/nachalna/terapiya-1.jpg', '/nachalna/terapiya-2.jpg', '/nachalna/terapiya-3.jpg', '/nachalna/terapiya-4.jpg'],
  },
  {
    id: 'gotvarstvo',
    title: 'Кулинарен кабинет',
    badge: 'Умения за живот',
    desc: 'Оборудвана кухня за практически занимания по готварство и сладкарство, където децата развиват самостоятелност и увереност в защитена среда.',
    features: ['Оборудвана учебна кухня', 'Безопасни уреди', 'Практика по готварство', 'Битови умения'],
    images: ['/nachalna/gotvarstvo-1.jpg', '/nachalna/gotvarstvo-2.jpg', '/nachalna/gotvarstvo-3.jpg', '/nachalna/gotvarstvo-4.jpg'],
  },
  {
    id: 'dvor',
    title: 'Училищен двор',
    badge: 'Природа и движение',
    desc: 'Озеленен и обезопасен двор за игри на открито, спорт и градинарство — пространство за движение, отдих и радост под открито небе.',
    features: ['Обезопасена площадка', 'Зелена градина', 'Кътове за игра', 'Пространство за спорт'],
    images: ['/nachalna/dvor-1.jpg', '/nachalna/dvor-2.jpg', '/nachalna/dvor-3.jpg', '/nachalna/dvor-4.jpg'],
  },
];

export default function BazaShowcase() {
  const [active, setActive] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const area = AREAS[active];

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((i) => (i + 1) % area.images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [area.images.length, active]);

  const switchArea = (i: number) => {
    setActive(i);
    setImgIndex(0);
  };

  return (
    <div className="baza-showcase">
      {/* Pill навигация */}
      <div className="bs-tabs">
        {AREAS.map((a, i) => (
          <button key={a.id} className={`bs-tab ${active === i ? 'on' : ''}`} onClick={() => switchArea(i)}>
            {a.title}
          </button>
        ))}
      </div>

      {/* Единна карта — снимка на цял фон, текстът наслоен */}
      <AnimatePresence mode="wait">
        <motion.div
          key={area.id}
          className="bs-hero"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Преливащи снимки на цял фон + Ken Burns */}
          <div className="bs-bg">
            <AnimatePresence mode="sync">
              <motion.img
                key={`${area.id}-${imgIndex}`}
                src={area.images[imgIndex]}
                alt={area.title}
                className="bs-bg-img"
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 1.2, ease: 'easeInOut' }, scale: { duration: 6, ease: 'linear' } }}
              />
            </AnimatePresence>
            <div className="bs-scrim" />
            <div className="bs-glare" />
          </div>

          {/* Наслоен текст */}
          <div className="bs-overlay">
            <motion.span
              className="bs-badge"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              {area.badge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.5 }}
            >
              {area.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {area.desc}
            </motion.p>
            <motion.ul
              className="bs-features"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.5 }}
            >
              {area.features.map((f) => (
                <li key={f}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  {f}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Точки */}
          <div className="bs-dots">
            {area.images.map((_, i) => (
              <button key={i} className={`bs-dot ${imgIndex === i ? 'on' : ''}`} onClick={() => setImgIndex(i)} aria-label={`Снимка ${i + 1}`} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
