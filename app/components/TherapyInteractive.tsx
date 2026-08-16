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
    id: 'eye-tracking',
    category: 'Асистивни технологии',
    title: 'Контрол с поглед (Tobii Eye-Tracking & AAC)',
    badge: 'Иновация',
    desc: 'Революционна технология за невербални деца от аутистичния спектър и деца с ДЦП за свободна комуникация и обучение чрез движение на погледа.',
    fullDetails:
      'ЦСОП – Варна въведе специализирани устройства за контрол с поглед Tobii Dynavox и софтуера Communicator 5. Децата управляват компютърен екран единствено с очите си, изразяват нужди, чувства, избират символи, участват в интерактивни образователни игри и развиват речева активност.',
    equipment: ['Tobii Eye-Tracker устройства', 'Софтуер Communicator 5', 'Интерактивни сензорни екрани', 'Символни AAC комуникатори'],
    skills: ['Изразяване на желания и емоции', 'Когнитивно развитие', 'Внимание и зрителна фиксация', 'Самостоятелност'],
    image: '/images/art_therapy.jpg',
    icon: 'eye',
  },
  {
    id: 'sensory',
    category: 'Сензорна интеграция',
    title: 'Мултисензорна среда и Снуузелен зала',
    badge: 'Специализирана среда',
    desc: 'Защитено пространство с мека светлина, фиброоптика, светлинни водни колони и тактилни повърхности за сетивно успокоение и баланс.',
    fullDetails:
      'Сензорната зала в ЦСОП – Варна предлага многостепенна стимулация на сетивата (зрение, слух, допир, вестибуларен апарат). Чрез прецизно регулиране на светлинни, звукови и тактилни стимули се постига намаляване на тревожността, подобряване на фокуса и саморегулация на поведението.',
    equipment: ['Светлинни водни кули с мехурчета', 'Фиброоптични снопове', 'Сух басейн с топки', 'Тактилни релефни панели', 'Арома-дифузери'],
    skills: ['Сетивна преработка', 'Емоционално успокоение', 'Пространствена ориентация', 'Преодоляване на свръхстимулация'],
    image: '/images/sensory.jpg',
    icon: 'sparkles',
  },
  {
    id: 'kinesitherapy',
    category: 'Двигателна рехабилитация',
    title: 'Кинезитерапия и Релационна психомоторика',
    badge: 'Здраве и моторика',
    desc: 'Индивидуални рехабилитационни програми за развитие на мускулния тонус, координацията, баланса и двигателната увереност.',
    fullDetails:
      'Екипът от кинезитерапевти и рехабилитатори провежда специализирани занимания за деца с ДЦП, мускулна хипотония и двигателни дефицити. Включва лечебна физкултура, упражнения за равновесие, механотерапия и релационна психомоторика, насочена към преодоляване на страхове и социално общуване.',
    equipment: ['Балансиращи платформи и топки Bobath', 'Шведски стени и наклонени плоскости', 'Вертикализатори и проходилки', 'Сензорни пътеки'],
    skills: ['Мускулна сила и тонус', 'Координация и баланс', 'Груба моторика', 'Преодоляване на физически бариери'],
    image: '/images/garden.jpg',
    icon: 'activity',
  },
  {
    id: 'speech-therapy',
    category: 'Логопедия',
    title: 'Логопедична корекция и развитие на комуникацията',
    badge: 'Реч и общуване',
    desc: 'Диагностика и терапия на езиково-говорни нарушения, артикулационна гимнастика, развиване на фонематичен слух и алтернативна реч.',
    fullDetails:
      'Четирима висококвалифицирани логопеди работят ежедневно с децата по индивидуални програми. Използват се огледални кабинети, артикулационни сонди, компютърни логопедични програми, пиктограмни системи PECS и дигитални говорни карти за изграждане на богат речников запас.',
    equipment: ['Интерактивни логопедични огледала', 'PECS символни карти', 'Артикулационни тренажори', 'Дигитални речеви игри'],
    skills: ['Правилна артикулация', 'Фонематичен слух', 'Езиково разбиране', 'Невербален и вербален диалог'],
    image: '/images/classroom.jpg',
    icon: 'message',
  },
  {
    id: 'culinary',
    category: 'Професионално обучение',
    title: 'Кулинарна работилница и Готварство',
    badge: 'Умения за живот',
    desc: 'Модерен учебен кухненски кабинет за практическо обучение по ресторантьорство, кетъринг, сладкарство и самостоятелно приготвяне на храна.',
    fullDetails:
      'Откритият специален готварски кабинет в ЦСОП – Варна дава възможност на учениците от прогимназиален и гимназиален етап да усвоят реални готварски техники, стандарти за хигиена, сервиране, приготвяне на тестени и сладкарски изделия и подготовка за професионална реализация като помощник-готвачи.',
    equipment: ['Професионални конвектомати и фурни', 'Индукционни плотове', 'Уреди за месене и разбиване', 'Работни маси от инокс'],
    skills: ['Кулинарни техники и рецепти', 'Безопасност и хигиена в кухнята', 'Самостоятелно хранене и бит', 'Професионални навици'],
    image: '/images/kitchen.jpg',
    icon: 'utensils',
  },
  {
    id: 'art-nature',
    category: 'Творчество и природа',
    title: 'Арт терапия, Керамика и Зелена градина',
    badge: 'Творческо изразяване',
    desc: 'Керамично ателие за работа с глина, приложни занаяти и практическо градинарство в просторния озеленен училищен двор.',
    fullDetails:
      'Арт терапията стимулира фината моторика, тактилното усещане и естетическото възприятие. Работата с естествена глина, бои и текстил позволява на всяко дете да изрази своя вътрешен свят. В зеления двор учениците засаждат цветя и билки, учейки се на грижа и търпение.',
    equipment: ['Грънчарски колела и инструменти', 'Пещ за изпичане на керамика', 'Градински парници и лехи', 'Текстилни и приложни материали'],
    skills: ['Фина моторика и сръчност', 'Емоционално самоизразяване', 'Грижа за живата природа', 'Творческо мислене'],
    image: '/images/art_therapy.jpg',
    icon: 'palette',
  },
];

export default function TherapyInteractive() {
  const [activeId, setActiveId] = useState<string>(THERAPIES[0].id);
  const current = THERAPIES.find((t) => t.id === activeId) || THERAPIES[0];

  return (
    <section className="therapy-sec" style={{ padding: '80px 0', background: 'var(--sand-2)' }}>
      <div className="wrap">
        <Reveal className="sec-head center" style={{ maxWidth: '760px', margin: '0 auto 48px', textAlign: 'center' }}>
          <span className="kicker">Специализирана експертиза</span>
          <h2 style={{ fontSize: '34px', margin: '8px 0 16px' }}>
            Иновативни терапии и подходи за развитие
          </h2>
          <p style={{ color: 'var(--ink-2)', fontSize: '16.5px', lineHeight: '1.6' }}>
            В ЦСОП – Варна съчетаваме съвременни асистивни технологии с десетилетен педагогически опит, за да дадем на всяко дете инструмент за общуване и пълноценен живот.
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
                style={{
                  padding: '10px 18px',
                  borderRadius: '999px',
                  border: isActive ? '1.5px solid var(--green-deep)' : '1px solid var(--line)',
                  background: isActive ? 'var(--green-deep)' : 'var(--card-bg)',
                  color: isActive ? '#fff' : 'var(--ink)',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 4px 14px rgba(34, 84, 61, 0.25)' : 'var(--shadow-sm)',
                  transition: 'all .25s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
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
