'use client';

import React from 'react';
import Reveal from '../components/Reveal';
import './admission-wizard.css';

const FORM_NASOCHVANE = '/dokumenti/priem/zayavlenie-za-nasochvane.docx';
const FORM_ZAPISVANE = '/dokumenti/priem/zayavlenie-za-zapisvane.docx';

const DL = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a className="adm-dl" href={href} target="_blank" rel="noopener noreferrer">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
    </svg>
    {children}
  </a>
);

interface Stage {
  n: string;
  title: string;
  body: React.ReactNode;
}

const STAGES: Stage[] = [
  {
    n: 'I',
    title: 'Подаване на документи',
    body: (
      <>
        <p>Първоначалната стъпка започва с официалното заявяване на желание за подкрепа:</p>
        <ol>
          <li>Записване на детето в <strong>училище</strong> или <strong>детска градина</strong>;</li>
          <li>Подаване на <strong>заявление по образец</strong> (можете да го изтеглите по-долу).</li>
        </ol>
        <span className="adm-subhead">Допълнителни документи към заявлението</span>
        <ul>
          <li>Документи за здравно състояние;</li>
          <li>Документи от съд <span className="muted">(ако има такива)</span>;</li>
          <li>Документи, свързани с обучението;</li>
          <li>Протокол от ТЕЛК / НЕЛК / ЛКК.</li>
        </ul>
        <DL href={FORM_NASOCHVANE}>Изтегли заявление за насочване</DL>
      </>
    ),
  },
  {
    n: 'II',
    title: 'Обработка на документите',
    body: (
      <>
        <p>След като подадете необходимия набор от документи, започва етапът на тяхното разглеждане и обработка.</p>
        <p>
          В срок до <span className="adm-timebadge">1 месец</span> документите се окомплектоват и изпращат към{' '}
          <strong>РЦПППО – Варна</strong>. Този пакет включва:
        </p>
        <ol>
          <li><strong>Мотивирано становище</strong> от Екипа за подкрепа за личностно развитие (ЕПЛР);</li>
          <li><strong>Протокол</strong> от проведено заседание на ЕПЛР;</li>
          <li>Официално <strong>заявление от директора</strong> с всички приложени до момента документи.</li>
        </ol>
      </>
    ),
  },
  {
    n: 'III',
    title: 'Окончателно записване',
    body: (
      <>
        <p>Това е финалният етап от процедурата.</p>
        <p>
          След като бъде издадено официално становище от <strong>РЦПППО – Варна</strong> за насочване на детето,
          можете да преминете към същинското му записване при нас.
        </p>
        <p>За целта е необходимо да попълните финалното заявление:</p>
        <DL href={FORM_ZAPISVANE}>Изтегли заявление за записване</DL>
      </>
    ),
  },
];

export default function AdmissionWizard() {
  return (
    <div className="adm-proc">
      <Reveal className="adm-head">
        <span className="adm-kicker">Стъпка по стъпка</span>
        <h2 className="adm-h2">Процедура по записване</h2>
        <p className="adm-lede">Ръководство за прием в Център за специална образователна подкрепа – Варна.</p>
      </Reveal>

      <div className="adm-note">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8v5M12 16h.01M12 3l9 16H3z" />
        </svg>
        <span>
          <strong>Важно:</strong> трите етапа (I, II и III) се изпълняват строго последователно.
        </span>
        <button type="button" className="adm-print-btn" onClick={() => window.print()} aria-label="Разпечатай процедурата">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z" />
          </svg>
          Разпечатай
        </button>
      </div>

      <div className="adm-timeline">
        {STAGES.map((st, idx) => (
          <Reveal key={st.n} className="adm-step" delay={((idx % 3) + 1) as 1 | 2 | 3}>
            <div className="adm-step-node">{st.n}</div>
            <div className="adm-step-card">
              <span className="adm-step-tag">Етап {st.n}</span>
              <h3 className="adm-step-title">{st.title}</h3>
              <div className="adm-step-body">{st.body}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="adm-cta">
        <h3>Готови ли сте да започнете?</h3>
        <p>
          Върнете се на <strong>Етап I</strong> и изтеглете заявлението за насочване. За съдействие и въпроси
          екипът на деловодството е на ваше разположение.
        </p>
        <a href="/kontakti" className="btn btn-primary">Свържете се с нас</a>
      </div>
    </div>
  );
}
