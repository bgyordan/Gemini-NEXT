'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Reveal from '../components/Reveal';

interface StageInfo {
  id: string;
  name: string;
  age: string;
  desc: string;
  documents: string[];
  features: string[];
  schedule: string;
}

const STAGES: StageInfo[] = [
  {
    id: 'early',
    name: 'Предучилищна група за ранно въздействие',
    age: '5 – 7 години',
    desc: 'Фокус върху сензорната интеграция, логопедичната стимулация, социализацията и ранното развитие на самостоятелност в защитена среда.',
    documents: [
      'Карта за комплексна педагогическа оценка от РЦПППО – гр. Варна',
      'Заявление от родител / настойник по образец на ЦСОП',
      'Медицински документи (епикриза, решение на ТЕЛК / ЛКК, ако има такова)',
      'Копие от акт за раждане на детето',
      'Здравно-профилактична карта от личния лекар',
    ],
    features: [
      'Мултисензорна стимулация и игрова терапия',
      'Индивидуални логопедични и психологически сесии',
      'Релационна психомоторика в малки групи',
      'Целодневен режим с топъл обяд и организиран отдих',
    ],
    schedule: '08:00 – 16:30 ч. (Целодневна организация с хранене и почивка)',
  },
  {
    id: 'primary',
    name: 'Начален етап (I – IV клас)',
    age: '7 – 11 години',
    desc: 'Обучение по адаптирани учебни програми с индивидуален учебен план за всеки ученик, съчетано с двигателна и езикова рехабилитация.',
    documents: [
      'Удостоверение за завършена подготвителна група / удостоверение за преместване',
      'Становище на ЕПЛР към училището или РЦПППО – Варна',
      'Медицинска документация (ТЕЛК / ЛКК)',
      'Заявление от родителя по образец',
      'Личен картон на ученика (при преместване)',
    ],
    features: [
      'Обучение по специални образователни програми',
      'Ежедневна подкрепа от ресурсни учители и специални педагози',
      'Арт терапия, музикотерапия и занимания в зеления двор',
      'Занимания по интереси и самоподготовка',
    ],
    schedule: '08:00 – 16:30 ч. (Учебни часове, индивидуални терапии, обед и полуинтернатна група)',
  },
  {
    id: 'middle',
    name: 'Прогимназиален етап (V – VII клас)',
    age: '11 – 15 години',
    desc: 'Задълбочаване на общообразователната подготовка, развиване на социални умения, първи стъпки в кулинарията, цветарството и приложния труд.',
    documents: [
      'Удостоверение за завършен начален етап (IV клас) или за преместване',
      'План за подкрепа от ЕПЛР и препоръка от РЦПППО',
      'Решение на ТЕЛК / медицинска експертиза',
      'Заявление от родител / настойник',
    ],
    features: [
      'Практически часове в учебната кухня и градината',
      'Развитие на дигитални умения и асистивни технологии',
      'Психологическо консултиране и групова динамика',
      'Подготовка за избор на професионално направление',
    ],
    schedule: '08:00 – 16:30 ч.',
  },
  {
    id: 'vocational',
    name: 'Гимназиален етап с професионално обучение (VIII – XII клас)',
    age: '15 – 19+ години',
    desc: 'Придобиване на I-ва степен на професионална квалификация по „Ресторантьорство и кетъринг / Помощник-готвач“ или „Озеленяване и цветарство“.',
    documents: [
      'Свидетелство за завършено основно образование (VII клас)',
      'Медицинско свидетелство за професионално обучение',
      'Становище от РЦПППО – Варна за насочване към професионално обучение',
      'Заявление за избор на професия',
      'Решение на ТЕЛК (ако е приложимо)',
    ],
    features: [
      'Държавно признато свидетелство за професионална квалификация (I СПК)',
      'Интензивна практика в професионалния кухненски кабинет',
      'Стаж по поддръжка на паркови и зелени площи',
      'Подготовка за самостоятелна трудова реализация',
    ],
    schedule: '08:00 – 16:30 ч. (Теоретични часове, производствена практика и терапевтични консултации)',
  },
];

export default function AdmissionWizard() {
  const [selectedStage, setSelectedStage] = useState<string>(STAGES[0].id);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const current = STAGES.find((s) => s.id === selectedStage) || STAGES[0];

  const toggleDoc = (docName: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docName]: !prev[docName],
    }));
  };

  const totalDocs = current.documents.length;
  const completedDocs = current.documents.filter((d) => checkedDocs[d]).length;
  const progressPercent = Math.round((completedDocs / totalDocs) * 100);

  return (
    <div className="admission-wizard" style={{ marginTop: '20px' }}>
      <Reveal className="sec-head">
        <span className="kicker">Интерактивен пътеводител</span>
        <h2>Изберете възрастта на детето за персонализирани изисквания</h2>
        <p>
          Всяка образователна степен в ЦСОП – Варна има специфични изисквания и документи. Изберете съответния етап и проверете готовността си.
        </p>
      </Reveal>

      {/* STAGE SELECTOR TABS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px',
          marginBottom: '32px',
        }}
      >
        {STAGES.map((st) => {
          const active = st.id === selectedStage;
          return (
            <button
              key={st.id}
              onClick={() => setSelectedStage(st.id)}
              style={{
                textAlign: 'left',
                padding: '18px 20px',
                borderRadius: '16px',
                border: active ? '2px solid var(--green-deep)' : '1px solid var(--line)',
                background: active ? 'var(--sand-2)' : 'var(--card-bg)',
                cursor: 'pointer',
                transition: 'all .25s ease',
                boxShadow: active ? '0 4px 14px rgba(34, 84, 61, 0.12)' : 'none',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: active ? 'var(--green-deep)' : 'var(--ink-3)',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                {st.age}
              </span>
              <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--ink)', fontWeight: 600, lineHeight: '1.4' }}>
                {st.name}
              </h4>
            </button>
          );
        })}
      </div>

      {/* CURRENT STAGE CARD */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'var(--card-bg)',
          borderRadius: '24px',
          border: '1px solid var(--line)',
          boxShadow: 'var(--shadow)',
          padding: '36px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--green-deep)',
                background: 'var(--green-soft)',
                padding: '4px 14px',
                borderRadius: '999px',
                display: 'inline-block',
                marginBottom: '8px',
              }}
            >
              {current.age}
            </span>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: 'var(--ink)', margin: 0 }}>
              {current.name}
            </h3>
            <p style={{ color: 'var(--ink-2)', fontSize: '15px', marginTop: '6px', maxWidth: '680px' }}>
              {current.desc}
            </p>
          </div>

          <div
            style={{
              background: 'var(--sand-2)',
              padding: '14px 20px',
              borderRadius: '16px',
              textAlign: 'right',
            }}
          >
            <span style={{ display: 'block', fontSize: '12px', color: 'var(--ink-3)', textTransform: 'uppercase', fontWeight: 600 }}>
              Дневен график
            </span>
            <b style={{ fontSize: '14px', color: 'var(--green-deep)' }}>{current.schedule}</b>
          </div>
        </div>

        {/* CHECKLIST & HIGHLIGHTS GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            marginBottom: '28px',
          }}
        >
          {/* REQUIRED DOCUMENTS CHECKLIST */}
          <div
            style={{
              background: 'var(--sand-2)',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid var(--line)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <b style={{ fontSize: '14px', textTransform: 'uppercase', color: 'var(--clay-deep)', letterSpacing: '0.04em' }}>
                Необходими документи:
              </b>
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--green-deep)' }}>
                {completedDocs} от {totalDocs} готови
              </span>
            </div>

            {/* PROGRESS BAR */}
            <div style={{ height: '6px', background: 'var(--sand-3)', borderRadius: '999px', overflow: 'hidden', marginBottom: '16px' }}>
              <div
                style={{
                  height: '100%',
                  width: `${progressPercent}%`,
                  background: 'var(--green-deep)',
                  transition: 'width .3s ease',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {current.documents.map((doc) => {
                const isChecked = !!checkedDocs[doc];
                return (
                  <label
                    key={doc}
                    onClick={() => toggleDoc(doc)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      background: isChecked ? 'var(--card-bg)' : 'var(--card-bg-subtle)',
                      border: isChecked ? '1px solid var(--green-deep)' : '1px solid transparent',
                      cursor: 'pointer',
                      fontSize: '13.5px',
                      color: isChecked ? 'var(--green-deep)' : 'var(--ink-2)',
                      transition: 'all .2s',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      style={{ marginTop: '3px', cursor: 'pointer', accentColor: 'var(--green-deep)' }}
                    />
                    <span style={{ lineHeight: '1.5', textDecoration: isChecked ? 'line-through' : 'none' }}>
                      {doc}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* STAGE ADVANTAGES */}
          <div
            style={{
              background: 'var(--sand-2)',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid var(--line)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <b style={{ display: 'block', fontSize: '14px', textTransform: 'uppercase', color: 'var(--green-deep)', marginBottom: '16px', letterSpacing: '0.04em' }}>
                Какво осигурява центърът:
              </b>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.8' }}>
                {current.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: '20px', padding: '16px', background: 'var(--card-bg)', borderRadius: '14px', border: '1px solid var(--line)' }}>
              <b style={{ display: 'block', fontSize: '13px', color: 'var(--ink)', marginBottom: '4px' }}>
                Нуждаете се от съдействие?
              </b>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-3)' }}>
                Обадете се на деловодството на тел. <b>052 612 856</b> или <b>0878 521 823</b> за безплатна първична консултация.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', paddingTop: '20px', borderTop: '1px solid var(--line)' }}>
          <div style={{ fontSize: '13.5px', color: 'var(--ink-3)' }}>
            Приемът се извършва целогодишно при наличие на свободни места.
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="/kontakti"
              className="btn btn-warm"
              style={{ fontSize: '13.5px' }}
            >
              Свържете се с екипа
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
