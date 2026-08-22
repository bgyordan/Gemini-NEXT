'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Area = {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  images: string[];
};

const AREAS: Area[] = [
  {
    id: 'kabineti',
    title: 'Учебни кабинети',
    subtitle: 'Светли, спокойни и адаптирани',
    text: 'Девет учебни кабинета, съобразени с индивидуалните нужди на децата — с внимание към сензорния комфорт, достъпността и спокойната атмосфера, в която всяко дете се чувства сигурно.',
    images: ['/nachalna/kabineti-1.jpg', '/nachalna/kabineti-2.jpg', '/nachalna/kabineti-3.jpg', '/nachalna/kabineti-4.jpg'],
  },
  {
    id: 'terapevtichni',
    title: 'Терапевтични зали',
    subtitle: 'Мултисензорна стимулация и рехабилитация',
    text: 'Ерготерапевтична сензорна Снузелен зала, логопедични кабинети и зали за психомоторика. Пространства за успокоение, стимулация и развитие на всяко сетиво.',
    images: ['/nachalna/terapiya-1.jpg', '/nachalna/terapiya-2.jpg', '/nachalna/terapiya-3.jpg', '/nachalna/terapiya-4.jpg'],
  },
  {
    id: 'gotvarstvo',
    title: 'Кулинарен кабинет',
    subtitle: 'Практика, самостоятелност и битови умения',
    text: 'Оборудвана кухня за практически занимания по готварство и сладкарство, където децата развиват самостоятелност и увереност в защитена среда.',
    images: ['/nachalna/gotvarstvo-1.jpg', '/nachalna/gotvarstvo-2.jpg', '/nachalna/gotvarstvo-3.jpg', '/nachalna/gotvarstvo-4.jpg'],
  },
  {
    id: 'dvor',
    title: 'Училищен двор',
    subtitle: 'Движение, игри и досег с природата',
    text: 'Озеленен и обезопасен двор за игри на открито, спорт и градинарство — пространство за движение, отдих и радост под открито небе.',
    images: ['/nachalna/dvor-1.jpg', '/nachalna/dvor-2.jpg', '/nachalna/dvor-3.jpg', '/nachalna/dvor-4.jpg'],
  },
];

export default function BazaShowcase() {
  const [active, setActive] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);

  const area = AREAS[active];

  // Автоматично преливане на снимките на всеки 3.5 сек
  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((i) => (i + 1) % area.images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [area.images.length]);

  const switchArea = (i: number) => {
    setActive(i);
    setImgIndex(0);
  };

  return (
    <div className="baza-showcase">
      {/* Табове за помещенията */}
      <div className="bs-tabs">
        {AREAS.map((a, i) => (
          <button key={a.id} className={`bs-tab ${active === i ? 'on' : ''}`} onClick={() => switchArea(i)}>
            {a.title}
          </button>
        ))}
      </div>

      <div className="bs-stage">
        {/* Снимка с преливане */}
        <div className="bs-media">
          <AnimatePresence mode="wait">
            <motion.img
              key={`${area.id}-${imgIndex}`}
              src={area.images[imgIndex]}
              alt={area.title}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            />
          </AnimatePresence>

          {/* Точки — коя снимка */}
          <div className="bs-dots">
            {area.images.map((_, i) => (
              <button
                key={i}
                className={`bs-dot ${imgIndex === i ? 'on' : ''}`}
                onClick={() => setImgIndex(i)}
                aria-label={`Снимка ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Текст с преливане */}
        <AnimatePresence mode="wait">
          <motion.div
            key={area.id}
            className="bs-text"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <span className="bs-sub">{area.subtitle}</span>
            <h2>{area.title}</h2>
            <p>{area.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
