'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Reveal from './Reveal';

interface TherapyItem {
  id: string;
  category: string;
  title: string;
  badge: string;
  desc: string;
  fullDetails: string;
  equipment: string[];
  skills: string[];
  image: string;
  icon: string;
}

const THERAPIES: TherapyItem[] = [
  {
    id: 'kabineti',
    category: 'Учебна среда',
    title: 'Учебни кабинети',
    badge: 'Обучение',
    desc: 'Светли и спокойни учебни кабинети, адаптирани към индивидуалните нужди на всяко дете — с внимание към сензорния комфорт и достъпността.',
    fullDetails:
      'Учебните кабинети в ЦСОП – Варна са обзаведени с мисъл за спокойствието и концентрацията на децата. Всяко пространство е съобразено с индивидуалните образователни потребности, с ергономично обзавеждане и подходяща цветова среда, която създава усещане за сигурност.',
    equipment: ['Ергономично обзавеждане', 'Интерактивни екрани', 'Адаптирани работни места', 'Дидактически материали'],
    skills: ['Индивидуален подход', 'Спокойна учебна среда', 'Достъпност', 'Концентрация и фокус'],
    image: '/nachalna/kabineti-1.jpg',
    icon: 'sparkles',
  },
  {
    id: 'terapevtichni',
    category: 'Терапия и рехабилитация',
    title: 'Терапевтични зали',
    badge: 'Специализирана среда',
    desc: 'Ерготерапевтична сензорна зала, логопедични кабинети и зали за психомоторика — пространства за успокоение, стимулация и развитие на всяко сетиво.',
    fullDetails:
      'Терапевтичните зали предлагат специализирана среда за сензорна интеграция, логопедична работа и психомоторика. Пространствата са създадени да подкрепят емоционалното успокоение, сетивната преработка и цялостното развитие на децата чрез професионално подбрано оборудване.',
    equipment: ['Сензорна Снузелен зала', 'Логопедични кабинети', 'Зала за психомоторика', 'Рехабилитационно оборудване'],
    skills: ['Сетивна преработка', 'Емоционално успокоение', 'Речево развитие', 'Двигателна координация'],
    image: '/nachalna/terapiya-1.jpg',
    icon: 'sparkles',
  },
  {
    id: 'gotvarstvo',
    category: 'Умения за живот',
    title: 'Кулинарен кабинет',
    badge: 'Практика',
    desc: 'Оборудвана кухня за практически занимания по готварство и сладкарство, където децата развиват самостоятелност и увереност в защитена среда.',
    fullDetails:
      'В кулинарния кабинет децата усвояват битови и практически умения чрез приготвяне на храна в безопасна и подкрепяща среда. Заниманията изграждат самостоятелност, увереност и чувство за принадлежност, като едновременно развиват фината моторика и последователното мислене.',
    equipment: ['Оборудвана учебна кухня', 'Безопасни уреди', 'Работни станции', 'Материали за готварство'],
    skills: ['Самостоятелност', 'Битови умения', 'Фина моторика', 'Работа в екип'],
    image: '/nachalna/gotvarstvo-1.jpg',
    icon: 'sparkles',
  },
  {
    id: 'stem',
    category: 'Наука и технологии',
    title: 'СТЕМ център',
    badge: 'Иновации',
    desc: 'Модерен СТЕМ център за наука, технологии, инженерство и математика — среда, която събужда любопитството и стимулира изследователския дух на децата.',
    fullDetails:
      'Новоизграденият СТЕМ център предлага съвременна среда за практическо и интерактивно учене чрез наука, технологии, инженерство и математика. Пространството насърчава експериментирането, творческото мислене и работата в екип, като адаптира дейностите към възможностите на всяко дете.',
    equipment: ['Интерактивно оборудване', 'Работни станции', 'Образователни технологии', 'Материали за експерименти'],
    skills: ['Изследователски дух', 'Логическо мислене', 'Работа в екип', 'Практически умения'],
    image: '/nachalna/stem-1.jpg',
    icon: 'sparkles',
  },
];

export default function TherapyInteractive() {
  const [activeId, setActiveId] = useState<string>(THERAPIES[0].id);
  const current = THERAPIES.find((t) => t.id === activeId) || THERAPIES[0];

  return (
    <section className="therapy-sec" style={{ padding: '80px 0', background: 'var(--sand-2)' }}>
      <div className="wrap-wide">
        <Reveal className="sec-head center" style={{ maxWidth: '760px', margin: '0 auto 48px', textAlign: 'center' }}>
          <span className="kicker">Материална база</span>
          <h2 style={{ fontSize: '34px', margin: '8px 0 16px' }}>
            Специализирана среда, създадена с грижа
          </h2>
          <p style={{ color: 'var(--ink-2)', fontSize: '16.5px', lineHeight: '1.6' }}>
            На ул. „Петко Стайнов“ №7 всяко пространство е обмислено за развитието, комфорта и безопасността на децата — от учебните кабинети до озеленения двор.
          </p>
        </Reveal>

        {/* PILL NAVIGATION */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center',
            marginBottom: '36px',
          }}
        >
          {THERAPIES.map((t) => {
            const isActive = t.id === activeId;
            return (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={`baza-tab ${isActive ? 'on' : ''}`}
              >
                <span className="baza-tab-dot" />
                <span>{t.title.split('(')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* ACTIVE CARD SHOWCASE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              background: 'var(--card-bg)',
              borderRadius: '28px',
              border: '1px solid var(--line)',
              boxShadow: 'var(--shadow)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            }}
          >
            {/* CONTENT SIDE */}
            <div style={{ padding: '40px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span
                    style={{
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontWeight: 700,
                      color: 'var(--clay-deep)',
                      background: 'var(--clay-soft)',
                      padding: '4px 12px',
                      borderRadius: '999px',
                    }}
                  >
                    {current.category}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--green-deep)',
                      background: 'var(--green-soft)',
                      padding: '4px 12px',
                      borderRadius: '999px',
                    }}
                  >
                    {current.badge}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '26px', color: 'var(--ink)', margin: '0 0 14px' }}>
                  {current.title}
                </h3>

                <p style={{ fontSize: '15.5px', color: 'var(--ink-2)', lineHeight: '1.7', marginBottom: '24px' }}>
                  {current.fullDetails}
                </p>

                {/* HIGHLIGHTED GRIDS */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div style={{ background: 'var(--sand-2)', padding: '16px 18px', borderRadius: '16px' }}>
                    <b style={{ display: 'block', fontSize: '12.5px', textTransform: 'uppercase', color: 'var(--green-deep)', marginBottom: '8px', letterSpacing: '0.04em' }}>
                      Оборудване и ресурси:
                    </b>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: 'var(--ink-2)', lineHeight: '1.6' }}>
                      {current.equipment.map((eq, i) => (
                        <li key={i}>{eq}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ background: 'var(--sand-2)', padding: '16px 18px', borderRadius: '16px' }}>
                    <b style={{ display: 'block', fontSize: '12.5px', textTransform: 'uppercase', color: 'var(--clay-deep)', marginBottom: '8px', letterSpacing: '0.04em' }}>
                      Ключови умения:
                    </b>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: 'var(--ink-2)', lineHeight: '1.6' }}>
                      {current.skills.map((sk, i) => (
                        <li key={i}>{sk}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <span style={{ fontSize: '13px', color: 'var(--ink-3)' }}>
                  Провежда се в индивидуални и малки групови сесии в ЦСОП – Варна
                </span>
                <a
                  href="/priem"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    color: 'var(--green-deep)',
                  }}
                >
                  Запишете консултация
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ width: '15px', height: '15px' }}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* VISUAL MEDIA SIDE */}
            <div style={{ position: 'relative', minHeight: '340px', background: 'var(--sand-3)', overflow: 'hidden' }}>
              <img
                src={current.image}
                alt={current.title}
                referrerPolicy="no-referrer"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(16, 28, 22, 0.7) 0%, rgba(16, 28, 22, 0.1) 60%, transparent 100%)',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  color: '#fff',
                }}
              >
                <div>
                  <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D3EBDD', fontWeight: 600 }}>
                    МАТЕРИАЛНА БАЗА · ЦСОП ВАРНА
                  </span>
                  <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'rgba(255,255,255,0.92)' }}>
                    Специализиран кабинет на ул. „Петко Стайнов“ №7
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
