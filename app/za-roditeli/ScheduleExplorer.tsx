import React from 'react';
import Reveal from '../components/Reveal';

interface Period {
  label: string;
  time: string;
  isBreak?: boolean;
}

const PERIODS: Period[] = [
  { label: 'Час 1', time: '8:30 – 9:05' },
  { label: 'Час 2', time: '9:15 – 9:50' },
  { label: 'Голямо междучасие', time: '9:50 – 10:20', isBreak: true },
  { label: 'Час 3', time: '10:20 – 10:55' },
  { label: 'Час 4', time: '11:05 – 11:40' },
  { label: 'Час 5', time: '11:50 – 12:25' },
  { label: 'Час 6', time: '12:35 – 13:05' },
];

const INFO = [
  {
    title: 'Форма на обучение',
    body: 'Обучението в ЦСОП – Варна е дневна, едносменна форма.',
  },
  {
    title: 'Режим по групи',
    body: 'От I до VII клас – целодневен. От VIII до XI клас – полудневен.',
  },
  {
    title: 'Работно време',
    body: 'Центърът е отворен в работните дни от 8:00 до 18:00 ч. Занятията по групи започват в 8:30 ч. и са с продължителност 35 минути. Малко междучасие – 10 минути, голямо – 30 минути.',
  },
];

export default function ScheduleExplorer() {
  return (
    <div className="schedule-explorer" style={{ margin: '40px 0' }}>
      <Reveal className="sec-head">
        <span className="kicker">Организация на деня</span>
        <h2>Дневен режим</h2>
        <p>
          Ясната и предвидима структура на деня осигурява спокойствие и увереност за учениците.
        </p>
      </Reveal>

      {/* Обобщена информация */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '18px',
          marginBottom: '40px',
        }}
      >
        {INFO.map((item) => (
          <Reveal
            key={item.title}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--line)',
              borderRadius: '20px',
              padding: '26px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--serif)',
                fontSize: '18px',
                color: 'var(--green-deep)',
                margin: '0 0 10px',
              }}
            >
              {item.title}
            </h3>
            <p style={{ fontSize: '14.5px', color: 'var(--ink-2)', lineHeight: '1.65', margin: 0 }}>
              {item.body}
            </p>
          </Reveal>
        ))}
      </div>

      {/* Разписание на часовете */}
      <Reveal
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--line)',
          borderRadius: '24px',
          padding: '30px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '20px',
            color: 'var(--ink)',
            margin: '0 0 20px',
          }}
        >
          График на учебните часове
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {PERIODS.map((p) => (
            <div
              key={p.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 20px',
                borderRadius: '14px',
                background: p.isBreak ? 'var(--sand-2)' : 'var(--card-bg-subtle)',
                border: p.isBreak ? '1px dashed var(--line-strong)' : '1px solid var(--line)',
              }}
            >
              <span
                style={{
                  fontWeight: p.isBreak ? 600 : 700,
                  fontSize: '15px',
                  color: p.isBreak ? 'var(--clay-deep)' : 'var(--ink)',
                  fontStyle: p.isBreak ? 'italic' : 'normal',
                }}
              >
                {p.label}
              </span>
              <span
                style={{
                  fontSize: '14.5px',
                  fontWeight: 700,
                  color: 'var(--green-deep)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {p.time}
              </span>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '13.5px', color: 'var(--ink-3)', fontStyle: 'italic', margin: '18px 0 0' }}>
          * Учебните занятия завършват съгласно седмичното разписание за всяка група.
        </p>
      </Reveal>
    </div>
  );
}
