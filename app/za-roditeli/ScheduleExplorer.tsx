'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Reveal from '../components/Reveal';

interface ScheduleSlot {
  time: string;
  activity: string;
  desc: string;
  icon: string;
  tag: string;
}

const DAILY_SCHEDULE: ScheduleSlot[] = [
  {
    time: '08:00 – 08:30',
    activity: 'Посрещане и сутрешен прием',
    desc: 'Спокойно пристигане на децата, сутрешен тоалет, адаптиране към средата и първоначален визуален график за деня.',
    icon: 'sun',
    tag: 'Прием',
  },
  {
    time: '08:30 – 09:00',
    activity: 'Сутрешна гимнастика и закуска',
    desc: 'Лека загрявка за тонус, структурирана закуска и приучване към хигиенни навици за хранене.',
    icon: 'coffee',
    tag: 'Здраве',
  },
  {
    time: '09:00 – 11:30',
    activity: 'Учебни часове и индивидуални терапии',
    desc: 'Обучение по адаптирани предмети, сесии с логопед, работа с Tobii Eye-Tracker в сензорната зала, кинезитерапия и психомоторика.',
    icon: 'book',
    tag: 'Обучение и терапия',
  },
  {
    time: '11:30 – 12:00',
    activity: 'Разходка и игри на открито',
    desc: 'Организирано движение, игри за социализация и контакт с природата в озеленения училищен двор.',
    icon: 'trees',
    tag: 'Отдих на открито',
  },
  {
    time: '12:00 – 13:00',
    activity: 'Топъл обяд и лична хигиена',
    desc: 'Пълноценно топло хранене, самообслужване в трапезарията и затвърждаване на битови умения.',
    icon: 'utensils',
    tag: 'Хранене',
  },
  {
    time: '13:00 – 14:00',
    activity: 'Релаксация и организиран отдих',
    desc: 'Следобедна почивка, слушане на релаксираща музика, тихи занимания и сензорен релакс в Снуузелен залата.',
    icon: 'moon',
    tag: 'Релаксация',
  },
  {
    time: '14:00 – 15:30',
    activity: 'Самоподготовка и практически ателиета',
    desc: 'Преговор на материала, арт терапия, керамика, часове в кулинарния кабинет и градинарство.',
    icon: 'palette',
    tag: 'Практически умения',
  },
  {
    time: '15:30 – 16:30',
    activity: 'Следобедна закуска, игри и изпращане',
    desc: 'Следобедно подкрепление, свободни игри по интереси, обратна връзка с родителите при вземане на децата.',
    icon: 'heart',
    tag: 'Завършек на деня',
  },
];

interface SpecialistConsultation {
  role: string;
  name: string;
  day: string;
  time: string;
  location: string;
  notes: string;
}

const CONSULTATIONS: SpecialistConsultation[] = [
  {
    role: 'Директор',
    name: 'Светлана Иванова',
    day: 'Всеки вторник',
    time: '09:00 – 10:00 ч.',
    location: 'Кабинет Директор (ет. 1)',
    notes: 'Въпроси по прием, организация на учебния процес и партньорства.',
  },
  {
    role: 'Клиничен психолог',
    name: 'Рая Стефанова / Екип',
    day: 'Сряда и петък',
    time: '13:30 – 15:00 ч.',
    location: 'Психологичен кабинет',
    notes: 'Индивидуални консултации за семейна подкрепа, поведенчески насоки и емоционално състояние.',
  },
  {
    role: 'Логопедичен екип',
    name: 'Жулиета Стефанова / Звезделина Атанасова',
    day: 'Вторник и четвъртък',
    time: '13:00 – 14:30 ч.',
    location: 'Логопедичен кабинет',
    notes: 'Насоки за домашна речева практика, алтернативна комуникация и пиктограми.',
  },
  {
    role: 'Ерготерапевт & Сензорен терапевт',
    name: 'Михаела Георгиева',
    day: 'Сряда',
    time: '14:00 – 15:30 ч.',
    location: 'Сензорна зала (Снуузелен)',
    notes: 'Препоръки за сензорна среда у дома и развиване на фина моторика.',
  },
  {
    role: 'Кинезитерапевт & Рехабилитатор',
    name: 'Мариян Янакиев / Анастасия Драгнева',
    day: 'Понеделник и четвъртък',
    time: '14:00 – 15:30 ч.',
    location: 'Зала по кинезитерапия',
    notes: 'Двигателни упражнения за домашен режим и позициониране.',
  },
];

export default function ScheduleExplorer() {
  const [activeMode, setActiveMode] = useState<'daily' | 'consultations'>('daily');

  return (
    <div className="schedule-explorer" style={{ margin: '40px 0' }}>
      <Reveal className="sec-head">
        <span className="kicker">Графици и организация</span>
        <h2>Интерактивен дневен ритъм и консултации</h2>
        <p>
          Ясната и предвидима структура на деня осигурява спокойствие и увереност за децата, а регулярните срещи със специалистите подпомагат родителската грижа.
        </p>
      </Reveal>

      {/* MODE TOGGLE BUTTONS */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '36px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveMode('daily')}
          style={{
            padding: '12px 24px',
            borderRadius: '999px',
            border: activeMode === 'daily' ? '2px solid var(--green-deep)' : '1px solid var(--line)',
            background: activeMode === 'daily' ? 'var(--green-deep)' : 'var(--card-bg)',
            color: activeMode === 'daily' ? '#fff' : 'var(--ink)',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: activeMode === 'daily' ? '0 4px 14px rgba(34, 84, 61, 0.2)' : 'none',
            transition: 'all .25s',
          }}
        >
          Дневен режим на учениците (08:00 – 16:30 ч.)
        </button>

        <button
          onClick={() => setActiveMode('consultations')}
          style={{
            padding: '12px 24px',
            borderRadius: '999px',
            border: activeMode === 'consultations' ? '2px solid var(--green-deep)' : '1px solid var(--line)',
            background: activeMode === 'consultations' ? 'var(--green-deep)' : 'var(--card-bg)',
            color: activeMode === 'consultations' ? '#fff' : 'var(--ink)',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: activeMode === 'consultations' ? '0 4px 14px rgba(34, 84, 61, 0.2)' : 'none',
            transition: 'all .25s',
          }}
        >
          Приемно време и консултации за родители
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeMode === 'daily' ? (
          <motion.div
            key="daily"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '18px',
            }}
          >
            {DAILY_SCHEDULE.map((slot, i) => (
              <div
                key={slot.time}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--line)',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: 'var(--green-deep)',
                        background: 'var(--green-soft)',
                        padding: '4px 10px',
                        borderRadius: '999px',
                      }}
                    >
                      {slot.time}
                    </span>
                    <span style={{ fontSize: '11.5px', color: 'var(--clay-deep)', fontWeight: 600, textTransform: 'uppercase' }}>
                      {slot.tag}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--ink)', margin: '6px 0 8px' }}>
                    {slot.activity}
                  </h4>
                  <p style={{ fontSize: '13.5px', color: 'var(--ink-2)', lineHeight: '1.6', margin: 0 }}>
                    {slot.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="consultations"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {CONSULTATIONS.map((c) => (
              <div
                key={c.role}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--line)',
                  borderRadius: '20px',
                  padding: '24px 28px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--clay-deep)', fontWeight: 700, letterSpacing: '0.04em' }}>
                    {c.role}
                  </span>
                  <h4 style={{ margin: '4px 0 0', fontSize: '17px', color: 'var(--ink)', fontWeight: 600 }}>
                    {c.name}
                  </h4>
                </div>

                <div>
                  <b style={{ display: 'block', fontSize: '13.5px', color: 'var(--green-deep)' }}>
                    {c.day}
                  </b>
                  <span style={{ fontSize: '13px', color: 'var(--ink-2)' }}>{c.time}</span>
                </div>

                <div>
                  <span style={{ display: 'block', fontSize: '12.5px', color: 'var(--ink-3)' }}>Място:</span>
                  <b style={{ fontSize: '13.5px', color: 'var(--ink)' }}>{c.location}</b>
                </div>

                <div>
                  <span style={{ display: 'block', fontSize: '12.5px', color: 'var(--ink-3)' }}>Тематика:</span>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-2)', lineHeight: '1.4' }}>
                    {c.notes}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
