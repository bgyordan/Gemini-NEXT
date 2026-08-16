'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Reveal from './Reveal';

interface Program {
  title: string;
  field: string;
  degree: string;
  target: string;
  desc: string;
  curriculum: string[];
  practice: string;
  future: string;
  icon: string;
}

const PROGRAMS: Program[] = [
  {
    title: 'Помощник в кулинарното производство и ресторантьорство',
    field: 'Професионално направление „Хранителни технологии и ресторантьорство“',
    degree: 'I-ва степен на професионална квалификация',
    target: 'Ученици в гимназиален етап (VIII – XII клас)',
    desc: 'Обучението се провежда в новооборудвания специализиран готварски кабинет на ЦСОП – Варна. Учениците усвояват основните кулинарни техники, стандарти за безопасност и хигиена, приготвяне на студени и топли ястия, супи, основни храни и сервиране.',
    curriculum: [
      'Първична обработка на зеленчуци, месо и плодове',
      'Технология на кулинарната продукция и рецептури',
      'Организация на работното място и хигиена (HACCP)',
      'Сладкарски и тестени изделия',
      'Кетъринг и сервиране на готови блюда',
    ],
    practice: 'Практически часове в оборудваната кухня и участие в кулинарни събития на центъра.',
    future: 'Възможност за работа като помощник-готвач, кухненски работник, кетъринг сътрудник или помощник в заведения за хранене.',
    icon: 'utensils',
  },
  {
    title: 'Работник в озеленяването и цветарството',
    field: 'Професионално направление „Градинарство и ландшафтен дизайн“',
    degree: 'I-ва степен на професионална квалификация',
    target: 'Ученици в гимназиален етап (VIII – XII клас)',
    desc: 'Програмата подготвя младежите за практическа работа на открито и в оранжерийни условия. Учениците се грижат за просторния училищен двор на ЦСОП – Варна, засаждат цветни лехи, декоративни храсти и се учат на сезонна поддръжка на зелени площи.',
    curriculum: [
      'Разпознаване на декоративни цветя, храсти и дървета',
      'Засаждане, пикиране, пресаждане и подрязване',
      'Поливане, торене и грижа за почвата',
      'Работа с градинарски инструменти и безопасност',
      'Сезонна подготовка на паркови площи',
    ],
    practice: 'Ежедневна практическа работа в зелените площи и градината на центъра на ул. „Петко Стайнов“ 7.',
    future: 'Реализация в общински озеленителни предприятия, градински центрове, разсадници, паркове и цветни оранжерии.',
    icon: 'flower',
  },
  {
    title: 'Работник в производството на кулинарни и сладкарски изделия',
    field: 'Професионално направление „Хлебарство и сладкарство“',
    degree: 'I-ва степен на професионална квалификация',
    target: 'Ученици от прогимназиален и гимназиален етап',
    desc: 'Фокусирано практическо обучение за приготвяне на хляб, тестени закуски, бисквити, кремове и традиционни сладкарски изделия с фокус върху прецизността, фината моторика и съзидателния труд.',
    curriculum: [
      'Месене, втасване и изпичане на различни видове тесто',
      'Декорация на сладкиши и бисквити',
      'Опаковане, съхранение и етикетиране',
      'Екипна работа в производствена среда',
    ],
    practice: 'Обучение на модулен принцип в специализирания сладкарски кът.',
    future: 'Помощник-хлебар, помощник-сладкар в пекарни и цехове за кулинарни изделия.',
    icon: 'bread',
  },
];

export default function VocationalPrograms() {
  const [activeTab, setActiveTab] = useState(0);
  const prog = PROGRAMS[activeTab];

  return (
    <section className="vocational-sec" style={{ padding: '80px 0', background: 'var(--sand-2)' }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="kicker">Професионална подготовка</span>
          <h2 style={{ fontSize: '32px' }}>Специалности за независим живот и кариерен старт</h2>
          <p style={{ maxWidth: '780px' }}>
            ЦСОП – Варна предоставя професионална подготовка след VII и VIII клас, която дава на младежите реална професия, практически трудови навици и самочувствие за успешна интеграция в обществото.
          </p>
        </Reveal>

        {/* TAB BUTTONS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '14px',
            marginBottom: '36px',
          }}
        >
          {PROGRAMS.map((p, idx) => {
            const isSelected = idx === activeTab;
            return (
              <button
                key={p.title}
                onClick={() => setActiveTab(idx)}
                style={{
                  textAlign: 'left',
                  padding: '20px 22px',
                  borderRadius: '18px',
                  border: isSelected ? '2px solid var(--green-deep)' : '1px solid var(--line)',
                  background: isSelected ? 'var(--sand-3)' : 'var(--card-bg)',
                  cursor: 'pointer',
                  transition: 'all .25s ease',
                  boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: isSelected ? 'var(--green-deep)' : 'var(--ink-3)',
                    marginBottom: '6px',
                  }}
                >
                  {p.degree}
                </span>
                <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--ink)', fontWeight: 600, lineHeight: '1.4' }}>
                  {p.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* ACTIVE PROGRAM DETAILS */}
        <motion.div
          key={prog.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'var(--card-bg)',
            borderRadius: '24px',
            border: '1px solid var(--line)',
            padding: '36px 40px',
            boxShadow: 'var(--shadow)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--green-deep)',
                background: 'var(--green-soft)',
                padding: '4px 14px',
                borderRadius: '999px',
              }}
            >
              {prog.degree}
            </span>
            <span style={{ fontSize: '13.5px', color: 'var(--ink-3)', fontWeight: 500 }}>
              {prog.target}
            </span>
          </div>

          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: 'var(--ink)', marginBottom: '8px' }}>
            {prog.title}
          </h3>
          <p style={{ fontSize: '13.5px', color: 'var(--clay-deep)', fontWeight: 600, marginBottom: '16px' }}>
            {prog.field}
          </p>

          <p style={{ fontSize: '15.5px', color: 'var(--ink-2)', lineHeight: '1.7', marginBottom: '28px' }}>
            {prog.desc}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '28px' }}>
            <div style={{ background: 'var(--sand-2)', padding: '22px', borderRadius: '18px', border: '1px solid var(--line)' }}>
              <b style={{ display: 'block', fontSize: '14px', color: 'var(--green-deep)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Учебна програма и модули:
              </b>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13.5px', color: 'var(--ink-2)', lineHeight: '1.7' }}>
                {prog.curriculum.map((item, i) => (
                  <li key={i} style={{ marginBottom: '6px' }}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: 'var(--sand-2)', padding: '20px', borderRadius: '18px', border: '1px solid var(--line)' }}>
                <b style={{ display: 'block', fontSize: '13.5px', color: 'var(--clay-deep)', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Практическа подготовка:
                </b>
                <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--ink-2)', lineHeight: '1.6' }}>
                  {prog.practice}
                </p>
              </div>

              <div style={{ background: 'var(--sand-2)', padding: '20px', borderRadius: '18px', border: '1px solid var(--line)' }}>
                <b style={{ display: 'block', fontSize: '13.5px', color: 'var(--green-deep)', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Кариерна реализация:
                </b>
                <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--ink-2)', lineHeight: '1.6' }}>
                  {prog.future}
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', paddingTop: '18px', borderTop: '1px solid var(--line)' }}>
            <span style={{ fontSize: '13px', color: 'var(--ink-3)' }}>
              Обучението завършва с държавен изпит по теория и практика за придобиване на I СПК.
            </span>
            <a
              href="/priem"
              className="btn btn-warm"
              style={{ fontSize: '13.5px', padding: '10px 20px' }}
            >
              Кандидатствайте за прием
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
